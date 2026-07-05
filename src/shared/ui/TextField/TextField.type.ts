import type { ReactNode } from 'react';

import type { TextInputProps } from '../TextInput';

export interface TextFieldProps extends TextInputProps {
  label?: ReactNode;
  required?: boolean;
  hint?: ReactNode;
  error?: ReactNode;
}
