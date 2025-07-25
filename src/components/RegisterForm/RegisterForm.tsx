import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './RegisterForm.module.scss';

const schema = z.object({
  email: z.string().email('Невірний email'),
  password: z.string().min(6, 'Мінімум 6 символів'),
});

type FormData = z.infer<typeof schema>;

interface RegisterFormProps {
  onSubmit: (data: FormData) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
