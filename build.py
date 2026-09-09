#!/usr/bin/env python3
"""Compile all topic JSON files into a searchable SQLite (FTS5) DB + a merged JSON file.

Usage: python3 build.py
Outputs:
  interview_qbank.sqlite   -> table `questions` + FTS5 index `questions_fts`
  interview_qbank.json     -> merged array of all questions
"""
import json, glob, os, sqlite3, sys

HERE = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(HERE, "data")

def load():
    rows = []
    for fp in sorted(glob.glob(os.path.join(DATA_DIR, "*.json"))):
        with open(fp, encoding="utf-8") as f:
            try:
                items = json.load(f)
            except json.JSONDecodeError as e:
                print(f"JSON error in {fp}: {e}", file=sys.stderr); raise
        for it in items:
            it.setdefault("category", "General")
            it.setdefault("subcategory", "")
            it.setdefault("difficulty", "Medium")
            it.setdefault("tags", [])
            rows.append(it)
    # assign stable ids
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
    # FTS5 full-text index for millisecond search across question/answer/tags/category
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
    # summary
    from collections import Counter
    c = Counter(r["category"] for r in rows)
    print(f"Total questions: {len(rows)}")
    for k, v in sorted(c.items(), key=lambda x: -x[1]):
        print(f"  {k}: {v}")
    print("Wrote:", j)
    print("Wrote:", s)
