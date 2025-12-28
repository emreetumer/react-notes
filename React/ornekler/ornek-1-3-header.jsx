// Ders 1 - Örnek 3: Header Component

function Header() {
    return (
        <header style={{
            backgroundColor: '#333',
            color: 'white',
            padding: '20px',
            textAlign: 'center'
        }}>
            <h1>Benim React Uygulamam</h1>
            <nav>
                <a href="#home" style={{ margin: '0 10px', color: 'white' }}>Ana Sayfa</a>
                <a href="#about" style={{ margin: '0 10px', color: 'white' }}>Hakkında</a>
                <a href="#contact" style={{ margin: '0 10px', color: 'white' }}>İletişim</a>
            </nav>
        </header>
    );
}

export default Header;
