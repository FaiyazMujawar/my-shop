import { redirect } from 'next/navigation';
import { IOrder } from '~/app-types/order';
import { auth } from '~/config/auth';
import { getOrderById } from '~/data/orders';
import { cn } from '~/lib/utils';
import { getFormattedDate } from '~/utils/misc';
import UserActions from './user-actions';

type Props = {
  params: {
    id: string;
  };
};

const OrderPage = async ({ params }: Props) => {
  const session = await auth();
  if (!session?.user) {
    redirect('/');
  }
  const order = await getOrderById(params.id);
  if (!order) {
    redirect('/');
  }

  if (session.user.role == 'user' && order.user.id != session.user.id) {
    redirect('/orders');
  }

  function getStatusColor(status: IOrder['status']) {
    switch (status) {
      case 'pending':
        return 'yellow-500';
      case 'accepted':
        return 'gray-500';
      case 'completed':
        return 'green-500';
      case 'rejected':
        return 'red-500';
    }
  }

  return (
    <div className='space-y-6'>
      <span className='text-gray-400 font-semibold py-1 rounded-full border border-l-0 pr-2'>
        <span
          className={cn(
            'border-2 rounded-full py-1 px-2 mr-2',
            `text-${getStatusColor(order.status)}`,
            `border-${getStatusColor(order.status)}`
          )}
        >
          {order.status.toUpperCase()}
        </span>
        Order ID: {order.id}
      </span>
      <div className='text-5xl font-bold'>{order.service.title}</div>
      <div className='text-xl'>₹{order.service.price}</div>
      {session.user.role == 'admin' && (
        <div className='p-2 border rounded-sm'>
          Placed by <span className='font-bold'>{order.user.name}</span> (
          {order.user.email}) on{' '}
          <span className='font-bold'>{getFormattedDate(order.createdAt)}</span>
        </div>
      )}
      <div>
        <UserActions
          user={session.user}
          orderId={order.id}
          orderStatus={order.status}
        />
      </div>
      {order.status == 'rejected' && (
        <div className='p-2 border rounded-sm'>
          <div className='font-semibold mb-2'>Rejection note</div>
          <div className='text-sm text-gray-600'>{order.note}</div>
        </div>
      )}
      <div className='text-xl'>User responses</div>
      <div className='space-y-4'>
        {order.userResponses.map((userResponse) => (
          <div key={userResponse.id}>
            <div className='font-semibold'>
              {userResponse.question.question}
            </div>
            <div className='text-sm text-gray-600'>
              {(function () {
                if (
                  userResponse.question.type == 'file' &&
                  userResponse.media
                ) {
                  return (
                    <div className='text-blue-500 underline'>
                      <a href={`/media/${userResponse.media.id!}`}>View file</a>
                    </div>
                  );
                }
                return userResponse.answer;
              })()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
