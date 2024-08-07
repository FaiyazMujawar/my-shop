'use client';

import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa6';
import { Button } from '~/components/ui/button';

interface CreateServicesButtonProps {
  session?: Session | null;
}

export function CreateServicesButton({ session }: CreateServicesButtonProps) {
  const router = useRouter();
  if (session?.user?.role != 'ADMIN') {
    return <div></div>;
  }

  function handleClick() {
    router.push('/services/create');
  }

  return (
    <div className='fixed bottom-10 right-10'>
      <Button className='text-lg px-4 py-6 rounded-full' onClick={handleClick}>
        <FaPlus className='mr-2' size={20} /> Add Service
      </Button>
    </div>
  );
}
