'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { IService } from '~/app-types/service';
import { Button } from '~/components/ui/button';

type ServiceCardProps = {
  service: IService;
};

const ServiceCard = ({ service }: ServiceCardProps) => {
  const router = useRouter();
  return (
    <div className='border rounded-sm p-3 flex flex-col justify-between space-y-4'>
      <Image
        src={service.image ?? '/no-preview-available.svg'}
        width={480}
        height={270}
        alt={service.title}
        className='rounded-sm overflow-hidden'
      />
      <span className='p-1 rounded-sm border w-fit text-xs text-gray-500'>
        {service.type.toUpperCase()}
      </span>
      <div className='text-lg font-semibold'>{service.title}</div>
      <div className='text-gray-500 line-clamp-2'>{service.description}</div>
      <div className='flex justify-between items-center'>
        <span>₹{service.price}</span>
        <Button size={'icon'} variant={'outline'}>
          <MdKeyboardArrowRight
            onClick={() => {
              console.log('clicked');
              router.push(`/services/${service.id}`);
            }}
          />
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
