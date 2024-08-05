'use client';

import { Button } from '@components/ui/button';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa6';

interface CreateServicesButtonProps {
  session?: Session | null;
}

export function CreateServicesButton({ session }: CreateServicesButtonProps) {
  const router = useRouter();
  if (session?.user.role != 'ADMIN') {
    return <div></div>;
  }

  function handleClick() {
    router.push('/services/create');
  }

  return (
    <div>
      <Button onClick={handleClick}>
        <FaPlus className='mr-2' />
        Add Services
      </Button>
    </div>
  );
}
