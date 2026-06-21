import { useCallback, useState } from 'react';

const useToggle = ({ initial = false }: { initial?: boolean } = {}) => {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return [value, toggle] as const;
};

export default useToggle;
