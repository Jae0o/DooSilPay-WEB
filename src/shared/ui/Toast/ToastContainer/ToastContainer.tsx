import { AnimatePresence } from 'motion/react';

import { useToastStore } from '@shared/store';

import Toast from '../Toast';

const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[2.8rem] z-[400] flex flex-col items-center gap-[0.8rem]">
      <AnimatePresence>
        {toasts.map((item) => (
          <Toast key={item.id} item={item} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
