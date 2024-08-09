'use client';

import React from "react";
import { Button, ButtonProps } from "./ui/button";

type ActionButtonProps = {
  icon?: React.ReactNode
  title: string
  action: () => unknown
} & ButtonProps
export const ActionButton = ({ title, action, icon, ...rest }: ActionButtonProps) => {
  return (
    <Button onClick={action} {...rest}>
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </Button>
  );
}