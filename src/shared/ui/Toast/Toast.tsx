import { motion, useReducedMotion } from 'motion/react';
import type { ComponentType } from 'react';

import { cn } from '@shared/utils';

import { AlertIcon, CheckCircleIcon, type IconProps, InfoIcon } from '../Icons';

import type { ToastItem, ToastVariant } from './Toast.type';

const VARIANT_ICON: Record<ToastVariant, { Icon: ComponentType<IconProps>; color: string }> = {
  info: { Icon: InfoIcon, color: 'text-point' },
  success: { Icon: CheckCircleIcon, color: 'text-ok' },
  warning: { Icon: AlertIcon, color: 'text-warn' },
  error: { Icon: AlertIcon, color: 'text-danger' },
};

const Toast = ({ item }: { item: ToastItem }) => {
  const shouldReduceMotion = useReducedMotion();
  const offset = shouldReduceMotion ? 0 : 20;
  const { Icon, color } = VARIANT_ICON[item.variant];

  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: offset }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: offset }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={cn(
        'flex items-center gap-[1rem] rounded-md bg-ink px-[2rem] py-[1.3rem] text-[1.5rem] font-semibold text-white shadow-lg',
      )}
    >
      <Icon size="1.8rem" className={color} />

      <span>{item.message}</span>
    </motion.div>
  );
};

export default Toast;
