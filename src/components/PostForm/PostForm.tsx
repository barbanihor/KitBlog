'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './PostForm.module.scss';
import { CustomPostCategorySelect } from '../customCategorySelect/CustomCategorySelect';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const postSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long'),
  content: z.string().min(50, 'Content must be at least 50 characters long'),
  categories: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, 'Please select at least one category'),
});

type PostInput = z.infer<typeof postSchema>;

export default function PostForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PostInput>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      categories: [],
    },
  });

  const user = useSelector((state: RootState) => state.auth.user);

  const onSubmit = async (data: PostInput) => {
    if (!user) {
      toast.error('Ви не авторизовані');
      return;
    }

    try {
      const authorName = user.name || user.email || 'Анонім';

      const docRef = await addDoc(collection(db, 'posts'), {
        ...data,
        author: authorName,
        createdAt: serverTimestamp(),
        userId: user.uid,
      });

      reset();
      toast.success('Post created successfully');
      router.push('/posts');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    }
  };

  return (
    <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGroup}>
        <input
          placeholder="Title"
          className={styles.titleInput}
          id="title"
          type="text"
          {...register('title')}
          disabled={isSubmitting}
          aria-invalid={!!errors.title}
        />
        {errors.title && (
          <p className={styles.error} role="alert">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className={styles.formGroup}>
        <textarea
          placeholder="Content"
          className={styles.textarea}
          id="content"
          rows={6}
          {...register('content')}
          disabled={isSubmitting}
          aria-invalid={!!errors.content}
        />
        {errors.content && (
          <p className={styles.error} role="alert">
            {errors.content.message}
          </p>
        )}
      </div>

      <Controller
        control={control}
        name="categories"
        render={({ field }) => (
          <div className={styles.formGroup}>
            <CustomPostCategorySelect
              value={field.value}
              onChange={field.onChange}
              placeholder="Choose categories"
            />
            {errors.categories && (
              <p className={styles.error} role="alert">
                {errors.categories.message}
              </p>
            )}
          </div>
        )}
      />

      <button type="submit" disabled={isSubmitting} className={styles.publishButton}>
        {isSubmitting ? 'Creating post...' : 'Publish'}
      </button>
    </form>
  );
}
