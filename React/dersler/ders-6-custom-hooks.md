# Ders 6: Custom Hooks ve Code Reusability 🎣

## 🤔 Custom Hook Nedir?

**Custom Hook**, React hook'larını kullanarak kendi özel hook'larımızı oluşturmamızdır. Kod tekrarını önler ve logic'i yeniden kullanılabilir yapar.

### Kurallar:
1. İsmi **`use`** ile başlamalı (örn: `useCounter`, `useFetch`)
2. İçinde React hook'ları kullanabilir
3. Normal JavaScript fonksiyonu gibi çalışır

### .NET Analojisi:

```csharp
// C# - Reusable Service
public class DataService {
    public async Task<T> FetchData<T>(string url) {
        // Ortak fetch logic
    }
}

// React - Custom Hook
function useFetch(url) {
    // Ortak fetch logic
    return { data, loading, error };
}
```

---

## 🎯 İlk Custom Hook: useCounter

```jsx
import { useState } from 'react';

// Custom Hook
function useCounter(initialValue = 0) {
    const [count, setCount] = useState(initialValue);
    
    const increment = () => setCount(c => c + 1);
    const decrement = () => setCount(c => c - 1);
    const reset = () => setCount(initialValue);
    
    return { count, increment, decrement, reset };
}

// Kullanım
function SayacApp() {
    const { count, increment, decrement, reset } = useCounter(0);
    
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}
```

**Avantaj:** Sayaç logic'ini her yerde kullanabilirsin!

---

## 🌐 useFetch Hook'u

```jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                const json = await response.json();
                setData(json);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [url]);  // URL değişince yeniden fetch
    
    return { data, loading, error };
}

// Kullanım
function KullaniciListesi() {
    const { data, loading, error } = useFetch('https://api.example.com/users');
    
    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>Hata: {error}</p>;
    
    return (
        <ul>
            {data?.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}
```

---

## 💾 useLocalStorage Hook'u

```jsx
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
    // LocalStorage'dan oku veya initial value kullan
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });
    
    // Değer değiştiğinde LocalStorage'a kaydet
    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function 
                ? value(storedValue) 
                : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };
    
    return [storedValue, setValue];
}

// Kullanım
function Tema() {
    const [theme, setTheme] = useLocalStorage('theme', 'light');
    
    return (
        <div>
            <p>Mevcut tema: {theme}</p>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                Tema Değiştir
            </button>
        </div>
    );
}
```

---

## ⌨️ useKeyPress Hook'u

```jsx
import { useState, useEffect } from 'react';

function useKeyPress(targetKey) {
    const [keyPressed, setKeyPressed] = useState(false);
    
    useEffect(() => {
        const downHandler = ({ key }) => {
            if (key === targetKey) {
                setKeyPressed(true);
            }
        };
        
        const upHandler = ({ key }) => {
            if (key === targetKey) {
                setKeyPressed(false);
            }
        };
        
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, [targetKey]);
    
    return keyPressed;
}

// Kullanım
function OyunKontrol() {
    const wPressed = useKeyPress('w');
    const aPressed = useKeyPress('a');
    const sPressed = useKeyPress('s');
    const dPressed = useKeyPress('d');
    
    return (
        <div>
            <p>W: {wPressed ? '✅' : '❌'}</p>
            <p>A: {aPressed ? '✅' : '❌'}</p>
            <p>S: {sPressed ? '✅' : '❌'}</p>
            <p>D: {dPressed ? '✅' : '❌'}</p>
        </div>
    );
}
```

---

## 🔍 useDebounce Hook'u

```jsx
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    
    return debouncedValue;
}

// Kullanım - Arama
function Arama() {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 500);
    
    useEffect(() => {
        if (debouncedSearch) {
            // API çağrısı yap
            console.log('Arama yapılıyor:', debouncedSearch);
        }
    }, [debouncedSearch]);
    
    return (
        <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ara... (500ms debounce)"
        />
    );
}
```

---

## 📱 useWindowSize Hook'u

```jsx
import { useState, useEffect } from 'react';

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return windowSize;
}

// Kullanım
function ResponsiveComponent() {
    const { width } = useWindowSize();
    
    return (
        <div>
            <p>Genişlik: {width}px</p>
            <p>
                {width < 768 ? '📱 Mobil' : '💻 Desktop'}
            </p>
        </div>
    );
}
```

---

## 🎓 Custom Hook Best Practices

### 1. Single Responsibility
Her hook tek bir şey yapmalı.

✅ DOĞRU:
```jsx
function useFetch(url) { }
function useLocalStorage(key) { }
```

❌ YANLIŞ:
```jsx
function useEverything() {
    // Fetch, localStorage, timer, vs...
}
```

### 2. Return Useful Values
Kullanışlı değerler döndür.

```jsx
// ✅ Object return
function useFetch(url) {
    return { data, loading, error, refetch };
}

// ✅ Array return (destructure sırası önemli değil)
function useToggle() {
    return [isOn, toggle, setIsOn];
}
```

### 3. Dependencies Dikkat
useEffect dependency array'lerini doğru kullan.

---

## 🏋️ Alıştırmalar

1. **useToggle**: Boolean toggle için hook
2. **useForm**: Form state yönetimi için hook
3. **useAsync**: Async işlemler için hook
4. **useInterval**: setInterval wrapper hook

---

## 🎓 Öğrendiklerimiz

✅ Custom Hook nedir  
✅ Hook oluşturma kuralları  
✅ useCounter, useFetch, useLocalStorage  
✅ useDebounce, useWindowSize, useKeyPress  
✅ Best practices  
✅ Code reusability  

---

## ➡️ Sırada Ne Var?

Bir sonraki derste **Context API** öğreneceğiz! Global state yönetimi ve prop drilling çözümü! 🌐
