import Image from 'next/image';
import { redirect } from 'next/navigation';
import QuestionCard from '~/components/service-form/question-card';
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
          <div>
            <span className='p-1 border rounded-sm text-xs'>
              {service.type}
            </span>
          </div>
          <div className='text-5xl font-bold'>{service.title}</div>
          <div className='text-gray-600 text-xl flex items-center gap-4'>
            <span>₹{service.price}</span>
          </div>
          {session?.user?.role == 'admin' && (
            <AdminActions serviceId={service.id} />
          )}
          {session?.user?.role == 'user' && (
            <div>
              {service.type == 'online' ? (
                <Button>Order Now</Button>
              ) : (
                <div className='text-gray-500 italic'>
                  Please visit store to avail this service
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='text-xl'>Description</div>
      <div className='text-gray-500'>{service.description}</div>
      <div className='text-xl'>Required details</div>
      <div className='space-y-2'>
        {service.questions.map((question, index) => (
          <QuestionCard key={index} question={question} showDelete={false} />
        ))}
      </div>
    </div>
  );
};

export default ServicePage;
