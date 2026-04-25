import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { words } from '@/lib/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const allWords = await db
      .select()
      .from(words)
      .orderBy(desc(words.createdAt))
      .limit(20);

    return NextResponse.json({
      success: true,
      count: allWords.length,
      data: allWords
    });
  } catch (error) {
    console.error('查询数据失败:', error);
    return NextResponse.json(
      { success: false, error: '查询数据失败' },
      { status: 500 }
    );
  }
}
