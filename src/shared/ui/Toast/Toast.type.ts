export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
}

export interface ShowToastOptions {
  message: string;
  variant?: ToastVariant;
  duration?: number;
}
