'use client';

import { useHeader } from '@/components/HeaderProvider/HeaderProvider';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styles from './NewPost.module.scss';
import { AppDispatch } from '@/redux/store';
import PostForm from '@/components/PostForm/PostForm';

export default function NewPost() {
  const dispatch = useDispatch<AppDispatch>();
  const { setHeader } = useHeader();
  const addButton = useMemo(() => <button>Close</button>, []);

  useEffect(() => {
    setHeader('New Post', addButton, 'buttonLeft');
  }, [dispatch, setHeader]);

  return (
    <div className={styles.container}>
      <PostForm />
    </div>
  );
}
