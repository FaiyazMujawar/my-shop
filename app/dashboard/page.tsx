import { auth } from '~/config/auth';

import { redirect } from 'next/navigation';
import { getAllOrders } from '~/services/orders';
import { columns } from './columns';
import { DataTable } from './data-table';

const Dashboard = async () => {
  const session = await auth();
  if (!session) {
    redirect('/');
  }
  const orders = await getAllOrders(session?.user!);

  return (
    <div className='space-y-4'>
      <div className='text-2xl'>All Orders</div>
      <DataTable data={orders} columns={columns} />
    </div>
  );
};

export default Dashboard;
