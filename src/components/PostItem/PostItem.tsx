'use client';

import { Post } from '@/types/Post';
import Link from 'next/link';
import styles from './PostItem.module.scss';
import Image from 'next/image';
import { imgs } from '@/images/postImages';

interface Props {
  post: Post;
}

export default function PostItem({ post }: Props) {
  const image = imgs.randomImg();
  return (
    <li key={post.id} className={styles.postItem}>
      <Image src={image} width={56} height={56} alt="Post image" />
      <div className={styles.postItem__info}>
        <Link href={`/posts/${post.id}`}>
          <h3 className={styles.postItem__title}>{post.title}</h3>
        </Link>
        <p className={styles.postItem__author}>By {post.author}</p>
      </div>
    </li>
  );
}
