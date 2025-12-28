// Custom Hook: useLocalStorage
// C# analojisi: IConfiguration gibi persistent storage

import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
    // State tanımla
    const [value, setValue] = useState(() => {
        try {
            // LocalStorage'dan oku
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('LocalStorage okuma hatası:', error);
            return initialValue;
        }
    });

    // Value değiştiğinde LocalStorage'a kaydet
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('LocalStorage yazma hatası:', error);
        }
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;
