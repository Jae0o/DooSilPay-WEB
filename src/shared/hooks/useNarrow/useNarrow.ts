import { useEffect, useRef, useState } from 'react';

import type { UseNarrowParams } from './useNarrow.type';

const useNarrow = ({ maxWidth = 560 }: UseNarrowParams = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [narrow, setNarrow] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      setNarrow(entry.contentRect.width < maxWidth);
      setWidth(entry.contentRect.width);
    });

    ro.observe(el);

    return () => ro.disconnect();
  }, [maxWidth]);

  return [ref, narrow, width] as const;
};

export default useNarrow;
