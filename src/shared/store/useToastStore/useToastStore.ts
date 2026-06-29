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
    // crypto.randomUUID 는 secure context(HTTPS·localhost)에서만 존재 → http+LAN IP(모바일) 대비 폴백
    const id = crypto.randomUUID?.() ?? `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    set((state) => ({ toasts: [...state.toasts, { id, message, variant, duration }] }));

    if (duration > 0) setTimeout(() => get().dismiss(id), duration);

    return id;
  },

  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

export default useToastStore;
