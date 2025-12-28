// Header Component - Navigation bar
// C# analojisi: _Layout.cshtml navigation

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

export default function Header() {
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const { itemCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header style={styles.header}>
            <div style={styles.container}>
                <Link to="/" style={styles.logo}>
                    🛒 E-Shop
                </Link>

                <nav style={styles.nav}>
                    <Link to="/" style={styles.navLink}>Ana Sayfa</Link>
                    <Link to="/products" style={styles.navLink}>Ürünler</Link>

                    {isAuthenticated ? (
                        <>
                            <Link to="/cart" style={styles.cartLink}>
                                🛒 Sepet
                                {itemCount > 0 && (
                                    <span style={styles.badge}>{itemCount}</span>
                                )}
                            </Link>

                            {isAdmin && (
                                <Link to="/admin" style={styles.adminLink}>
                                    ⚙️ Admin
                                </Link>
                            )}

                            <div style={styles.userInfo}>
                                <span style={styles.userName}>
                                    👤 {user.name}
                                </span>
                                <button onClick={handleLogout} style={styles.logoutBtn}>
                                    Çıkış
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={styles.navLink}>Giriş</Link>
                            <Link to="/register" style={styles.navLink}>Kayıt Ol</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

const styles = {
    header: {
        background: '#2c3e50',
        color: 'white',
        padding: '15px 0',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'white',
        textDecoration: 'none'
    },
    nav: {
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px',
        transition: 'opacity 0.2s'
    },
    cartLink: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    badge: {
        background: '#e74c3c',
        borderRadius: '50%',
        padding: '2px 8px',
        fontSize: '12px',
        fontWeight: 'bold'
    },
    adminLink: {
        color: '#f39c12',
        textDecoration: 'none',
        fontSize: '16px'
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    userName: {
        fontSize: '14px',
        color: '#ecf0f1'
    },
    logoutBtn: {
        background: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px'
    }
};
