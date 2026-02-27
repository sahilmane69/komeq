import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
     try {
          const db = await getDb();
          const reviews = await db.all('SELECT * FROM reviews ORDER BY created_at DESC LIMIT 50');
          return NextResponse.json({ reviews });
     } catch {
          return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
     }
}

export async function POST(req: Request) {
     try {
          const { name, role, content, rating } = await req.json();
          if (!name || !content) {
               return NextResponse.json({ error: 'Name and content are required' }, { status: 400 });
          }

          const db = await getDb();
          await db.run(
               'INSERT INTO reviews (name, role, content, rating) VALUES (?, ?, ?, ?)',
               [name, role, content, rating || 5]
          );

          const reviews = await db.all('SELECT * FROM reviews ORDER BY created_at DESC LIMIT 50');
          return NextResponse.json({ success: true, reviews });
     } catch {
          return NextResponse.json({ error: 'Failed to add review' }, { status: 500 });
     }
}
