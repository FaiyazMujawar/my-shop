'use server';

import { signIn, signOut } from '~/config/auth';

export async function logIn() {
  await signIn('google');
}

export async function logOut() {
  await signOut();
}
