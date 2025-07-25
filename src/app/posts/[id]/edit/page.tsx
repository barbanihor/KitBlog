import { doc, getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import { db } from '@/lib/firebase';
import EditPost from '@/components/EditPost/EditPost';

interface EditPageProps {
  params: {
    id: string;
  };
}

export default async function EditPage({ params }: EditPageProps) {
  const postRef = doc(db, 'posts', params.id);
  const postSnap = await getDoc(postRef);

  if (!postSnap.exists()) {
    notFound();
  }

  const postData = postSnap.data();

  return (
    <EditPost
      post={{
        id: postSnap.id,
        title: postData.title,
        content: postData.content,
      }}
    />
  );
}
