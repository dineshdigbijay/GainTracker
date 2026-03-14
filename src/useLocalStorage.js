import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (e) {
      console.error(e);
    }
  };

  return [storedValue, setValue];
}

export function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

export function getWeekDayIndex() {
  const day = new Date().getDay(); // 0=Sun, 1=Mon...
  return day === 0 ? 6 : day - 1; // Convert to Mon=0...Sun=6
}
