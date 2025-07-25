import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import styles from './RegisterForm.module.scss';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';

const schema = z.object({
  name: z.string().min(2, 'Мінімум 2 символи'),
  email: z.string().email('Невірний email'),
  password: z.string().min(6, 'Мінімум 6 символів'),
});

type FormData = z.infer<typeof schema>;

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
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
      console.log('Успішна реєстрація');
    } catch (error) {
      console.error('Помилка реєстрації:', error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label htmlFor="name">Ім’я</label>
        <input id="name" type="text" {...register('name')} />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Пароль</label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className={styles.button}>
        Зареєструватися
      </button>
    </form>
  );
};

export default RegisterForm;
