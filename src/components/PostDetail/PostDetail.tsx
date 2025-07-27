'use client';

import React, { useEffect, useMemo, useState } from 'react';
import styles from './PostDetail.module.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchPosts } from '@/redux/slices/postSlice';
import { useHeader } from '../HeaderProvider/HeaderProvider';
import { Post } from '@/types/Post';
import { v4 as uuidv4 } from 'uuid';
import CommentForm from '../CommentForm/CommentForm';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Comment {
  id: string;
  author?: string;
  text: string;
  createdAt?: string;
}

interface PostDetailProps {
  post: Post;
  comments: Comment[];
}

export default function PostDetail({ post }: PostDetailProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { setHeader } = useHeader();
  const user = useSelector((state: RootState) => state.auth.user);

  const [comments, setComments] = useState<Comment[]>([]);

  const backButton = useMemo(
    () => (
      <button className={styles.backButton} onClick={() => router.back()}>
        <Image src="/icons/arrowLeft.svg" alt="Back" height={24} width={24} />
      </button>
    ),
    [router]
  );

  useEffect(() => {
    const fetchPostComments = async () => {
      try {
        const postRef = doc(db, 'posts', post.id);
        const postSnap = await getDoc(postRef);
        const postData = postSnap.data();

        if (postData?.comments) {
          setComments(postData.comments.reverse());
        }
      } catch (error) {
        console.error('Failed to fetch comments from Firestore:', error);
      }
    };

    dispatch(fetchPosts());
    setHeader(`${post.title}`, backButton, 'buttonLeft');
    fetchPostComments();
  }, [dispatch, setHeader, backButton, post.id, post.title]);

  const handleAddComment = async (data: { text: string }) => {
    const newComment: Comment = {
      id: uuidv4(),
      author: user?.name || 'Anonymous',
      text: data.text,
      createdAt: new Date().toISOString(),
    };

    try {
      const postRef = doc(db, 'posts', post.id);
      await updateDoc(postRef, {
        comments: arrayUnion(newComment),
      });

      const updatedPostSnap = await getDoc(postRef);
      const updatedPost = updatedPostSnap.data();

      if (updatedPost?.comments) {
        setComments(updatedPost.comments.reverse());
      }
    } catch (error) {
      console.error('Error updating post with new comment:', error);
    }
  };

  return (
    <article className={styles.postDetail}>
      <h1 className={styles.title}>{post.title}</h1>
      <time dateTime={post.createdAt}>
        <p className={styles.byWho}>
          By {post.author} · Published on{' '}
          {new Date(post.createdAt).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </p>
      </time>

      <p className={styles.content}>{post.content}</p>

      <section className={styles.commentsSection}>
        <h2 className={styles.commentsTitle}>Comments</h2>

        {comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          <ul className={styles.commentList}>
            {comments.map((comment) => (
              <li key={comment.id} className={styles.commentItem}>
                <div className={styles.commentHeader}>
                  <Image src="/icons/avatar.png" width={32} height={32} alt="Avatar" />
                  <strong>{comment.author || 'Anonymous'}</strong>
                </div>
                <p>{comment.text}</p>
                <time dateTime={comment.createdAt}>
                  {comment.createdAt &&
                    new Date(comment.createdAt).toLocaleString('en-GB')}
                </time>
              </li>
            ))}
          </ul>
        )}

        <CommentForm onSubmit={handleAddComment} />
      </section>

      {post.categories && post.categories.length > 0 && (
        <section className={styles.categoriesSection}>
          <h3>Categories</h3>
          <ul className={styles.categoryList}>
            {post.categories.map((cat) => (
              <li key={cat.value} className={styles.categoryItem}>
                {cat.label}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
