// src/app/dashboard/page.tsx

'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const DashboardPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // No hacer nada mientras se carga
    if (!session) router.push('/login'); // Redirigir si no está autenticado
  }, [session, status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Dashboard</h1>
      <p>Welcome, {session?.user?.name}</p>
      <p>Your role: {session?.user?.role}</p>
    </div>
  );
};

export default DashboardPage;
