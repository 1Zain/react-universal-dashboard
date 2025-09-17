import { API_BASE_URL, DEFAULT_HEADERS, getAuthHeaders } from './config';
import type { ApiError, ApiResponse } from './types';

export class ApiErrorException extends Error {
    constructor(public error: ApiError) {
        super(error.message);
        this.name = 'ApiErrorException';
    }
}

export async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiErrorException({
            message: errorData.message || 'An error occurred',
            status: response.status,
            errors: errorData.errors,
        });
    }

    const data = await response.json();
    return {
        data,
        status: response.status,
        message: data.message,
    };
}

export async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    token?: string
): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = getAuthHeaders(token);

    const response = await fetch(url, {
        ...options,
        headers: {
            ...headers,
            ...options.headers,
        },
    });

    return handleResponse<T>(response);
} 