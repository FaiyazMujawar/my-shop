'use client';

import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa6';
import { Button } from '~/components/ui/button';

const AddServiceButton = () => {
  const router = useRouter();
  return (
    <Button
      className='rounded-full px-3 py-5 fixed bottom-10 right-10'
      onClick={() => router.push('/services/add')}
    >
      <FaPlus className='mr-2' />
      Add Service
    </Button>
  );
};

export default AddServiceButton;
