import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import EditPostContent from '@/components/EditPostContent/EditPostContent';

interface PageProps {
  params: {
    id: string;
  };
}

const EditPost = ({ params }: PageProps) => {
  return (
    <ProtectedRoute>
      <EditPostContent id={params.id} />
    </ProtectedRoute>
  );
};

export default EditPost;
