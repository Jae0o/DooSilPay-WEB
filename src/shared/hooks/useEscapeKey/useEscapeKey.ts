import { useEffect } from 'react';

const useEscapeKey = ({ enabled = true, onEscape }: { enabled?: boolean; onEscape: () => void }) => {
  useEffect(() => {
    if (!enabled) return;

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onEscape();

    document.addEventListener('keydown', onKey);

    return () => document.removeEventListener('keydown', onKey);
  }, [enabled, onEscape]);
};

export default useEscapeKey;
