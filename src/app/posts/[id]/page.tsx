import { notFound } from 'next/navigation';
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import PostDetail from '@/components/PostDetail/PostDetail';

interface PostDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;

  const postRef = doc(db, 'posts', id);
  const postSnap = await getDoc(postRef);

  if (!postSnap.exists()) {
    notFound();
  }

  const postData = postSnap.data();

  const commentsQuery = query(
    collection(db, 'posts', id, 'comments'),
    orderBy('createdAt', 'asc')
  );
  const commentsSnap = await getDocs(commentsQuery);

  const comments = commentsSnap.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      text: data.text,
      author: data.author || 'Анонім',
      createdAt: data.createdAt?.toDate().toISOString() || null,
    };
  });

  return (
    <PostDetail
      post={{
        id: postSnap.id,
        userId: postData.userId,
        title: postData.title,
        content: postData.content,
        createdAt: postData.createdAt?.toDate().toISOString() || '',
        categories: postData.categories || [],
        author: postData.author,
      }}
      comments={comments}
    />
  );
}
