import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { createPortal } from 'react-dom';

import { useBreakpoint, useEscapeKey } from '@shared/hooks';
import { cn } from '@shared/utils';

import { IconButton } from '../IconButton';
import { CloseIcon } from '../Icons';

import type { ModalProps, ModalSize } from './Modal.type';

const MAX_WIDTH: Record<ModalSize, string> = {
  sm: 'md:max-w-[42rem]',
  md: 'md:max-w-[56rem]',
  lg: 'md:max-w-[76rem]',
  xl: 'md:max-w-[96rem]',
};

const Modal = ({ open, onClose, title, subtitle, size = 'md', footer, padded = true, children }: ModalProps) => {
  const isMobile = useBreakpoint();
  const reduce = useReducedMotion();

  useEscapeKey({ enabled: open, onEscape: onClose });

  const sheet = { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } };

  const pop = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  };

  const motionProps = reduce ? {} : isMobile ? sheet : pop;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-center bg-[rgba(18,24,33,0.42)] backdrop-blur-[0.2rem] md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className={cn(
              'flex max-h-[94vh] w-full flex-col rounded-t-xl bg-surface shadow-pop md:max-h-[90vh] md:rounded-xl',
              MAX_WIDTH[size],
            )}
            onClick={(e) => e.stopPropagation()}
            {...motionProps}
          >
            <header className="flex items-start gap-[1.2rem] px-[2.4rem] pt-[2.2rem]">
              <div className="min-w-0 flex-1">
                {title && <h2 className="text-[1.9rem] font-bold tracking-[-0.02em]">{title}</h2>}
                {subtitle && <p className="mt-[0.4rem] text-[1.4rem] text-ink-3">{subtitle}</p>}
              </div>
              <IconButton label="닫기" onClick={onClose} className="-mt-[0.6rem] -mr-[0.8rem]" icon={<CloseIcon />} />
            </header>

            <div className={cn('flex-1 overflow-y-auto', padded && 'px-[2.4rem] py-[2rem]')}>{children}</div>

            {footer && (
              <footer className="flex justify-end gap-[1rem] border-t border-line px-[2.4rem] py-[1.6rem]">
                {footer}
              </footer>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default Modal;
