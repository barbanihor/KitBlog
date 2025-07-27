import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import EditPostContent from '@/components/EditPostContent/EditPostContent';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const EditPost = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <ProtectedRoute>
      <EditPostContent id={id} />
    </ProtectedRoute>
  );
};

export default EditPost;
