import { useEffect, useRef } from 'react';

const useMount = (fn: () => void) => {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    fn();
    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { mounted };
};

export { useMount };
