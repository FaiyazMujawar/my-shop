import { redirect } from 'next/navigation';
import { auth } from '~/config/auth';
import { getAllOrders } from '~/data/orders';
import { adminColumns } from './admin-columns';
import { DataTable } from './data-table';
import { userColumns } from './user-columns';

const OrdersPage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect('/');
  }
  const orders = await getAllOrders(session?.user!);

  return (
    <div className='space-y-4'>
      <div className='text-2xl'>All Orders</div>
      <div>
        <DataTable
          columns={session.user.role == 'admin' ? adminColumns : userColumns}
          data={orders}
          user={session.user}
        />
      </div>
    </div>
  );
};

export default OrdersPage;
