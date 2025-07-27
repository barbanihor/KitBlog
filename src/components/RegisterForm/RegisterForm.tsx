'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import styles from './RegisterForm.module.scss';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';
import { useHeader } from '../HeaderProvider/HeaderProvider';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const schema = z.object({
  name: z.string().min(2, 'Minimum 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Minimum 6 characters'),
});

type FormData = z.infer<typeof schema>;

const RegisterForm: React.FC = () => {
  const { setHeader } = useHeader();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: data.name });

      await setDoc(doc(db, 'users', user.uid), {
        name: data.name,
        email: data.email,
        createdAt: new Date().toISOString(),
      });

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email ?? '',
          name: user.displayName ?? data.name,
        })
      );

      reset();
      toast.success('Registration successful 🎉');
      router.push('/posts');
    } catch (error) {
      console.error('Помилка реєстрації:', error);
      toast.error((error as Error).message || 'Registration failed ❌');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setHeader('Welcome', <button style={{ display: 'none' }} />, 'buttonLeft');
  }, []);

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Join our community</h1>

        <div className={styles.field}>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" {...register('name')} />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

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

        <button type="submit" disabled={isLoading} className={styles.button}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
