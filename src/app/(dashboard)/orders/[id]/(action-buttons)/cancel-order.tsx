'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { cancelOrder } from '../actions';

type Props = {
  orderId: string;
};

const CancelOrder = ({ orderId }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={'destructive'}>Cancel</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Sure to Cancel?</DialogTitle>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={'secondary'}>No</Button>
            </DialogClose>
            <Button
              variant={'destructive'}
              onClick={async () => {
                await cancelOrder(orderId);
                setOpen(false);
              }}
            >
              Cancel Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CancelOrder;
