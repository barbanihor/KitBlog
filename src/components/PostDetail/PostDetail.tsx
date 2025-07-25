'use client';

import React, { useEffect, useMemo } from 'react';
import styles from './PostDetail.module.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchPosts } from '@/redux/slices/postSlice';
import { useHeader } from '../HeaderProvider/HeaderProvider';

interface Comment {
  id: string;
  author?: string;
  text: string;
  createdAt?: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface PostDetailProps {
  post: Post;
  comments: Comment[];
}

export default function PostDetail({ post, comments }: PostDetailProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { setHeader } = useHeader();

  const addButton = useMemo(
    () => (
      <button className={styles.backButton} onClick={() => router.back()}>
        <Image src="/icons/arrowLeft.svg" alt="arrowLeft" height={24} width={24} />
      </button>
    ),
    []
  );

  useEffect(() => {
    dispatch(fetchPosts());

    setHeader(`${post.title}`, addButton, 'buttonLeft');
  }, [dispatch, setHeader]);

  return (
    <article className={styles.postDetail}>
      <h1>{post.title}</h1>
      <time dateTime={post.createdAt}>
        {new Date(post.createdAt).toLocaleString('uk-UA', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}
      </time>
      <p>{post.content}</p>

      <section className={styles.commentsSection}>
        <h2>Коментарі</h2>
        {comments.length === 0 ? (
          <p>Коментарі відсутні</p>
        ) : (
          <ul className={styles.commentList}>
            {comments.map((comment) => (
              <li key={comment.id} className={styles.commentItem}>
                <p>{comment.text}</p>
                <time dateTime={comment.createdAt}>
                  {comment.createdAt && new Date(comment.createdAt).toLocaleString()}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
