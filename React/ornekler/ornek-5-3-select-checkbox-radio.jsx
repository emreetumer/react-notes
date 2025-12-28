// DERS 5 - ÖRNEK 3: Farklı Input Türleri
// Select, Checkbox, Radio buttons

import { useState } from 'react';

export default function FarkliInputlar() {
    const [formData, setFormData] = useState({
        country: 'tr',
        hobbies: [],
        gender: '',
        newsletter: false
    });

    // Ülke değişimi
    const handleCountryChange = (e) => {
        setFormData(prev => ({ ...prev, country: e.target.value }));
    };

    // Checkbox (multiple)
    const handleHobbyChange = (hobby) => {
        setFormData(prev => ({
            ...prev,
            hobbies: prev.hobbies.includes(hobby)
                ? prev.hobbies.filter(h => h !== hobby)
                : [...prev.hobbies, hobby]
        }));
    };

    // Radio button
    const handleGenderChange = (e) => {
        setFormData(prev => ({ ...prev, gender: e.target.value }));
    };

    // Single checkbox
    const handleNewsletterChange = (e) => {
        setFormData(prev => ({ ...prev, newsletter: e.target.checked }));
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Farklı Input Türleri</h2>

            {/* SELECT - Dropdown */}
            <div style={{ marginBottom: '20px' }}>
                <label>
                    <strong>Ülke Seçin:</strong>
                    <select
                        value={formData.country}
                        onChange={handleCountryChange}
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '8px',
                            marginTop: '5px'
                        }}
                    >
                        <option value="tr">Türkiye</option>
                        <option value="us">Amerika</option>
                        <option value="uk">İngiltere</option>
                        <option value="de">Almanya</option>
                    </select>
                </label>
            </div>

            {/* CHECKBOX - Multiple */}
            <div style={{ marginBottom: '20px' }}>
                <strong>Hobiler:</strong>
                <div style={{ marginTop: '10px' }}>
                    {['Futbol', 'Müzik', 'Okumak', 'Seyahat'].map(hobby => (
                        <label key={hobby} style={{ display: 'block', marginBottom: '5px' }}>
                            <input
                                type="checkbox"
                                checked={formData.hobbies.includes(hobby)}
                                onChange={() => handleHobbyChange(hobby)}
                            />
                            {' '}{hobby}
                        </label>
                    ))}
                </div>
            </div>

            {/* RADIO - Single choice */}
            <div style={{ marginBottom: '20px' }}>
                <strong>Cinsiyet:</strong>
                <div style={{ marginTop: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        <input
                            type="radio"
                            name="gender"
                            value="erkek"
                            checked={formData.gender === 'erkek'}
                            onChange={handleGenderChange}
                        />
                        {' '}Erkek
                    </label>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        <input
                            type="radio"
                            name="gender"
                            value="kadin"
                            checked={formData.gender === 'kadin'}
                            onChange={handleGenderChange}
                        />
                        {' '}Kadın
                    </label>
                    <label style={{ display: 'block' }}>
                        <input
                            type="radio"
                            name="gender"
                            value="diger"
                            checked={formData.gender === 'diger'}
                            onChange={handleGenderChange}
                        />
                        {' '}Diğer
                    </label>
                </div>
            </div>

            {/* CHECKBOX - Single */}
            <div style={{ marginBottom: '20px' }}>
                <label>
                    <input
                        type="checkbox"
                        checked={formData.newsletter}
                        onChange={handleNewsletterChange}
                    />
                    {' '}Haber bültenine abone ol
                </label>
            </div>

            {/* Sonuç Göster */}
            <div style={{
                padding: '15px',
                background: '#f5f5f5',
                borderRadius: '5px',
                marginTop: '30px'
            }}>
                <h3>Seçilen Değerler:</h3>
                <p><strong>Ülke:</strong> {formData.country}</p>
                <p><strong>Hobiler:</strong> {formData.hobbies.join(', ') || 'Seçilmedi'}</p>
                <p><strong>Cinsiyet:</strong> {formData.gender || 'Seçilmedi'}</p>
                <p><strong>Haber Bülteni:</strong> {formData.newsletter ? 'Evet' : 'Hayır'}</p>
            </div>
        </div>
    );
}
