'use client';

import React from 'react';
import styles from './PostDetail.module.scss';

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
  return (
    <article className={styles.postDetail}>
      <h1>{post.title}</h1>
      <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleString()}</time>
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
