import { redirect } from 'next/navigation';
import { auth } from '~/config/auth';
import { getOrderById } from '~/services/orders';
import MarkDoneButton from './mark-done-button';
import { RejectButton } from './reject-button';

// TODO: implement mark as done or reject

type OrderPageProps = {
  params: {
    id: string;
  };
};

const OrderPage = async ({ params }: OrderPageProps) => {
  const session = await auth();
  if (!session) {
    redirect('/');
  }
  const order = await getOrderById(params.id);
  if (!order) {
    redirect('/');
  }
  return (
    <div className='flex space-x-4'>
      <div className='w-2/3'>
        <span className="text-gray-400">Order ID: {order.id}</span>
        <h1 className='text-[4rem] font-bold'>{order.service.title}</h1>
        <div className='py-2 text-lg'><span className='text-gray-400'>Placed by:</span> {order.user.name}</div>
        <div className='py-2 text-lg'><span className='text-gray-400'>Placed on:</span> {new Date(order.createdAt!).toDateString()}</div>
        <div className='py-4'>
          <MarkDoneButton params={{
            id: params.id
          }} />
          <RejectButton />
        </div>
      </div>
      <div className='w-1/3 space-y-4'>
        <div className='text-2xl mb-4 font-bold'>Responses</div>
        {order.answers.map((answer) => {
          return (
            <div key={answer.id}>
              <div className='font-bold'>{answer.question.text} {answer.question.required && <span className='text-red-500'>*</span>}</div>
              {
                answer.type == 'file' ? <div>{answer.filename} <a href={answer.objectKey!}></a></div> : <div>{answer.answer}</div>
              }
            </div>
          );
        })}

      </div>
    </div >
  );
};

export default OrderPage;
