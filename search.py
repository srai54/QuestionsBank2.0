#!/usr/bin/env python3
"""Millisecond search over the question bank.

Examples:
  python3 search.py "redis cache eviction"
  python3 search.py --category Azure "service bus"
  python3 search.py --cat React "useMemo"
  python3 search.py --limit 20 "index optimization"

Uses SQLite FTS5 (BM25 ranking). Falls back gracefully if a term looks like an operator.
"""
import argparse, sqlite3, os, time, sys

DB = os.path.join(os.path.dirname(os.path.abspath(__file__)), "interview_qbank.sqlite")

def run():
    ap = argparse.ArgumentParser()
    ap.add_argument("query", nargs="+")
    ap.add_argument("--category", "--cat", dest="category", default=None)
    ap.add_argument("--limit", type=int, default=10)
    a = ap.parse_args()
    q = " ".join(a.query)
    # sanitize: wrap bare terms so punctuation doesn't break FTS
    safe = " ".join(f'"{t}"' if not t.startswith('"') else t for t in q.split())
    con = sqlite3.connect(DB)
    cur = con.cursor()
    t0 = time.perf_counter()
    sql = """
        SELECT q.id,q.category,q.subcategory,q.difficulty,q.question,q.answer,
               bm25(questions_fts) AS rank
        FROM questions_fts
        JOIN questions q ON q.id = questions_fts.rowid
        WHERE questions_fts MATCH ?
    """
    params = [safe]
    if a.category:
        sql += " AND q.category = ? COLLATE NOCASE"
        params.append(a.category)
    sql += " ORDER BY rank LIMIT ?"
    params.append(a.limit)
    rows = cur.execute(sql, params).fetchall()
    ms = (time.perf_counter() - t0) * 1000
    print(f"[{len(rows)} hits in {ms:.2f} ms]  query: {q}\n")
    for r in rows:
        print(f"#{r[0]} [{r[1]} / {r[2]} · {r[3]}]")
        print(f"Q: {r[4]}")
        print(f"A: {r[5]}\n" + "-"*70)
    con.close()

if __name__ == "__main__":
    run()
