'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IOrder } from '~/app-types/order';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Textarea } from '~/components/ui/textarea';
import { getFormattedDate } from '~/utils/misc';
import { rejectOrder } from './actions';

export const adminColumns: ColumnDef<IOrder>[] = [
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
    id: 'username',
    header: 'User name',
    accessorKey: 'user.name',
    cell: (props) => {
      return <div className='text-sm'>{props.getValue() as string}</div>;
    },
  },
  {
    id: 'email',
    header: 'User email',
    accessorKey: 'user.email',
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
      const [note, setNote] = useState<string>('');
      const [open, setOpen] = useState(false);
      return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'}>
              <BsThreeDotsVertical className='cursor-pointer' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Button
                className='w-full'
                size={'sm'}
                variant={'ghost'}
                onClick={() => router.push('/orders/' + original.id)}
              >
                View
              </Button>
            </DropdownMenuItem>
            {original.status === 'pending' && (
              <DropdownMenuItem asChild>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className='w-full text-red-500'
                      size={'sm'}
                      variant={'ghost'}
                    >
                      Reject
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Sure to reject?</DialogTitle>
                    <Textarea
                      rows={5}
                      placeholder='Please provide a note for rejection'
                      className='resize-none'
                      required={true}
                      onChange={(e) => setNote(e.target.value)}
                    />
                    {/* TODO: make this look better */}
                    <DialogFooter>
                      <DialogClose>
                        <Button variant={'secondary'} size={'sm'}>
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        onClick={async () => {
                          await rejectOrder(original.id, note);
                          setOpen(false);
                        }}
                        size={'sm'}
                        disabled={note.length == 0}
                        variant={'destructive'}
                      >
                        Reject
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
