// DERS 6 - ÖRNEK 2: useLocalStorage Custom Hook
// State'i LocalStorage ile senkronize et

import { useState, useEffect } from 'react';

// CUSTOM HOOK: useLocalStorage
function useLocalStorage(key, initialValue) {
    // LocalStorage'dan başlangıç değerini al
    const [value, setValue] = useState(() => {
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
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('LocalStorage yazma hatası:', error);
        }
    }, [key, value]);

    return [value, setValue];
}

// KULLANIM EXAMPLE
export default function UseLocalStorageExample() {
    // Normal useState gibi kullan, ama otomatik LocalStorage'a kaydeder!
    const [name, setName] = useLocalStorage('userName', '');
    const [age, setAge] = useLocalStorage('userAge', 0);
    const [theme, setTheme] = useLocalStorage('appTheme', 'light');
    const [todos, setTodos] = useLocalStorage('myTodos', []);
    const [newTodo, setNewTodo] = useState('');

    const addTodo = () => {
        if (newTodo.trim()) {
            setTodos([...todos, { id: Date.now(), text: newTodo }]);
            setNewTodo('');
        }
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(t => t.id !== id));
    };

    const clearAll = () => {
        setName('');
        setAge(0);
        setTheme('light');
        setTodos([]);
    };

    return (
        <div style={{
            padding: '20px',
            maxWidth: '700px',
            margin: '0 auto',
            background: theme === 'dark' ? '#333' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
            minHeight: '100vh'
        }}>
            <h2>Custom Hook: useLocalStorage</h2>
            <p style={{ marginBottom: '30px' }}>
                💾 Tüm veriler LocalStorage'a otomatik kaydediliyor. Sayfayı yenile!
            </p>

            {/* User Info */}
            <div style={{
                padding: '20px',
                background: theme === 'dark' ? '#444' : '#f5f5f5',
                borderRadius: '5px',
                marginBottom: '20px'
            }}>
                <h3>Kullanıcı Bilgileri</h3>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        İsim:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="İsminizi girin"
                            style={{
                                marginLeft: '10px',
                                padding: '5px'
                            }}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Yaş:
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                            style={{
                                marginLeft: '10px',
                                padding: '5px',
                                width: '80px'
                            }}
                        />
                    </label>
                </div>
            </div>

            {/* Theme Toggle */}
            <div style={{
                padding: '20px',
                background: theme === 'dark' ? '#444' : '#f5f5f5',
                borderRadius: '5px',
                marginBottom: '20px'
            }}>
                <h3>Tema</h3>
                <button
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    style={{
                        padding: '10px 20px',
                        background: theme === 'dark' ? '#fff' : '#333',
                        color: theme === 'dark' ? '#000' : '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>
            </div>

            {/* Todo List */}
            <div style={{
                padding: '20px',
                background: theme === 'dark' ? '#444' : '#f5f5f5',
                borderRadius: '5px',
                marginBottom: '20px'
            }}>
                <h3>Todo Listesi</h3>
                <div style={{ display: 'flex', marginBottom: '15px' }}>
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                        placeholder="Yeni todo..."
                        style={{
                            flex: 1,
                            padding: '8px',
                            marginRight: '10px'
                        }}
                    />
                    <button
                        onClick={addTodo}
                        style={{
                            padding: '8px 15px',
                            background: '#2ecc71',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Ekle
                    </button>
                </div>

                {todos.length === 0 ? (
                    <p style={{ color: '#999' }}>Henüz todo yok</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {todos.map(todo => (
                            <li
                                key={todo.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '10px',
                                    background: theme === 'dark' ? '#555' : '#fff',
                                    marginBottom: '5px',
                                    borderRadius: '3px'
                                }}
                            >
                                <span>{todo.text}</span>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    style={{
                                        background: '#e74c3c',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '3px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Sil
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Clear All Button */}
            <button
                onClick={clearAll}
                style={{
                    padding: '10px 20px',
                    background: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    width: '100%'
                }}
            >
                Hepsini Temizle
            </button>

            <div style={{
                marginTop: '30px',
                padding: '15px',
                background: theme === 'dark' ? '#444' : '#e8f5e9',
                borderRadius: '5px'
            }}>
                <h4>💡 İpucu:</h4>
                <p>Sayfayı yenilediğinde tüm veriler geri gelecek!</p>
                <p>Browser DevTools → Application → Local Storage'dan kontrol edebilirsin.</p>
            </div>
        </div>
    );
}
