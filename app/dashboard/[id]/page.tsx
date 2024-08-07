import { redirect } from 'next/navigation';
import { auth } from '~/config/auth';
import { getOrderById } from '~/services/orders';

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
    <div>
      <div className='text-3xl'>{order.service.title}</div>
      <p>{order.service.description}</p>
      <div className='text-xl'>Responses</div>
      {order.answers.map((answer) => {
        return (
          <div key={answer.id}>
            <div>{answer.question.text}</div>
            <div>{answer.answer}</div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderPage;
