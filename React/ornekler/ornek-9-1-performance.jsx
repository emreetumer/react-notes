// DERS 9 - ÖRNEK 1: Performance Optimization
// React.memo, useMemo, useCallback kullanımı

import { useState, useMemo, useCallback, memo } from 'react';

// ============================================
// 1. React.memo Örneği (Component Memoization)
// ============================================

// ❌ Normal Component (Her parent render'ında yeniden render olur)
function NormalButton({ onClick, children }) {
    console.log('Normal Button rendered!');
    return (
        <button onClick={onClick} style={buttonStyle}>
            {children}
        </button>
    );
}

// ✅ Memoized Component (Props değişmedikçe render olmaz)
const MemoizedButton = memo(function MemoizedButton({ onClick, children }) {
    console.log('Memoized Button rendered!');
    return (
        <button onClick={onClick} style={buttonStyle}>
            {children}
        </button>
    );
});

// ============================================
// 2. useMemo Örneği (Expensive Calculation)
// ============================================

function ExpensiveList({ items, filter }) {
    console.log('ExpensiveList rendered');

    // ❌ YANLIŞ: Her render'da hesaplanır
    // const filteredItems = items.filter(item => 
    //     item.toLowerCase().includes(filter.toLowerCase())
    // );

    // ✅ DOĞRU: Sadece items veya filter değişince hesaplanır
    const filteredItems = useMemo(() => {
        console.log('Filtering items...');
        return items.filter(item =>
            item.toLowerCase().includes(filter.toLowerCase())
        );
    }, [items, filter]);

    return (
        <div>
            <h4>Filtrelenmiş Liste ({filteredItems.length} sonuç)</h4>
            <ul style={{ maxHeight: '200px', overflow: 'auto' }}>
                {filteredItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

// ============================================
// 3. useCallback Örneği (Function Memoization)
// ============================================

const ChildComponent = memo(function ChildComponent({ onAction, title }) {
    console.log(`Child "${title}" rendered!`);

    return (
        <div style={{
            padding: '15px',
            background: '#f5f5f5',
            borderRadius: '5px',
            marginBottom: '10px'
        }}>
            <h4>{title}</h4>
            <button onClick={onAction} style={buttonStyle}>
                Aksiyonu Çalıştır
            </button>
        </div>
    );
});

// ============================================
// ANA COMPONENT
// ============================================

export default function PerformanceExample() {
    const [count, setCount] = useState(0);
    const [filter, setFilter] = useState('');
    const [input, setInput] = useState('');

    // Örnek veri
    const items = useMemo(() => [
        'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
        'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon',
        'Mango', 'Orange', 'Papaya', 'Raspberry', 'Strawberry'
    ], []);

    // ❌ YANLIŞ: Her render'da yeni fonksiyon oluşur
    const handleNormalClick = () => {
        console.log('Normal click!');
    };

    // ✅ DOĞRU: Fonksiyon memoize edildi
    const handleMemoizedClick = useCallback(() => {
        console.log('Memoized click!');
    }, []);

    // useCallback with dependencies
    const handleAction = useCallback(() => {
        alert(`Count değeri: ${count}`);
    }, [count]);  // count değişince yeni fonksiyon oluşur

    // Expensive calculation (useMemo)
    const expensiveValue = useMemo(() => {
        console.log('Calculating expensive value...');
        let result = 0;
        for (let i = 0; i < 1000000; i++) {
            result += i;
        }
        return result;
    }, []);  // Sadece ilk render'da hesaplanır

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>⚡ Performance Optimization</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>
                Console'u aç ve render sayılarını gör!
            </p>

            {/* Counter */}
            <div style={sectionStyle}>
                <h3>Counter: {count}</h3>
                <button
                    onClick={() => setCount(c => c + 1)}
                    style={{ ...buttonStyle, background: '#2ecc71' }}
                >
                    Artır (Parent Re-render)
                </button>
            </div>

            {/* React.memo Demo */}
            <div style={sectionStyle}>
                <h3>1️⃣ React.memo Demo</h3>
                <p>Counter'ı artırınca:</p>

                <div style={{ marginTop: '15px' }}>
                    <p style={{ fontSize: '14px', color: '#e74c3c' }}>
                        ❌ Normal Button: Her zaman render olur
                    </p>
                    <NormalButton onClick={handleNormalClick}>
                        Normal Button
                    </NormalButton>
                </div>

                <div style={{ marginTop: '15px' }}>
                    <p style={{ fontSize: '14px', color: '#2ecc71' }}>
                        ✅ Memoized Button: Props değişmedikçe render olmaz
                    </p>
                    <MemoizedButton onClick={handleMemoizedClick}>
                        Memoized Button
                    </MemoizedButton>
                </div>
            </div>

            {/* useMemo Demo */}
            <div style={sectionStyle}>
                <h3>2️⃣ useMemo Demo</h3>
                <p>Expensive Value (1M loop): {expensiveValue}</p>
                <p style={{ fontSize: '14px', color: '#2ecc71' }}>
                    ✅ useMemo sayesinde sadece 1 kez hesaplandı!
                </p>

                <div style={{ marginTop: '20px' }}>
                    <input
                        type="text"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Meyve ara..."
                        style={{
                            padding: '8px',
                            width: '100%',
                            marginBottom: '15px',
                            border: '1px solid #ddd',
                            borderRadius: '5px'
                        }}
                    />
                    <ExpensiveList items={items} filter={filter} />
                </div>
            </div>

            {/* useCallback Demo */}
            <div style={sectionStyle}>
                <h3>3️⃣ useCallback Demo</h3>
                <p>Counter'ı artırınca child component'ler render olacak mı?</p>

                <ChildComponent
                    title="useCallback ile (count dependency var)"
                    onAction={handleAction}
                />

                <ChildComponent
                    title="useCallback ile (dependency yok)"
                    onAction={handleMemoizedClick}
                />
            </div>

            {/* Test Input */}
            <div style={sectionStyle}>
                <h3>🧪 Test Input</h3>
                <p>Bu input'a yaz ve console'da ne olduğunu gör:</p>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Bir şeyler yaz..."
                    style={{
                        padding: '10px',
                        width: '100%',
                        border: '1px solid #ddd',
                        borderRadius: '5px'
                    }}
                />
                <p>Yazdığın: {input}</p>
            </div>

            {/* Summary */}
            <div style={{
                padding: '20px',
                background: '#e8f5e9',
                borderRadius: '8px',
                border: '2px solid #2ecc71'
            }}>
                <h3>📚 Özet:</h3>
                <ul>
                    <li><strong>React.memo:</strong> Component'i memoize et (props değişmedikçe render yok)</li>
                    <li><strong>useMemo:</strong> Expensive hesaplamaları cache'le</li>
                    <li><strong>useCallback:</strong> Fonksiyonları memoize et (child'a geçerken önemli)</li>
                </ul>

                <div style={{
                    marginTop: '15px',
                    padding: '15px',
                    background: 'white',
                    borderRadius: '5px'
                }}>
                    <strong>⚠️ Dikkat:</strong>
                    <p style={{ marginTop: '10px', marginBottom: 0 }}>
                        Her yerde kullanma! Sadece performance sorunun olduğunda veya:
                    </p>
                    <ul>
                        <li>Expensive hesaplamalar</li>
                        <li>Büyük listeler</li>
                        <li>Sık re-render olan component'ler</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

// Styles
const buttonStyle = {
    padding: '10px 20px',
    background: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px'
};

const sectionStyle = {
    padding: '20px',
    background: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '20px'
};
