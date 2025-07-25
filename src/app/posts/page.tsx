'use client';

import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchPosts } from '@/redux/slices/postSlice';
import styles from './PostList.module.scss';
import Link from 'next/link';
import { SearchQueryContainer } from '@/components/SearchQuery/containers/SearchQueryContainer';
import { useHeader } from '@/components/HeaderProvider/HeaderProvider';
import PostItem from '@/components/PostItem/PostItem';

export default function PostList() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);
  const { setHeader } = useHeader();
  const addButton = useMemo(() => <button>Кнопка 1</button>, []);

  useEffect(() => {
    dispatch(fetchPosts());
    setHeader('Posts', addButton, 'buttonLeft');
  }, [dispatch, setHeader]);

  function handleInputChange() {}

  if (loading) return <p>Завантаження постів...</p>;
  if (error) return <p style={{ color: 'red' }}>Помилка: {error}</p>;
  if (posts.length === 0) return <p>Пости відсутні</p>;

  return (
    <div className={styles.container}>
      <SearchQueryContainer onChange={handleInputChange} placeholder="Пошук поста" />
      <ul className={styles.postList}>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}
