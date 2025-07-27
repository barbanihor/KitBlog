'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchPosts } from '@/redux/slices/postSlice';
import styles from './PostList.module.scss';
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

  const [searchQuery, setSearchQuery] = useState('');

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

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (posts.length === 0) return <p>No posts available</p>;

  return (
    <div className={styles.container}>
      <SearchQueryContainer
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search by post"
      />
      <ul className={styles.postList}>
        {filteredPosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}
