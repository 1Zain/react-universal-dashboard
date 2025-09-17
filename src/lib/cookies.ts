import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_data';

export const cookieManager = {
    setToken: (token: string) => {
        // Set token cookie with 7 days expiry
        Cookies.set(TOKEN_KEY, token, { 
            expires: 7,
            secure: true,
            sameSite: 'strict'
        });
    },

    getToken: () => {
        return Cookies.get(TOKEN_KEY);
    },

    setRefreshToken: (refreshToken: string) => {
        // Set refresh token cookie with 30 days expiry
        Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { 
            expires: 30,
            secure: true,
            sameSite: 'strict'
        });
    },

    getRefreshToken: () => {
        return Cookies.get(REFRESH_TOKEN_KEY);
    },

    setUser: (user: any) => {
        // Set user data cookie with 7 days expiry
        Cookies.set(USER_KEY, JSON.stringify(user), {
            expires: 7,
            secure: true,
            sameSite: 'strict'
        });
    },

    getUser: () => {
        const userData = Cookies.get(USER_KEY);
        return userData ? JSON.parse(userData) : null;
    },

    clearAuth: () => {
        Cookies.remove(TOKEN_KEY);
        Cookies.remove(REFRESH_TOKEN_KEY);
        Cookies.remove(USER_KEY);
    },

    isAuthenticated: () => {
        return !!Cookies.get(TOKEN_KEY);
    }
}; 