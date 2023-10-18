import { useState } from 'react';

export function useLocalStorage(key: string, initialValue?: any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(
        key,
        typeof value === 'object' ? JSON.stringify(value) : value
      );
    } catch (error) {
      // console.error(error);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      //
    }
  };

  return [storedValue, setValue, removeValue];
}
