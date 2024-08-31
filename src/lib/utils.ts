import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatString(template: string, ...args: any[]): string {
  if (args.length != template.match(/{}/g)?.length) {
    throw new Error('Invalid number of arguments');
  }
  return args.reduce(
    (previous, current) =>
      (previous as string).replace('{}', current as string),
    template
  );
}
