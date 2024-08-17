import Image from 'next/image';
import { redirect } from 'next/navigation';
import ResponseIcon from '~/components/response-icon';
import { Button } from '~/components/ui/button';
import { auth } from '~/config/auth';
import { getServiceById } from '~/data/services';
import AdminActions from './admin-actions';

type ServicePageProps = {
  params: {
    id: string;
  };
};

const ServicePage = async ({ params }: ServicePageProps) => {
  const session = await auth();
  const service = await getServiceById(params.id);
  if (!service) {
    redirect('/');
  }
  return (
    <div className='space-y-4'>
      <div className='flex gap-4 items-center'>
        <Image
          src={service.image ?? '/no-preview-available.svg'}
          width={480}
          height={270}
          alt={service.title}
          className='rounded-lg overflow-hidden'
        />
        <div className='space-y-4'>
          <div className='text-5xl font-bold'>{service.title}</div>
          <div className='text-gray-600 text-xl flex items-center gap-4'>
            <span className='p-1 border rounded-sm text-xs'>
              {service.type}
            </span>
            <span>₹{service.price}</span>
          </div>
          {session && <AdminActions serviceId={service.id} />}
        </div>
      </div>
      <div className='text-gray-500'>{service.description}</div>
      <div className='text-2xl font-semibold'>Required details</div>
      <div className='space-y-2'>
        {service.questions.map((question) => (
          <div
            key={question.id}
            className='border p-2 rounded-sm flex gap-2 items-center'
          >
            <ResponseIcon type={question.type} />
            <div>{question.question}</div>
            {question.required && <div className='text-red-500'>*</div>}
          </div>
        ))}
      </div>
      <div>
        {service.type == 'online' ? (
          <Button size={'lg'}>Order Now</Button>
        ) : (
          <div className='text-gray-500 italic'>
            Please visit store to avail this service
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicePage;
