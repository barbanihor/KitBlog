'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './EditPost.module.scss';
import Image from 'next/image';

interface Post {
  id: string;
  title: string;
  content: string;
  author?: string;
  createdAt?: string;
  categories?: { label: string; value: string }[];
}

interface EditPostContentProps {
  id: string;
}

const EditPostContent: React.FC<EditPostContentProps> = ({ id }) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  const [post, setPost] = useState<Post | null>(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchPost() {
      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const postData = { id: docSnap.id, ...docSnap.data() } as Post;
          setPost(postData);
          setTitle(postData.title);
          setContent(postData.content);
        } else {
          notFound();
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        notFound();
      } finally {
        setLoadingPost(false);
      }
    }
    fetchPost();
  }, [id]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!post) return;

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
    if (!post || !confirm('Ви дійсно хочете видалити цей пост?')) return;

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

  if (loadingPost) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <article className={styles.editPost}>
      <button
        className={styles.backButton}
        onClick={() => router.back()}
        aria-label="Go back"
      >
        <Image src="/icons/arrowLeft.svg" alt="Back" height={24} width={24} />
      </button>

      <h1 className={styles.title}>Edit: {post.title}</h1>

      {post.createdAt && (
        <time dateTime={post.createdAt}>
          <p className={styles.byWho}>
            By {post.author || 'Unknown'} · Published on{' '}
            {new Date(post.createdAt).toLocaleString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </p>
        </time>
      )}

      <form className={styles.form} onSubmit={handleUpdate}>
        <label className={styles.label} htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          required
          autoComplete="off"
        />

        <label className={styles.label} htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textarea}
          rows={10}
          required
        />

        <div className={styles.buttonGroup}>
          <button type="submit" disabled={loading} className={styles.saveButton}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className={styles.deleteButton}
          >
            Delete Post
          </button>
        </div>
      </form>

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
};

export default EditPostContent;
