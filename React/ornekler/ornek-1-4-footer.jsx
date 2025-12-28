// Ders 1 - Örnek 4: Footer Component

function Footer() {
    const yil = new Date().getFullYear();
    const yapimci = "Emre";

    return (
        <footer style={{
            backgroundColor: '#333',
            color: 'white',
            padding: '20px',
            textAlign: 'center',
            marginTop: '50px'
        }}>
            <p>© {yil} - {yapimci} - Tüm hakları saklıdır</p>
            <p>React ile ❤️ yapıldı</p>
        </footer>
    );
}

export default Footer;

/* 
ÖNEMLİ NOT:
{yil} ve {yapimci} kullanarak JavaScript değişkenlerini 
JSX içine gömdük. Bu C#'taki string interpolation'a benzer:

C#: $"© {yil} - {yapimci}"
React: {yil} - {yapimci}
*/
