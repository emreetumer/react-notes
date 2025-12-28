// DERS 5 - ÖRNEK 1: Basit Form (Controlled Component)
// C# Analojisi: TextBox.Text property'si gibi

import { useState } from 'react';

export default function BasitForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();  // Sayfanın yenilenmesini engelle

        console.log('Form Gönderildi:', { name, email, message });
        alert(`Merhaba ${name}! Mesajınız alındı.`);

        // Formu temizle
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h2>İletişim Formu</h2>

            <form onSubmit={handleSubmit}>
                {/* İsim Input */}
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        İsim:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '8px',
                                marginTop: '5px'
                            }}
                        />
                    </label>
                </div>

                {/* Email Input */}
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '8px',
                                marginTop: '5px'
                            }}
                        />
                    </label>
                </div>

                {/* Mesaj Textarea */}
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Mesaj:
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows="4"
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '8px',
                                marginTop: '5px'
                            }}
                        />
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    style={{
                        background: '#3498db',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Gönder
                </button>
            </form>

            {/* Önizleme */}
            <div style={{ marginTop: '30px', padding: '15px', background: '#f5f5f5' }}>
                <h3>Canlı Önizleme:</h3>
                <p><strong>İsim:</strong> {name || '(boş)'}</p>
                <p><strong>Email:</strong> {email || '(boş)'}</p>
                <p><strong>Mesaj:</strong> {message || '(boş)'}</p>
            </div>
        </div>
    );
}
