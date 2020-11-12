import { useState, useEffect, useRef } from "react";

const useLocalStorage = (initialState = {}, key: string) => {
  const [storage, setStorage] = useState(() => {
    const storageInit = window.localStorage.getItem(key);
    if (storageInit) {
      return JSON.parse(storageInit);
    }
    return initialState;
  });
  const prevKeyRef = useRef(key);
  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, JSON.stringify(storage));
  }, [key, storage]);
  return { storage, setStorage };
};

export default useLocalStorage;
