"""Regression tests for the SQLite build and its searchable metadata."""
import json
from contextlib import closing
from pathlib import Path
import sqlite3
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import build


class BuildTests(unittest.TestCase):
    def test_metadata_round_trip_and_fts(self):
        rows = [{
            'id': 1, 'category': 'Testing', 'subcategory': 'Fixtures',
            'difficulty': 'Medium', 'question': 'How is a fixture isolated?',
            'answer': 'Create independent state for each test.',
            'tags': ['isolation'], 'companies': ['Example organization'],
            'followups': [{'q': 'What about parallel tests?', 'a': 'Use separate namespaces.'}],
        }]
        with tempfile.TemporaryDirectory(dir=Path(__file__).parent) as tmp, patch.object(build, 'HERE', tmp):
            result = json.loads(Path(build.build_json(rows)).read_text(encoding='utf-8'))
            self.assertEqual(result, rows)
            with closing(sqlite3.connect(build.build_sqlite(rows))) as con:
                columns = [r[1] for r in con.execute('pragma table_info(questions)')]
                self.assertIn('companies', columns)
                self.assertIn('followups', columns)
                followups, companies = con.execute('select followups, companies from questions').fetchone()
                self.assertEqual(json.loads(followups), rows[0]['followups'])
                self.assertEqual(companies, 'Example organization')
                for term in ['fixture', 'namespaces', 'organization']:
                    self.assertEqual(con.execute('select count(*) from questions_fts where questions_fts match ?', (term,)).fetchone()[0], 1)
                self.assertEqual(con.execute('pragma integrity_check').fetchone()[0], 'ok')

    def test_category_files_take_priority_over_legacy_file(self):
        with tempfile.TemporaryDirectory(dir=Path(__file__).parent) as tmp:
            root = Path(tmp)
            data = root / 'data'
            data.mkdir()
            row = {'category': 'Testing', 'question': 'Current question', 'answer': 'Current answer'}
            (data / 'testing.json').write_text(json.dumps([row]), encoding='utf-8')
            legacy = root / 'questions.json'
            legacy.write_text(json.dumps([{'question': 'Stale question'}]), encoding='utf-8')
            with patch.object(build, 'DATA_DIR', str(data)), patch.object(build, 'SINGLE', str(legacy)):
                rows = build.load()
            self.assertEqual(len(rows), 1)
            self.assertEqual(rows[0]['question'], 'Current question')
            self.assertEqual(rows[0]['id'], 1)


if __name__ == '__main__':
    unittest.main()
