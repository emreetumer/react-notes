// Ders 4 - Örnek 3: LocalStorage ile Persist

import { useState, useEffect } from 'react';

function TodoListPersist() {
    // LocalStorage'dan başlangıç değerini oku
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [
            { id: 1, text: 'React öğren', completed: false },
            { id: 2, text: 'useEffect kullan', completed: false }
        ];
    });

    const [newTodo, setNewTodo] = useState('');

    // todos değiştiğinde LocalStorage'a kaydet
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log('💾 Todos LocalStorage\'a kaydedildi');
    }, [todos]);

    const addTodo = () => {
        if (newTodo.trim()) {
            setTodos([...todos, {
                id: Date.now(),
                text: newTodo,
                completed: false
            }]);
            setNewTodo('');
        }
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const clearAll = () => {
        setTodos([]);
        localStorage.removeItem('todos');
    };

    return (
        <div style={{
            maxWidth: '600px',
            margin: '20px auto',
            padding: '30px',
            backgroundColor: '#fff',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
            <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>
                📝 Kalıcı Todo Listesi
            </h1>

            <div style={{
                padding: '15px',
                backgroundColor: '#fff3cd',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '2px solid #ffc107'
            }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#856404' }}>
                    💡 <strong>LocalStorage kullanıldı!</strong> Sayfayı yenile,
                    todo'lar kaybolmayacak!
                </p>
            </div>

            {/* Yeni Todo Ekleme */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="Yeni görev ekle..."
                    style={{
                        flex: 1,
                        padding: '12px',
                        fontSize: '16px',
                        border: '2px solid #3498db',
                        borderRadius: '8px',
                        outline: 'none'
                    }}
                />
                <button
                    onClick={addTodo}
                    style={{
                        backgroundColor: '#27ae60',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    ➕ Ekle
                </button>
            </div>

            {/* Todos Listesi */}
            {todos.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    color: '#95a5a6',
                    fontSize: '18px'
                }}>
                    🎉 Tüm görevler tamamlandı!
                </div>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {todos.map(todo => (
                        <li
                            key={todo.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '15px',
                                marginBottom: '10px',
                                backgroundColor: todo.completed ? '#d5f4e6' : '#f8f9fa',
                                borderRadius: '8px',
                                border: `2px solid ${todo.completed ? '#27ae60' : '#e0e0e0'}`,
                                transition: 'all 0.2s'
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    cursor: 'pointer'
                                }}
                            />
                            <span style={{
                                flex: 1,
                                fontSize: '16px',
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                color: todo.completed ? '#7f8c8d' : '#2c3e50'
                            }}>
                                {todo.text}
                            </span>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                style={{
                                    backgroundColor: '#e74c3c',
                                    color: 'white',
                                    border: 'none',
                                    padding: '8px 16px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                            >
                                🗑️
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* İstatistikler */}
            {todos.length > 0 && (
                <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    backgroundColor: '#ecf0f1',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ fontSize: '14px', color: '#555' }}>
                        <strong>Toplam:</strong> {todos.length} •
                        <strong> Tamamlanan:</strong> {todos.filter(t => t.completed).length} •
                        <strong> Bekleyen:</strong> {todos.filter(t => !t.completed).length}
                    </div>
                    <button
                        onClick={clearAll}
                        style={{
                            backgroundColor: '#95a5a6',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        🗑️ Tümünü Sil
                    </button>
                </div>
            )}
        </div>
    );
}

export default TodoListPersist;

/*
LOCALSTORAGE PATTERN:

1. BAŞLANGIÇ DEĞERİNİ OKUMA:
   const [state, setState] = useState(() => {
       const saved = localStorage.getItem('key');
       return saved ? JSON.parse(saved) : defaultValue;
   });
   
   Lazy initialization: Sadece ilk render'da çalışır

2. DEĞİŞİKLİKTE KAYDETME:
   useEffect(() => {
       localStorage.setItem('key', JSON.stringify(state));
   }, [state]);

3. TEMİZLEME:
   localStorage.removeItem('key');
   localStorage.clear();  // Tümünü sil

LOCALSTORAGE LİMİTLERİ:
- 5-10 MB sınırı var (tarayıcıya göre)
- Sadece string kayded edilir (JSON.stringify gerekli)
- Senkron çalışır (blocking)
- Sadece client-side

NE ZAMAN KULLAN:
✅ User preferences (tema, dil)
✅ Form drafts
✅ Shopping cart
✅ Recent searches
✅ Offline data

NE ZAMAN KULLANMA:
❌ Hassas bilgiler (şifreler, token'lar)
❌ Çok büyük veriler
❌ Sunucu senkronizasyonu gerekli olan

C# KARŞILAŞTIRMA:

C# (Web):
---------
// Cookie veya Session
HttpContext.Session.SetString("todos", json);
var todos = HttpContext.Session.GetString("todos");

React:
------
localStorage.setItem('todos', JSON.stringify(todos));
const todos = JSON.parse(localStorage.getItem('todos'));

ÖĞRENDIĞIMIZ:
✅ LocalStorage okuma/yazma
✅ Lazy initialization
✅ Data persistence
✅ JSON serialize/deserialize
✅ Gerçek dünya state management

Bu pattern'i birçok projede kullanacaksın! 🎯
*/
