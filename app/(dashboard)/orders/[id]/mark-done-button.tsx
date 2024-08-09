'use client'

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "~/components/ui/button";
import { DialogFooter, DialogHeader } from "~/components/ui/dialog";

type ActionButtonProps = {
  params: {
    id: string;
  };

}

const MarkDoneButton = ({ params }: ActionButtonProps) => {
  return <Dialog>
    <DialogTrigger asChild>
      <Button>Mark as done</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Upload Result</DialogTitle>
        <div>
          <input type="file" />
        </div>
        <DialogFooter>
          <Button>Submit</Button>
        </DialogFooter>
      </DialogHeader>
    </DialogContent>
  </Dialog>;
}

export default MarkDoneButton;