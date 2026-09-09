#!/usr/bin/env python3
"""Compile the question bank into a searchable SQLite (FTS5) DB + a merged JSON file.

Source of truth: questions.json (a single JSON array of all questions).
(For backward compatibility, if questions.json is absent it falls back to data/*.json.)

Usage: python3 build.py
Outputs:
  interview_qbank.sqlite   -> table `questions` + FTS5 index `questions_fts`
  interview_qbank.json     -> merged/normalized array of all questions (with ids)
"""
import json, glob, os, sqlite3, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SINGLE = os.path.join(HERE, "questions.json")
DATA_DIR = os.path.join(HERE, "data")

def load():
    rows = []
    if os.path.exists(SINGLE):
        with open(SINGLE, encoding="utf-8") as f:
            rows = json.load(f)
    else:
        for fp in sorted(glob.glob(os.path.join(DATA_DIR, "*.json"))):
            with open(fp, encoding="utf-8") as f:
                rows.extend(json.load(f))
    for r in rows:
        r.setdefault("category", "General")
        r.setdefault("subcategory", "")
        r.setdefault("difficulty", "Medium")
        r.setdefault("tags", [])
    for i, r in enumerate(rows, 1):
        r["id"] = i
    return rows

def build_json(rows):
    out = os.path.join(HERE, "interview_qbank.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, indent=1)
    return out

def build_sqlite(rows):
    out = os.path.join(HERE, "interview_qbank.sqlite")
    if os.path.exists(out):
        os.remove(out)
    con = sqlite3.connect(out)
    cur = con.cursor()
    cur.execute("""
        CREATE TABLE questions(
            id INTEGER PRIMARY KEY,
            category TEXT, subcategory TEXT, difficulty TEXT,
            question TEXT, answer TEXT, tags TEXT
        )""")
    cur.execute("CREATE INDEX idx_cat ON questions(category)")
    cur.execute("CREATE INDEX idx_sub ON questions(subcategory)")
    cur.execute("CREATE INDEX idx_diff ON questions(difficulty)")
    cur.execute("""
        CREATE VIRTUAL TABLE questions_fts USING fts5(
            question, answer, tags, category, subcategory,
            content='questions', content_rowid='id',
            tokenize='porter unicode61'
        )""")
    for r in rows:
        cur.execute(
            "INSERT INTO questions(id,category,subcategory,difficulty,question,answer,tags) VALUES(?,?,?,?,?,?,?)",
            (r["id"], r["category"], r["subcategory"], r["difficulty"],
             r["question"], r["answer"], ", ".join(r["tags"])))
    cur.execute("""
        INSERT INTO questions_fts(rowid,question,answer,tags,category,subcategory)
        SELECT id,question,answer,tags,category,subcategory FROM questions""")
    con.commit()
    con.close()
    return out

if __name__ == "__main__":
    rows = load()
    j = build_json(rows)
    s = build_sqlite(rows)
    from collections import Counter
    c = Counter(r["category"] for r in rows)
    print(f"Total questions: {len(rows)}")
    for k, v in sorted(c.items(), key=lambda x: -x[1]):
        print(f"  {k}: {v}")
    print("Wrote:", j)
    print("Wrote:", s)
