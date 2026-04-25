import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const allWords = await sql`
      SELECT * FROM ces 
      ORDER BY created_at DESC 
      LIMIT 20
    `;

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
