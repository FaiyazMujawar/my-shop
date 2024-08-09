'use client';

import { useRouter } from 'next/navigation';

const DashboardButton = () => {
  const router = useRouter();
  return (
    <div
      className='cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-sm'
      onClick={() => router.push('/orders')}
    >
      Dashboard
    </div>
  );
};

export default DashboardButton;
