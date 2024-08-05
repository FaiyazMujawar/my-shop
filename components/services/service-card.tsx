'use client';

import { Button } from '@components/ui/button';
import { Service } from '@custom-types/service';
import { useRouter } from 'next/navigation';
import { FaEye } from 'react-icons/fa6';

type ServiceCardProps = {
  service: Service;
};

const ServiceCard = ({ service }: ServiceCardProps) => {
  const router = useRouter();

  function redirectToService() {
    router.push(`/services/${service.id}`);
  }

  return (
    <div
      className='border rounded-sm p-5 cursor-pointer min-w-fit max-w-[350px]'
      onClick={redirectToService}
    >
      <div className='text-xl font-bold'>{service.title}</div>
      <div className='text-gray-500'>{service.description}</div>
      <Button variant='secondary' className='mt-4'>
        <FaEye className='mr-2' />
        View
      </Button>
    </div>
  );
};

export default ServiceCard;
