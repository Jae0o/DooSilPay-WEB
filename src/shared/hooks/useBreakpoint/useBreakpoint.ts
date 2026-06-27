import { useEffect, useState } from 'react';

const MOBILE_QUERY = '(max-width: 767px)'; // < 768px = 모바일

const getMatches = (query: string) => typeof window !== 'undefined' && window.matchMedia(query).matches;

const useBreakpoint = ({ query = MOBILE_QUERY }: { query?: string } = {}) => {
  const [matches, setMatches] = useState(() => getMatches(query));

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);

    onChange(); // 초기 동기화

    mql.addEventListener('change', onChange);

    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};

export default useBreakpoint;
