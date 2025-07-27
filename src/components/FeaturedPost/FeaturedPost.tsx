'use client';

import Image from 'next/image';
import styles from './FeaturedPost.module.scss';
import { img_features } from '@/images/postImages/CarouselImgs';
import { useMemo } from 'react';
import { Post } from '@/types/Post';

interface Props {
  post: Post;
}

export default function FeaturedPost({ post }: Props) {
  const img = useMemo(() => img_features.randomImg(), []);
  return (
    <div className={styles.postCard}>
      <Image
        src={img}
        alt={post.title}
        className={styles.postImg}
        width={400}
        height={300}
      />
      <div className={styles.postInfo}>
        <h3>{post.title}</h3>
        <p className={styles.desc}>{post.content.slice(0, 50)}...</p>
      </div>
    </div>
  );
}
