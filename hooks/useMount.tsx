import { useEffect, useRef } from 'react';

const useMount = (fn?: () => void) => {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    fn?.();
    return () => {
      mounted.current = false;
    };
  }, []);

  return { mounted };
};

export { useMount };
