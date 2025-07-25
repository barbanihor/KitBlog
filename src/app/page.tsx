'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { fetchPosts } from '@/redux/slices/postSlice';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <main>
      <h1>Блог</h1>
    </main>
  );
}
