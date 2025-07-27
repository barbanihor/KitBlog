'use client';

import ProfileContent from '@/components/ProfileContent/ProfileContent';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
