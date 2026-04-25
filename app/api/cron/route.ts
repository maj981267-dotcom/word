import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// 示例单词数据
const sampleWords = [
  {
    word: 'ephemeral',
    context: {
      definition: '短暂的',
      example: 'The beauty of cherry blossoms is ephemeral.',
      level: 'advanced',
      synonyms: 'transient, fleeting, temporary'
    }
  },
  {
    word: 'serendipity',
    context: {
      definition: '意外发现珍奇事物的本领',
      example: 'Finding this cafe was pure serendipity.',
      level: 'advanced',
      synonyms: 'chance, luck, fortune'
    }
  },
  {
    word: 'resilient',
    context: {
      definition: '有弹性的，能恢复的',
      example: 'She proved to be resilient in the face of adversity.',
      level: 'intermediate',
      synonyms: 'flexible, adaptable, strong'
    }
  }
];

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    
    // 随机选择一个单词
    const randomWord = sampleWords[Math.floor(Math.random() * sampleWords.length)];
    
    // 添加时间戳到context
    const contextWithTimestamp = {
      ...randomWord.context,
      insertedAt: now.toISOString(),
      source: 'cron-job'
    };
    
    // 直接使用SQL插入数据
    const result = await sql`
      INSERT INTO ces (word, context)
      VALUES (${randomWord.word}, ${JSON.stringify(contextWithTimestamp)})
      RETURNING *
    `;

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
