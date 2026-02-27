import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
     try {
          const db = await getDb();
          const row = await db.get('SELECT count FROM visitors WHERE id = 1');
          return NextResponse.json({ count: row.count });
     } catch {
          return NextResponse.json({ error: 'Failed to fetch visitors' }, { status: 500 });
     }
}

export async function POST() {
     try {
          const db = await getDb();
          await db.run('UPDATE visitors SET count = count + 1 WHERE id = 1');
          const row = await db.get('SELECT count FROM visitors WHERE id = 1');
          return NextResponse.json({ count: row.count });
     } catch {
          return NextResponse.json({ error: 'Failed to update visitors' }, { status: 500 });
     }
}
