'use client';

import { useEffect, useState } from 'react';

interface Word {
  id: number;
  word: string;
  context: any;
  createdAt: string;
}

export default function Home() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWords = async () => {
    try {
      const res = await fetch('/api/words');
      const data = await res.json();
      if (data.success) {
        setWords(data.data);
      }
    } catch (error) {
      console.error('获取数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
    const interval = setInterval(fetchWords, 10000); // 每10秒刷新一次
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Words 数据表
      </h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        每 5 分钟自动插入一条数据（Vercel Cron Job）
      </p>

      {loading ? (
        <p>加载中...</p>
      ) : (
        <div>
          <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
            共 {words.length} 条记录（最近 20 条）
          </p>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {words.map((word) => (
              <div
                key={word.id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '1rem',
                  backgroundColor: 'white'
                }}
              >
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>ID:</strong> {word.id} | <strong>Word:</strong> {word.word}
                </div>
                <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
                  <strong>插入时间:</strong> {new Date(word.createdAt).toLocaleString('zh-CN')}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#888' }}>
                  <strong>Context:</strong> {JSON.stringify(word.context)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
