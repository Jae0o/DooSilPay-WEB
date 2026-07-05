import { useEffect, useState } from 'react';

import type { UseDebouncedKeywordParams } from './useDebouncedKeyword.type';

const useDebouncedKeyword = ({ q, onChange }: UseDebouncedKeywordParams) => {
  const [keyword, setKeyword] = useState(q ?? '');

  useEffect(() => {
    if ((q ?? '') === keyword) return; // mount 직후·동일 값이면 발화하지 않음 (초기 중복 fetch 방지)

    const id = setTimeout(() => onChange({ q: keyword || undefined, page: 1 }), 300);

    return () => clearTimeout(id);
  }, [keyword, q, onChange]);

  return [keyword, setKeyword] as const;
};

export default useDebouncedKeyword;
