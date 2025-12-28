# 🎯 Final Proje: Full Stack Todo App

## 📋 Proje Özeti

Tüm öğrendiklerimizi kullanarak **profesyonel bir Todo uygulaması** yapacağız!

**Özellikler:**
- ✅ CRUD Operations (Create, Read, Update, Delete)
- ✅ Authentication (Login/Register)
- ✅ Local Storage persistence
- ✅ Filter & Search
- ✅ Dark/Light theme
- ✅ Responsive design
- ✅ Form validation
- ✅ Custom hooks
- ✅ Context API

---

## 🏗️ Proje Yapısı

```
todo-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   └── Modal.jsx
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ThemeToggle.jsx
│   │   └── todo/
│   │       ├── TodoForm.jsx
│   │       ├── TodoList.jsx
│   │       ├── TodoItem.jsx
│   │       └── TodoFilters.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── TodoContext.jsx
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useAuth.js
│   │   └── useTodos.js
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── utils/
│   │   └── validation.js
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── index.js
└── package.json
```

---

## 🚀 Adım 1: Proje Kurulumu

```bash
# Proje oluştur
npx create-react-app todo-app
cd todo-app

# Router kur
npm install react-router-dom

# Start
npm start
```

---

## 🎨 Adım 2: Theme Context (Dark/Light Mode)

**`src/contexts/ThemeContext.jsx`**

```jsx
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });
    
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme;
    }, [theme]);
    
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
```

---

## 🔐 Adım 3: Auth Context

**`src/contexts/AuthContext.jsx`**

```jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });
    
    const login = (email, password) => {
        // Gerçek uygulamada API çağrısı yapılır
        const userData = { 
            id: 1, 
            email, 
            name: email.split('@')[0] 
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
    };
    
    const register = (email, password, name) => {
        const userData = { id: Date.now(), email, name };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
    };
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };
    
    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated: !!user, 
            login, 
            register, 
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
```

---

## 📝 Adım 4: Todo Context

**`src/contexts/TodoContext.jsx`**

```jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const TodoContext = createContext();

export function TodoProvider({ children }) {
    const { user } = useAuth();
    const [todos, setTodos] = useState(() => {
        if (!user) return [];
        const saved = localStorage.getItem(`todos_${user.id}`);
        return saved ? JSON.parse(saved) : [];
    });
    
    const [filter, setFilter] = useState('all'); // all, active, completed
    const [searchTerm, setSearchTerm] = useState('');
    
    // Save to localStorage when todos change
    useEffect(() => {
        if (user) {
            localStorage.setItem(`todos_${user.id}`, JSON.stringify(todos));
        }
    }, [todos, user]);
    
    const addTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        setTodos([...todos, newTodo]);
    };
    
    const toggleTodo = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };
    
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };
    
    const updateTodo = (id, newText) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, text: newText } : todo
        ));
    };
    
    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    };
    
    // Filtered todos
    const filteredTodos = todos.filter(todo => {
        // Filter by status
        if (filter === 'active' && todo.completed) return false;
        if (filter === 'completed' && !todo.completed) return false;
        
        // Filter by search
        if (searchTerm && !todo.text.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        
        return true;
    });
    
    return (
        <TodoContext.Provider value={{
            todos: filteredTodos,
            allTodos: todos,
            filter,
            setFilter,
            searchTerm,
            setSearchTerm,
            addTodo,
            toggleTodo,
            deleteTodo,
            updateTodo,
            clearCompleted
        }}>
            {children}
        </TodoContext.Provider>
    );
}

export function useTodos() {
    return useContext(TodoContext);
}
```

---

## 🔧 Adım 5: Custom Hook - useLocalStorage

**`src/hooks/useLocalStorage.js`**

```jsx
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });
    
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    }, [key, value]);
    
    return [value, setValue];
}
```

---

## 📄 Adım 6: Components

### TodoForm.jsx

```jsx
import { useState } from 'react';
import { useTodos } from '../contexts/TodoContext';

export default function TodoForm() {
    const [text, setText] = useState('');
    const { addTodo } = useTodos();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (text.trim() === '') {
            alert('Todo boş olamaz!');
            return;
        }
        
        addTodo(text);
        setText('');
    };
    
    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Yeni todo ekle..."
                className="todo-input"
            />
            <button type="submit" className="btn btn-primary">
                Ekle
            </button>
        </form>
    );
}
```

### TodoItem.jsx

```jsx
import { useState } from 'react';
import { useTodos } from '../contexts/TodoContext';

export default function TodoItem({ todo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const { toggleTodo, deleteTodo, updateTodo } = useTodos();
    
    const handleUpdate = () => {
        if (editText.trim() === '') {
            alert('Todo boş olamaz!');
            return;
        }
        updateTodo(todo.id, editText);
        setIsEditing(false);
    };
    
    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
            />
            
            {isEditing ? (
                <div className="edit-mode">
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        autoFocus
                    />
                    <button onClick={handleUpdate}>✓</button>
                    <button onClick={() => setIsEditing(false)}>✗</button>
                </div>
            ) : (
                <div className="view-mode">
                    <span className="todo-text">{todo.text}</span>
                    <div className="actions">
                        <button onClick={() => setIsEditing(true)}>✏️</button>
                        <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
                    </div>
                </div>
            )}
        </div>
    );
}
```

### TodoList.jsx

```jsx
import { useTodos } from '../contexts/TodoContext';
import TodoItem from './TodoItem';

export default function TodoList() {
    const { todos } = useTodos();
    
    if (todos.length === 0) {
        return (
            <div className="empty-state">
                <p>Henüz todo yok! Yukarıdan ekle 👆</p>
            </div>
        );
    }
    
    return (
        <div className="todo-list">
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
}
```

### TodoFilters.jsx

```jsx
import { useTodos } from '../contexts/TodoContext';

export default function TodoFilters() {
    const { 
        filter, 
        setFilter, 
        searchTerm, 
        setSearchTerm,
        allTodos,
        clearCompleted 
    } = useTodos();
    
    const activeCount = allTodos.filter(t => !t.completed).length;
    const completedCount = allTodos.filter(t => t.completed).length;
    
    return (
        <div className="filters">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Todo ara..."
                className="search-input"
            />
            
            <div className="filter-buttons">
                <button 
                    className={filter === 'all' ? 'active' : ''}
                    onClick={() => setFilter('all')}
                >
                    Hepsi ({allTodos.length})
                </button>
                <button 
                    className={filter === 'active' ? 'active' : ''}
                    onClick={() => setFilter('active')}
                >
                    Aktif ({activeCount})
                </button>
                <button 
                    className={filter === 'completed' ? 'active' : ''}
                    onClick={() => setFilter('completed')}
                >
                    Tamamlanan ({completedCount})
                </button>
            </div>
            
            {completedCount > 0 && (
                <button 
                    className="btn btn-danger"
                    onClick={clearCompleted}
                >
                    Tamamlananları Temizle
                </button>
            )}
        </div>
    );
}
```

---

## 🔐 Adım 7: Auth Pages

### Login.jsx

```jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            alert('Tüm alanları doldurun!');
            return;
        }
        
        login(email, password);
        navigate('/dashboard');
    };
    
    return (
        <div className="auth-page">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Giriş Yap</h2>
                
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Şifre"
                />
                
                <button type="submit" className="btn btn-primary">
                    Giriş
                </button>
                
                <p>
                    Hesabın yok mu? <Link to="/register">Kayıt Ol</Link>
                </p>
            </form>
        </div>
    );
}
```

---

## 🎯 Adım 8: App.jsx (Router Setup)

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { TodoProvider } from './contexts/TodoContext';
import Header from './components/layout/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './styles/global.css';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Header />
                    
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        
                        <Route 
                            path="/dashboard" 
                            element={
                                <ProtectedRoute>
                                    <TodoProvider>
                                        <Dashboard />
                                    </TodoProvider>
                                </ProtectedRoute>
                            } 
                        />
                        
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
```

---

## 🎨 Adım 9: Styling (global.css)

```css
/* Değişkenler */
:root {
    --primary: #3498db;
    --danger: #e74c3c;
    --success: #2ecc71;
    --bg: #ffffff;
    --text: #333333;
    --border: #dddddd;
}

body.dark {
    --bg: #1a1a1a;
    --text: #ffffff;
    --border: #444444;
}

/* Genel */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background: var(--bg);
    color: var(--text);
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}

.btn-primary {
    background: var(--primary);
    color: white;
}

.btn-danger {
    background: var(--danger);
    color: white;
}

/* Todo Item */
.todo-item {
    display: flex;
    align-items: center;
    padding: 15px;
    border: 1px solid var(--border);
    border-radius: 5px;
    margin-bottom: 10px;
}

.todo-item.completed .todo-text {
    text-decoration: line-through;
    opacity: 0.5;
}

/* Responsive */
@media (max-width: 768px) {
    .todo-form {
        flex-direction: column;
    }
}
```

---

## ✅ Proje Tamamlandı!

**Öğrendiklerimizi Kullandık:**
- ✅ Components & Props
- ✅ State & Events
- ✅ useEffect
- ✅ Forms & Validation
- ✅ Custom Hooks
- ✅ Context API
- ✅ React Router
- ✅ Best Practices
- ✅ Local Storage
- ✅ Authentication
- ✅ Dark Mode

**Sonraki Adımlar:**
1. Backend API ekle (Node.js + Express)
2. Database entegre et (MongoDB)
3. Gerçek authentication (JWT)
4. Deploy et (Vercel/Netlify)

**Tebrikler! Artık profesyonel React Developer'sın! 🎉**
