'use client';

import { Button, ButtonProps } from "~/components/ui/button";

type ActionButtonProps = {
  action: () => unknown;
  title: string;
} & ButtonProps;

const ActionButton = ({ title, action, ...rest }: ActionButtonProps) => {
  return (
    <Button className='cursor-pointer' onClick={action} {...rest}>
      {title}
    </Button>
  );
};

export default ActionButton;
