// DERS 6 - ÖRNEK 3: useFetch Custom Hook
// API çağrılarını kolaylaştıran reusable hook

import { useState, useEffect } from 'react';

// CUSTOM HOOK: useFetch
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Her URL değişiminde yeniden fetch
        setLoading(true);
        setError(null);

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [url]);

    return { data, loading, error };
}

// KULLANICI LİSTESİ
function UserList() {
    const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

    if (loading) return <div style={loadingStyle}>⏳ Yükleniyor...</div>;
    if (error) return <div style={errorStyle}>❌ Hata: {error}</div>;

    return (
        <div>
            <h3>👥 Kullanıcılar ({data.length})</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
                {data.map(user => (
                    <div key={user.id} style={cardStyle}>
                        <strong>{user.name}</strong>
                        <p style={{ margin: '5px 0', color: '#666' }}>{user.email}</p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>
                            {user.company.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// POST LİSTESİ
function PostList() {
    const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=5');

    if (loading) return <div style={loadingStyle}>⏳ Yükleniyor...</div>;
    if (error) return <div style={errorStyle}>❌ Hata: {error}</div>;

    return (
        <div>
            <h3>📝 Gönderiler ({data.length})</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
                {data.map(post => (
                    <div key={post.id} style={cardStyle}>
                        <strong>{post.title}</strong>
                        <p style={{ margin: '10px 0 0 0', color: '#666', fontSize: '14px' }}>
                            {post.body.substring(0, 100)}...
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// TODO LİSTESİ
function TodoList() {
    const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos?_limit=8');

    if (loading) return <div style={loadingStyle}>⏳ Yükleniyor...</div>;
    if (error) return <div style={errorStyle}>❌ Hata: {error}</div>;

    return (
        <div>
            <h3>✅ Yapılacaklar ({data.length})</h3>
            <div style={{ display: 'grid', gap: '5px' }}>
                {data.map(todo => (
                    <div
                        key={todo.id}
                        style={{
                            ...cardStyle,
                            background: todo.completed ? '#d5f4e6' : '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        <span style={{ fontSize: '20px' }}>
                            {todo.completed ? '✅' : '⬜'}
                        </span>
                        <span style={{
                            textDecoration: todo.completed ? 'line-through' : 'none',
                            color: todo.completed ? '#666' : '#000'
                        }}>
                            {todo.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ANA COMPONENT
export default function UseFetchExample() {
    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2>Custom Hook: useFetch</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>
                Aynı hook'u farklı API endpoint'leri için kullanıyoruz!
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '30px',
                marginBottom: '30px'
            }}>
                <UserList />
                <PostList />
                <TodoList />
            </div>

            <div style={{
                padding: '20px',
                background: '#e8f5e9',
                borderRadius: '8px',
                border: '2px solid #2ecc71'
            }}>
                <h3>💡 useFetch Hook'unun Avantajları:</h3>
                <ul>
                    <li>✅ Kod tekrarını önler (loading, error, data state'leri)</li>
                    <li>✅ Tek satırda API çağrısı yapabilirsin</li>
                    <li>✅ Otomatik loading ve error handling</li>
                    <li>✅ Herhangi bir API endpoint'i için kullanılabilir</li>
                    <li>✅ Component'leri temiz ve okunabilir tutar</li>
                </ul>

                <div style={{
                    marginTop: '15px',
                    padding: '15px',
                    background: 'white',
                    borderRadius: '5px'
                }}>
                    <strong>Kullanım:</strong>
                    <code style={{
                        display: 'block',
                        marginTop: '10px',
                        padding: '10px',
                        background: '#f5f5f5',
                        borderRadius: '3px',
                        fontSize: '14px'
                    }}>
                        const {'{ data, loading, error }'} = useFetch(url);
                    </code>
                </div>
            </div>
        </div>
    );
}

// Styles
const cardStyle = {
    padding: '15px',
    background: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};

const loadingStyle = {
    padding: '40px',
    textAlign: 'center',
    fontSize: '18px',
    color: '#3498db'
};

const errorStyle = {
    padding: '20px',
    background: '#fee',
    color: '#c33',
    borderRadius: '5px',
    border: '1px solid #fcc'
};
