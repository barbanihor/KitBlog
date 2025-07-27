'use client';

import { Post } from '@/types/Post';
import Link from 'next/link';
import styles from './PostItem.module.scss';
import Image from 'next/image';
import { imgs } from '@/images/postImages';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  post: Post;
  showEditButton?: boolean;
}

export default function PostItem({ post, showEditButton = false }: Props) {
  const image = useMemo(() => imgs.randomImg(), []);
  const router = useRouter();

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    router.push(`/posts/${post.id}/edit`);
  };

  return (
    <Link href={`/posts/${post.id}`}>
      <div key={post.id} className={styles.postItem}>
        <Image src={image} width={56} height={56} alt="Post image" />
        <div className={styles.postItem__info}>
          <h3 className={styles.postItem__title}>{post.title}</h3>
          <p className={styles.postItem__author}>By {post.author}</p>
        </div>
        {showEditButton && (
          <button onClick={handleEdit} className={styles.editButton}>
            Edit
          </button>
        )}
      </div>
    </Link>
  );
}
