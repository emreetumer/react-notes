// LoginPage - User authentication
// C# analojisi: Login.cshtml + AccountController

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.email || !formData.password) {
            setError('Tüm alanları doldurun!');
            return;
        }

        setLoading(true);

        const result = await login(formData.email, formData.password);

        if (result.success) {
            navigate('/products');
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.formCard}>
                    <h2 style={styles.title}>🔐 Giriş Yap</h2>

                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="ornek@email.com"
                                style={styles.input}
                                disabled={loading}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Şifre:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••"
                                style={styles.input}
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <div style={styles.error}>
                                ❌ {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            style={{
                                ...styles.button,
                                opacity: loading ? 0.6 : 1,
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                        </button>
                    </form>

                    <div style={styles.links}>
                        <p>Hesabın yok mu? <Link to="/register" style={styles.link}>Kayıt Ol</Link></p>
                    </div>

                    {/* Demo Credentials */}
                    <div style={styles.demoInfo}>
                        <h4>🧪 Test Hesapları:</h4>
                        <p><strong>Admin:</strong> admin@test.com / admin123</p>
                        <p><strong>User:</strong> user@test.com / 123456</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: 'calc(100vh - 140px)',
        background: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
    },
    container: {
        maxWidth: '450px',
        width: '100%'
    },
    formCard: {
        background: 'white',
        borderRadius: '10px',
        padding: '40px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    },
    title: {
        textAlign: 'center',
        marginBottom: '30px',
        color: '#2c3e50'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column'
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#555'
    },
    input: {
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '16px'
    },
    error: {
        background: '#fee',
        color: '#c33',
        padding: '12px',
        borderRadius: '5px',
        textAlign: 'center'
    },
    button: {
        background: '#3498db',
        color: 'white',
        border: 'none',
        padding: '15px',
        borderRadius: '5px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background 0.2s'
    },
    links: {
        marginTop: '20px',
        textAlign: 'center'
    },
    link: {
        color: '#3498db',
        textDecoration: 'none',
        fontWeight: 'bold'
    },
    demoInfo: {
        marginTop: '30px',
        padding: '15px',
        background: '#e8f5e9',
        borderRadius: '5px',
        fontSize: '14px'
    }
};
