'use client';

import { useHeader } from '@/components/HeaderProvider/HeaderProvider';
import { useEffect, useMemo } from 'react';
import styles from './NewPost.module.scss';
import PostForm from '@/components/PostForm/PostForm';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';

export default function NewPost() {
  const { setHeader } = useHeader();
  const router = useRouter();

  useEffect(() => {
    setHeader('New Post', headerButton, 'buttonLeft');
  }, []);

  const handleBack = () => {
    router.push('/posts');
  };

  const headerButton = useMemo(
    () => (
      <button className={styles.closeButton}>
        <Image
          src="/icons/close.svg"
          width={24}
          height={24}
          alt="Close button"
          onClick={handleBack}
        />
      </button>
    ),
    []
  );

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <PostForm />
      </div>
    </ProtectedRoute>
  );
}
