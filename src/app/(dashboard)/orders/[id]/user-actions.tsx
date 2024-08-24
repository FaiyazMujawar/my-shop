'use client';

import { User } from 'next-auth';
import { IOrder } from '~/app-types/order';

import { Button } from '~/components/ui/button';
import CancelOrder from './(action-buttons)/cancel-order';
import MarkDone from './(action-buttons)/mark-done';
import RejectOrder from './(action-buttons)/reject-order';

type Props = {
  user: User;
  orderId: string;
  orderStatus: IOrder['status'];
};

const UserActions = ({ user, orderStatus, orderId }: Props) => {
  if (user.role == 'user') {
    return <CancelOrder orderId={orderId} />;
  }
  if (orderStatus == 'accepted') {
    return <MarkDone orderId={orderId} />;
  }
  if (orderStatus != 'pending') {
    return <div></div>;
  }
  return (
    <div className='space-x-2'>
      <Button variant={'success'}>Accept</Button>
      <RejectOrder orderId={orderId} />
    </div>
  );
};

export default UserActions;
