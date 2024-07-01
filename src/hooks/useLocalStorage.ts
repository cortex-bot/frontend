import { useEffect, useState } from "react";

export type BrokerDetails = {
  name: string;
};

function useLocalStorage<T>(key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      try {
        return item ? JSON.parse(item) : initialValue;
      } catch (parseError) {
        if (parseError instanceof SyntaxError) {
          console.error(
            "Error parsing stored value. Please make sure to always access Local Storage using the 'useLocalStorage' hook",
            parseError
          );
          return item;
        }
      }
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.log(error);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialValue]);

  return { storedValue, setValue } as const;
}

export default useLocalStorage;
