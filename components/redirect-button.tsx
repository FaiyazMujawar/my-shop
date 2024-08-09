'use client';

import { useRouter } from "next/navigation";
import { ActionButton } from "./action-button";
import { ButtonProps } from "./ui/button";

type Props = {
  title: string
  icon?: React.ReactNode,
  redirectUri: string
} & ButtonProps

export const RedirectButton = ({ icon, title, redirectUri, ...rest }: Props) => {
  const router = useRouter()

  function redirect() {
    router.push(redirectUri)
  }
  return <ActionButton title={title} action={redirect} icon={icon} {...rest}></ActionButton>

}