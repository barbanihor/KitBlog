'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import RegisterForm from '@/components/RegisterForm/RegisterForm';

export default function RegisterPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (data: { email: string; password: string }) => {
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push('/posts');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main>
      <RegisterForm onSubmit={handleRegister} />
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </main>
  );
}
