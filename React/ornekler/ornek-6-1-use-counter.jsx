// DERS 6 - ÖRNEK 1: useCounter Custom Hook
// Reusable counter logic

import { useState } from 'react';

// CUSTOM HOOK: useCounter
function useCounter(initialValue = 0, step = 1) {
    const [count, setCount] = useState(initialValue);

    const increment = () => setCount(prev => prev + step);
    const decrement = () => setCount(prev => prev - step);
    const reset = () => setCount(initialValue);

    return { count, increment, decrement, reset };
}

// KULLANIM - Component 1
function SayacBir() {
    const { count, increment, decrement, reset } = useCounter(0, 1);

    return (
        <div style={{
            padding: '20px',
            border: '2px solid #3498db',
            borderRadius: '5px',
            marginBottom: '20px'
        }}>
            <h3>Sayaç 1 (1'er artır)</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{count}</p>
            <button onClick={increment} style={buttonStyle}>+1</button>
            <button onClick={decrement} style={buttonStyle}>-1</button>
            <button onClick={reset} style={buttonStyle}>Sıfırla</button>
        </div>
    );
}

// KULLANIM - Component 2
function SayacIki() {
    const { count, increment, decrement, reset } = useCounter(100, 10);

    return (
        <div style={{
            padding: '20px',
            border: '2px solid #2ecc71',
            borderRadius: '5px',
            marginBottom: '20px'
        }}>
            <h3>Sayaç 2 (10'ar artır, başlangıç 100)</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{count}</p>
            <button onClick={increment} style={buttonStyle}>+10</button>
            <button onClick={decrement} style={buttonStyle}>-10</button>
            <button onClick={reset} style={buttonStyle}>Sıfırla</button>
        </div>
    );
}

// ANA COMPONENT
export default function UseCounterExample() {
    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Custom Hook: useCounter</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>
                Aynı hook'u farklı başlangıç değerleri ve adımlarla kullanıyoruz!
            </p>

            <SayacBir />
            <SayacIki />

            <div style={{
                padding: '15px',
                background: '#f5f5f5',
                borderRadius: '5px',
                marginTop: '20px'
            }}>
                <h4>📚 Custom Hook Avantajları:</h4>
                <ul>
                    <li>✅ Kod tekrarını önler</li>
                    <li>✅ Logic'i yeniden kullanılabilir yapar</li>
                    <li>✅ Component'leri temiz tutar</li>
                    <li>✅ Test edilmesi kolay</li>
                </ul>
            </div>
        </div>
    );
}

const buttonStyle = {
    padding: '8px 15px',
    margin: '0 5px',
    background: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
};
