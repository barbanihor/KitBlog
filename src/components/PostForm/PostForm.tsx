'use client';

import React, { useState, useCallback } from 'react';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { addPost } from '@/redux/slices/postSlice';
import styles from './PostForm.module.scss';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const postSchema = z.object({
  title: z.string().min(5, 'Заголовок повинен бути не менше 5 символів'),
  content: z.string().min(20, 'Контент повинен бути не менше 20 символів'),
});

type PostInput = z.infer<typeof postSchema>;

export default function PostForm() {
  const [input, setInput] = useState<PostInput>({ title: '', content: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof PostInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = useCallback(
    (field: keyof PostInput, value: string) => {
      setInput((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  const validateAndSubmit = useCallback(async () => {
    setIsSubmitting(true);

    try {
      const result = postSchema.safeParse(input);

      if (!result.success) {
        const formattedErrors: Partial<Record<keyof PostInput, string>> = {};
        result.error.issues.forEach((issue) => {
          if (issue.path.length > 0) {
            const key = issue.path[0] as keyof PostInput;
            formattedErrors[key] = issue.message;
          }
        });
        setErrors(formattedErrors);
        return;
      }

      setErrors({});

      const docRef = await addDoc(collection(db, 'posts'), {
        title: result.data.title,
        content: result.data.content,
        createdAt: serverTimestamp(),
      });

      const newPost = {
        id: docRef.id,
        title: result.data.title,
        content: result.data.content,
        createdAt: new Date().toISOString(),
      };

      dispatch(addPost(newPost));

      setInput({ title: '', content: '' });

      console.log('Пост успішно створено з ID:', docRef.id);
    } catch (error) {
      console.error('Помилка при створенні поста:', error);

      // Можна додати обробку помилок для користувача
      setErrors({
        title: 'Помилка при збереженні. Спробуйте ще раз.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [input, dispatch]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      validateAndSubmit();
    },
    [validateAndSubmit]
  );

  return (
    <form className={styles.postForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Заголовок</label>
        <input
          id="title"
          type="text"
          value={input.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          disabled={isSubmitting}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && (
          <p id="title-error" className={styles.error} role="alert">
            {errors.title}
          </p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content">Контент</label>
        <textarea
          id="content"
          value={input.content}
          onChange={(e) => handleInputChange('content', e.target.value)}
          rows={6}
          disabled={isSubmitting}
          aria-invalid={!!errors.content}
          aria-describedby={errors.content ? 'content-error' : undefined}
        />
        {errors.content && (
          <p id="content-error" className={styles.error} role="alert">
            {errors.content}
          </p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Створюється...' : 'Створити пост'}
      </button>
    </form>
  );
}
