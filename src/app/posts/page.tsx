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
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function PostList() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);
  const { setHeader } = useHeader();
  const router = useRouter();

  const handleClick = () => {
    router.push('/posts/new');
  };

  const addButton = useMemo(
    () => (
      <button className={styles.addPostButton} onClick={handleClick}>
        <Image src="/icons/plus.svg" alt="plusIcon" height={40} width={40} />
      </button>
    ),
    []
  );

  useEffect(() => {
    dispatch(fetchPosts());
    setHeader('Posts', addButton, 'buttonRight');
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
