'use client';

import { useState } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface EditPostProps {
  post: {
    id: string;
    title: string;
    content: string;
  };
}

export default function EditPost({ post }: EditPostProps) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    setLoading(true);
    const postRef = doc(db, 'posts', post.id);

    try {
      await updateDoc(postRef, {
        title,
        content,
        updatedAt: new Date(),
      });
      router.push(`/posts/${post.id}`);
    } catch (error) {
      console.error('Помилка оновлення:', error);
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Ви дійсно хочете видалити цей пост?')) return;

    setLoading(true);
    const postRef = doc(db, 'posts', post.id);

    try {
      await deleteDoc(postRef);
      router.push('/posts');
    } catch (error) {
      console.error('Помилка видалення:', error);
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Редагувати пост</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Контент"
      />
      <button onClick={handleUpdate} disabled={loading}>
        Зберегти
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        style={{ marginLeft: '10px', color: 'red' }}
      >
        Видалити пост
      </button>
    </div>
  );
}
