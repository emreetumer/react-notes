// Custom Hook: useApi
// C# analojisi: HttpClient wrapper pattern

import { useState, useEffect } from 'react';

export function useApi(apiCall, immediate = true) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = async (...params) => {
        try {
            setLoading(true);
            setError(null);

            const response = await apiCall(...params);
            setData(response.data);

            return response;
        } catch (err) {
            setError(err.message || 'Bir hata oluştu');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, []);

    return { data, loading, error, execute };
}

export default useApi;
