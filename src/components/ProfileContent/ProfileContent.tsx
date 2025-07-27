'use client';

import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { clearUser } from '@/redux/slices/authSlice';
import { fetchPosts } from '@/redux/slices/postSlice';
import PostItem from '@/components/PostItem/PostItem';
import { useHeader } from '@/components/HeaderProvider/HeaderProvider';
import styles from './Profile.module.scss';
import { RootState, AppDispatch } from '@/redux/store';

export default function ProfileContent() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { setHeader } = useHeader();

  const user = useSelector((state: RootState) => state.auth.user);
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    setHeader('Profile', <button style={{ display: 'none' }} />, 'buttonLeft');
    dispatch(fetchPosts());
  }, [dispatch, setHeader]);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
    router.push('/login');
  };

  const userPosts = useMemo(() => {
    return posts.filter((post) => post.userId === user?.uid);
  }, [posts, user]);

  return (
    <div className={styles.container}>
      <div className={`${styles.box} ${styles.box__1}`}>
        <h2 className={styles.sectionTitle}>Profile</h2>
        <p>
          <strong>Name:</strong> {user?.name || 'No name'}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Log Out
        </button>
      </div>

      <div className={styles.box}>
        <h2 className={styles.sectionTitle}>My posts</h2>
        {loading && <p>Loading posts...</p>}
        {error && <p className={styles.errorText}>Error: {error}</p>}
        {!loading && userPosts.length === 0 && (
          <p className={styles.noPostsText}>You haven’t created any posts yet.</p>
        )}

        <ul className={styles.postList}>
          {userPosts.map((post) => (
            <li key={post.id} className={styles.postItemWrapper}>
              <PostItem post={post} showEditButton />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
