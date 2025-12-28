// Custom Hook: useLocalStorage (TypeScript)
// C# analojisi: IConfiguration + Generic Types

'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
    // State tanımla
    const [value, setValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('LocalStorage okuma hatası:', error);
            return initialValue;
        }
    });

    // Value değiştiğinde LocalStorage'a kaydet
    useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('LocalStorage yazma hatası:', error);
        }
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;
