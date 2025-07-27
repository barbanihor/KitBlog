'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';
import styles from './LoginForm.module.scss';
import Link from 'next/link';
import { useHeader } from '@/components/HeaderProvider/HeaderProvider';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Minimum 6 characters'),
});

type FormData = z.infer<typeof schema>;

const LoginForm: React.FC = () => {
  const { setHeader } = useHeader();
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email ?? '',
          name: user.displayName ?? '',
        })
      );

      reset();
      toast.success('Successfully logged in');
      router.push('/posts');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error('Login failed');
    }
  };

  useEffect(() => {
    setHeader('Welcome back', <button style={{ display: 'none' }} />, 'buttonLeft');
  }, []);

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Log in to your account</h1>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register('password')} />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className={styles.button}>
          {isSubmitting ? 'Logging in...' : 'Log In'}
        </button>

        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Don&apos;t have an account? <Link href="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
