import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { words } from '@/lib/schema';

// 示例单词列表
const sampleWords = [
  { word: 'ephemeral', context: { definition: '短暂的', example: 'The beauty of cherry blossoms is ephemeral.', level: 'advanced' } },
  { word: 'serendipity', context: { definition: '意外发现珍奇事物的本领', example: 'Finding this cafe was pure serendipity.', level: 'advanced' } },
  { word: 'resilient', context: { definition: '有弹性的，能恢复的', example: 'She proved to be resilient in the face of adversity.', level: 'intermediate' } },
  { word: 'ubiquitous', context: { definition: '无处不在的', example: 'Smartphones have become ubiquitous in modern society.', level: 'advanced' } },
  { word: 'pragmatic', context: { definition: '务实的', example: 'We need a pragmatic approach to solve this problem.', level: 'intermediate' } },
];

export async function GET(request: Request) {
  try {
    // 验证请求来源（Vercel Cron会发送特殊的header）
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    
    // 随机选择一个单词
    const randomWord = sampleWords[Math.floor(Math.random() * sampleWords.length)];
    
    // 插入数据
    const result = await db.insert(words).values({
      word: randomWord.word,
      context: {
        ...randomWord.context,
        insertedAt: now.toISOString(),
        source: 'cron-job'
      }
    }).returning();

    console.log('成功插入单词:', result[0]);

    return NextResponse.json({
      success: true,
      insertedAt: now.toISOString(),
      data: result[0]
    });
  } catch (error) {
    console.error('插入数据失败:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : '插入数据失败' 
      },
      { status: 500 }
    );
  }
}
