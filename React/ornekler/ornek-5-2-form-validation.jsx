// DERS 5 - ÖRNEK 2: Form Validation (Doğrulama)
// C# Analojisi: DataAnnotations [Required], [EmailAddress]

import { useState } from 'react';

export default function FormValidation() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Input değişikliği
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Hata mesajını temizle
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validation fonksiyonu
    const validate = () => {
        const newErrors = {};

        // Username kontrol
        if (!formData.username.trim()) {
            newErrors.username = 'Kullanıcı adı zorunludur';
        } else if (formData.username.length < 3) {
            newErrors.username = 'En az 3 karakter olmalı';
        }

        // Email kontrol
        if (!formData.email.trim()) {
            newErrors.email = 'Email zorunludur';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Geçerli bir email giriniz';
        }

        // Password kontrol
        if (!formData.password) {
            newErrors.password = 'Şifre zorunludur';
        } else if (formData.password.length < 6) {
            newErrors.password = 'En az 6 karakter olmalı';
        }

        // Confirm password kontrol
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Şifreler eşleşmiyor';
        }

        return newErrors;
    };

    // Form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length === 0) {
            // Başarılı!
            setIsSubmitted(true);
            console.log('Form başarıyla gönderildi:', formData);
        } else {
            // Hatalar var
            setErrors(validationErrors);
        }
    };

    if (isSubmitted) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2 style={{ color: '#2ecc71' }}>✓ Kayıt Başarılı!</h2>
                <p>Hoşgeldin, {formData.username}!</p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    style={{
                        padding: '10px 20px',
                        background: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Yeni Kayıt
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h2>Kayıt Formu (Validation)</h2>

            <form onSubmit={handleSubmit}>
                {/* Username */}
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Kullanıcı Adı:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '8px',
                                marginTop: '5px',
                                border: errors.username ? '2px solid #e74c3c' : '1px solid #ddd'
                            }}
                        />
                        {errors.username && (
                            <span style={{ color: '#e74c3c', fontSize: '12px' }}>
                                {errors.username}
                            </span>
                        )}
                    </label>
                </div>

                {/* Email */}
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '8px',
                                marginTop: '5px',
                                border: errors.email ? '2px solid #e74c3c' : '1px solid #ddd'
                            }}
                        />
                        {errors.email && (
                            <span style={{ color: '#e74c3c', fontSize: '12px' }}>
                                {errors.email}
                            </span>
                        )}
                    </label>
                </div>

                {/* Password */}
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Şifre:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '8px',
                                marginTop: '5px',
                                border: errors.password ? '2px solid #e74c3c' : '1px solid #ddd'
                            }}
                        />
                        {errors.password && (
                            <span style={{ color: '#e74c3c', fontSize: '12px' }}>
                                {errors.password}
                            </span>
                        )}
                    </label>
                </div>

                {/* Confirm Password */}
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Şifre Tekrar:
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '8px',
                                marginTop: '5px',
                                border: errors.confirmPassword ? '2px solid #e74c3c' : '1px solid #ddd'
                            }}
                        />
                        {errors.confirmPassword && (
                            <span style={{ color: '#e74c3c', fontSize: '12px' }}>
                                {errors.confirmPassword}
                            </span>
                        )}
                    </label>
                </div>

                <button
                    type="submit"
                    style={{
                        background: '#2ecc71',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        width: '100%'
                    }}
                >
                    Kayıt Ol
                </button>
            </form>
        </div>
    );
}
