import { redirect } from 'next/navigation';
import { OrderForm } from '~/components/order/order-form';
import QuestionCard from '~/components/question-card';

import { auth } from '~/config/auth';
import { getServiceById } from '~/lib/db/service';

type ServicePageProps = {
  params: {
    id: string;
  };
};

const ServicePage = async (props: ServicePageProps) => {
  const service = await getServiceById(props.params.id);
  const session = await auth();

  if (service == undefined) {
    redirect('/');
  }
  return (
    <div className='space-y-4'>
      <div className='flex justify-between text-3xl '>
        <h1 className='font-bold'>{service.title}</h1>
        <div>${service.price}</div>
      </div>
      <div className='text-gray-500'>{service.description}</div>
      {service.questions.length > 0 && (
        <div>
          <div className='text-xl font-bold mb-4'>Questions</div>
          {service.questions.map((question, index) => (
            <QuestionCard key={index} question={question} />
          ))}
        </div>
      )}
      {session != null && <OrderForm session={session} service={service} />}
    </div>
  );
};

export default ServicePage;
