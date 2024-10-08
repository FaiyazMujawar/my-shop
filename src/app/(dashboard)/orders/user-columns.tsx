'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { IOrder } from '~/app-types/order';
import { Button } from '~/components/ui/button';
import { getFormattedDate } from '~/utils/misc';

export const userColumns: ColumnDef<IOrder>[] = [
  {
    header: '#',
    cell: (props) => {
      return (
        <div className='p-2 text-center'>{parseInt(props.row.id) + 1}</div>
      );
    },
  },
  {
    id: 'orderId',
    header: 'Order ID',
    accessorKey: 'id',
    cell: (props) => {
      return (
        <span className='text-xs text-gray-500 border rounded-full px-2 py-1'>
          {(props.getValue() as string).substring(0, 5)}
        </span>
      );
    },
  },
  {
    id: 'service',
    header: 'Service',
    accessorKey: 'service.title',
    cell: (props) => {
      return <div className='text-sm'>{props.getValue() as string}</div>;
    },
  },
  {
    id: 'orderDate',
    header: 'Placed On',
    accessorKey: 'createdAt',
    cell: (props) => {
      return (
        <div className='text-sm'>
          {getFormattedDate(props.getValue() as string)}
        </div>
      );
    },
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: (props) => {
      return (
        <div className='text-xs border px-2 py-1 text-gray-500 rounded-full w-fit'>
          {(props.getValue() as string).toUpperCase()}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row: { original } }) => {
      const router = useRouter();
      return (
        <div>
          <Button
            variant={'secondary'}
            size={'icon'}
            onClick={() => router.push(`/orders/${original.id}`)}
          >
            <MdKeyboardArrowRight />
          </Button>
        </div>
      );
    },
  },
];
