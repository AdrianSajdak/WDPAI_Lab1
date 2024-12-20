import axios from 'axios';

// Tworzymy instancję axios
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

// Request interceptor - do każdego zapytania, jeśli jest accessToken, dodajemy nagłówek Authorization
api.interceptors.request.use((config) => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// Response interceptor - jeśli otrzymamy 401 (unauthorized), spróbujemy odświeżyć token
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = sessionStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    const refreshResponse = await axios.post('http://localhost:8000/api/login/refresh/', {
                        refresh: refreshToken
                    });
                    const newAccessToken = refreshResponse.data.access;
                    sessionStorage.setItem('accessToken', newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    console.error('Nie udało się odświeżyć tokenu:', refreshError);
                    sessionStorage.removeItem('accessToken');
                    sessionStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                }
            } else {
                sessionStorage.removeItem('accessToken');
                sessionStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
