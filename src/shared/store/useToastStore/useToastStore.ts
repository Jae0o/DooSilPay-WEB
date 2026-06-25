import { create } from 'zustand';

import type { ShowToastOptions, ToastItem } from '@shared/ui';

interface ToastState {
  toasts: ToastItem[];

  show: (options: ShowToastOptions) => string;
  dismiss: (id: string) => void;
}

const DEFAULT_DURATION = 2600;

const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],

  show: ({ message, variant = 'info', duration = DEFAULT_DURATION }) => {
    const id = crypto.randomUUID();
    set((state) => ({ toasts: [...state.toasts, { id, message, variant, duration }] }));

    if (duration > 0) setTimeout(() => get().dismiss(id), duration);

    return id;
  },

  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

export default useToastStore;
