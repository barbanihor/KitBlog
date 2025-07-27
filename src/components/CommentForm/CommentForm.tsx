'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './CommentForm.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Image from 'next/image';

const schema = z.object({
  text: z.string().min(3, 'The comment must contain at least 3 characters.'),
});

type CommentFormData = z.infer<typeof schema>;

interface CommentFormProps {
  onSubmit: (data: { text: string }) => void;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormData>({
    resolver: zodResolver(schema),
  });

  const user = useSelector((state: RootState) => state.auth.user);

  const submit = (data: CommentFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.commentForm}>
      <div className={styles.userInfo}>
        <Image
          src="/icons/avatar.png"
          alt="User avatar"
          className={styles.avatar}
          width={40}
          height={40}
        />
        <span className={styles.username}>{user?.name || 'Користувач'}</span>
      </div>

      <div className={styles.inputGroup}>
        <textarea
          {...register('text')}
          placeholder="Write a comment here"
          className={styles.textarea}
        />
        {errors.text && <p className={styles.error}>{errors.text.message}</p>}
      </div>

      <button type="submit" className={styles.submitButton}>
        Add comment
      </button>
    </form>
  );
}
