'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './KitBlogHome.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import FeaturedPost from '@/components/FeaturedPost/FeaturedPost';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchPosts } from '@/redux/slices/postSlice';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useHeader } from '@/components/HeaderProvider/HeaderProvider';

export default function KitBlogHome() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);
  const [featuredPosts, setFeaturedPosts] = useState<typeof posts>([]);
  const { setHeader } = useHeader();

  const handleClick = () => {
    router.push('/posts/new');
  };
  const addButton = useMemo(
    () => (
      <button className={styles.addPostButton} onClick={handleClick}>
        <Image src="/icons/plus.svg" alt="plusIcon" height={40} width={40} />
      </button>
    ),
    []
  );

  useEffect(() => {
    dispatch(fetchPosts());
    setHeader('KitBlog', addButton, 'buttonRight');
  }, [dispatch]);

  useEffect(() => {
    if (posts.length) {
      const shuffled = [...posts].sort(() => 0.5 - Math.random());
      setFeaturedPosts(shuffled.slice(0, 8));
    }
  }, [posts]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!posts.length) return <p>No posts available</p>;

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Welcome to KitBlog</h1>
      <p className={styles.intro}>
        Discover insightful articles, engaging stories, and expert opinions on a wide
        range of topics. Dive into our curated collection of featured posts and explore
        the latest updates from our talented authors.
      </p>

      <h2 className={styles.subTitle}>Featured Posts</h2>

      <div className={styles.carousel}>
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={2}
          pagination={{ clickable: true }}
          breakpoints={{
            768: {
              slidesPerView: 4,
            },
          }}
        >
          {featuredPosts.map((post) => (
            <SwiperSlide key={post.id}>
              <div
                onClick={() => router.push(`/posts/${post.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <FeaturedPost post={post} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <section className={styles.extraSection}>
        <h3>Popular Topics</h3>
        <div className={styles.tags}>
          <button>Technology</button>
          <button>Travel</button>
          <button>Health</button>
          <button>Culture</button>
          <button>Sports</button>
        </div>
      </section>
    </section>
  );
}
