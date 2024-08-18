import { redirect } from 'next/navigation';
import { auth } from '~/config/auth';
import { getAllOrders } from '~/data/orders';
import { columns } from './columns';
import { DataTable } from './data-table';

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
        <DataTable columns={columns} data={orders} />
      </div>
    </div>
  );
};

export default OrdersPage;
