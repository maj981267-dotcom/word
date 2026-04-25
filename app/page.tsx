'use client';

import { useEffect, useState } from 'react';

interface Word {
  id: number;
  word: string;
  context: any;
  created_at: string;
}

export default function Home() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [isInserting, setIsInserting] = useState(false);

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

  const insertWord = async () => {
    setIsInserting(true);
    try {
      const res = await fetch('/api/cron');
      const data = await res.json();
      if (data.success) {
        console.log('插入成功:', data);
        // 插入成功后刷新列表
        await fetchWords();
      }
    } catch (error) {
      console.error('插入失败:', error);
    } finally {
      setIsInserting(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  // 倒计时逻辑
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // 倒计时结束，插入数据
          insertWord();
          return 60; // 重置倒计时
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        单词自动插入系统
      </h1>
      
      {/* 倒计时显示 */}
      <div style={{ 
        backgroundColor: '#f0f9ff', 
        border: '2px solid #0ea5e9',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#0284c7', marginBottom: '0.5rem' }}>
          {isInserting ? '插入中...' : `${countdown}秒`}
        </div>
        <div style={{ fontSize: '1rem', color: '#0369a1' }}>
          {isInserting ? '正在写入数据到数据库' : '距离下次自动插入'}
        </div>
      </div>

      {loading ? (
        <p>加载中...</p>
      ) : (
        <div>
          <p style={{ marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.125rem' }}>
            📚 已插入 {words.length} 个单词
          </p>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {words.map((word) => (
              <div
                key={word.id}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1rem',
                  backgroundColor: 'white',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>
                  {word.word}
                </div>
                <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  <strong>ID:</strong> {word.id} | <strong>插入时间:</strong> {new Date(word.created_at).toLocaleString('zh-CN')}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#4b5563', backgroundColor: '#f9fafb', padding: '0.5rem', borderRadius: '4px' }}>
                  {JSON.stringify(word.context, null, 2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
