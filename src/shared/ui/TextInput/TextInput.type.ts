import type { InputHTMLAttributes, ReactNode, Ref } from 'react';

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  invalid?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  ref?: Ref<HTMLInputElement>;
}
