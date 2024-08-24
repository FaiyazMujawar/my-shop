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
import { Textarea } from '~/components/ui/textarea';
import { rejectOrder } from '../actions';

type Props = {
  orderId: string;
};

const RejectOrder = ({ orderId }: Props) => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'destructive'}>Reject</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Sure to delete?</DialogTitle>
        <Textarea
          rows={5}
          placeholder='Add a note'
          className='resize-none'
          onChange={(e) => setNote(e.target.value)}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'secondary'}>No</Button>
          </DialogClose>
          <Button
            variant={'destructive'}
            disabled={note.length === 0}
            onClick={async () => {
              await rejectOrder(orderId, note);
              setOpen(false);
            }}
          >
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectOrder;
