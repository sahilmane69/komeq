import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export async function getDb() {
     if (db) return db;

     const dbPath = path.join(process.cwd(), 'database.sqlite');

     db = await open({
          filename: dbPath,
          driver: sqlite3.Database
     });

     await db.exec(`
    CREATE TABLE IF NOT EXISTS visitors (
      id INTEGER PRIMARY KEY,
      count INTEGER
    );
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT,
      content TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

     // Initialize visitors if not present
     const visitorRow = await db.get('SELECT * FROM visitors WHERE id = 1');
     if (!visitorRow) {
          await db.exec('INSERT INTO visitors (id, count) VALUES (1, 0)');
     }



     return db;
}
