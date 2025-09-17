export const API_BASE_URL = '';

export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export const getAuthHeaders = (token?: string) => {
    if (!token) return DEFAULT_HEADERS;
    
    return {
        ...DEFAULT_HEADERS,
        'Authorization': `Bearer ${token}`,
    };
}; 