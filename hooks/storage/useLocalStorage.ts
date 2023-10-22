import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

export default function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const isMounted = useRef(false);
  const [value, setValue] = useState<T | any>(defaultValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        let parsedItem = null;
        try {
          parsedItem = JSON.parse(item);
        } catch (e) {
          parsedItem = item;
        }
        setValue(parsedItem);
      }
    } catch (e) {
      console.log(e);
    }
    return () => {
      isMounted.current = false;
    };
  }, [key]);

  useEffect(() => {
    if (isMounted.current) {
      window.localStorage.setItem(
        key,
        typeof value === 'object' ? JSON.stringify(value) : value
      );
    } else {
      isMounted.current = true;
    }
  }, [key, value]);

  return [value, setValue];
}
