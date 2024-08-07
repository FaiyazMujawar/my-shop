'use client';

import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuSeparator,
} from '~/components/ui/dropdown-menu';
import { IOrder } from '~/types/order';
import ActionButton from './action-button';

export const columns: ColumnDef<IOrder>[] = [
  {
    id: '1',
    header: 'Order ID',
    cell: ({ row }) => (
      <span className='rounded-full border px-2 py-1'>
        {row.original.id.substring(0, 5)}
      </span>
    ),
  },
  {
    id: '2',
    header: 'Service Name',
    cell: ({ row }) => row.original.service.title,
    enableSorting: true,
  },
  {
    id: '3',
    header: 'Raised By',
    cell: ({ row }) => row.original.user.name,
  },
  {
    id: '4',
    header: 'Email',
    cell: ({ row }) => row.original.user.email,
  },
  {
    id: '5',
    header: 'Status',
    cell: ({
      row: {
        original: { status },
      },
    }) => (
      <span
        className={`text-xs text-gray-500 font-semibold ${
          status == 'PENDING' ? '' : 'text-green-500'
        }`}
      >
        {status}
      </span>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'ghost'} size={'icon'}>
                <BsThreeDotsVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='border rounded p-3 bg-white space-y-2'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ActionButton
                title='View'
                onClick={() => {
                  console.log('1');
                }}
              />
              <div className='text-red-500'>
                <ActionButton title='Reject' onClick={() => {}} />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
