import type { ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  size?: ModalSize;
  footer?: ReactNode;
  padded?: boolean;
  children?: ReactNode;
}
