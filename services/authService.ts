// services/authService.ts
import type { User, AuthResponse, UpdateUserPayload, ChangePasswordPayload, UserAnalyticsData } from '../types/index';
import { BACKEND_API_BASE_URL } from '../lib/constants';

// --- In-memory token storage ---
let accessToken: string | null = null;
let refreshPromise: Promise<string> | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

const getAccessToken = () => accessToken;

// --- API Client with automatic token refresh ---
export const apiClient = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
    const makeRequestWithGivenOptions = async (currentOptions: RequestInit) => {
        const token = getAccessToken();
        const headers = new Headers(currentOptions.headers || {});
        
        if (!(currentOptions.body instanceof FormData) && !headers.has('Content-Type')) {
            headers.set('Content-Type', 'application/json');
        }
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        const requestOptions: RequestInit = {
            ...currentOptions,
            headers,
            credentials: 'include', // Crucial for sending cookies
        };
        return fetch(`${BACKEND_API_BASE_URL}${endpoint}`, requestOptions);
    };

    let response = await makeRequestWithGivenOptions(options);

    if (response.status === 401 && !new Headers(options.headers).get('X-Retry')) {
        if (!refreshPromise) {
            refreshPromise = (async () => {
                try {
                    const refreshResponse = await fetch(`${BACKEND_API_BASE_URL}/auth/refresh-token`, {
                        method: 'POST',
                        credentials: 'include',
                    });
                    
                    if (!refreshResponse.ok) {
                       throw new Error('Session expired');
                    }
                    
                    const { token: newAccessToken } = await refreshResponse.json();
                    setAccessToken(newAccessToken);
                    return newAccessToken;
                } finally {
                    refreshPromise = null;
                }
            })();
        }

        await refreshPromise;
        
        const retryHeaders = new Headers(options.headers);
        retryHeaders.set('X-Retry', 'true');
        const retryOptions: RequestInit = { ...options, headers: retryHeaders };
        response = await makeRequestWithGivenOptions(retryOptions);
    }
    
    if (!response.ok) {
        if (response.status === 401) {
            // If refresh fails or it's still 401, logout
            logoutUser();
            window.location.hash = '/';
            throw new Error('Your session has expired. Please log in again.');
        }
        const errorData = await response.json().catch(() => ({ message: `Request failed with status ${response.status}` }));
        const err = new Error(errorData.message || `Request failed with status ${response.status}`);
        (err as any).status = response.status;
        throw err;
    }

    if (response.status === 204) {
        return null; 
    }

    const contentType = response.headers.get("content-type");
    if (contentType && (contentType.indexOf("application/dxf") !== -1 || contentType.indexOf("application/octet-stream") !== -1 || contentType.indexOf("application/pdf") !== -1)) {
        return response.blob();
    }
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
    }
    return response.text();
};

// --- Authentication Functions ---
export const registerUser = async (email: string, passwordPlain: string, phoneNumber: string, whatsappOptIn: boolean): Promise<AuthResponse> => {
  const response = await apiClient('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password: passwordPlain, phoneNumber, whatsappOptIn }),
  });
  if (response.token) setAccessToken(response.token);
  return response;
};

export const loginUser = async (email: string, passwordPlain: string): Promise<AuthResponse> => {
  const response = await apiClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password: passwordPlain }),
  });
  if (response.token) setAccessToken(response.token);
  return response;
};

export const refreshToken = async (): Promise<{ token: string }> => {
    const response = await apiClient('/auth/refresh-token', { method: 'POST' });
    return response;
};


export const forgotPassword = async (email: string): Promise<{ message: string }> => {
    return apiClient('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
    });
};

export const resetPassword = async (token: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient(`/auth/reset-password/${token}`, {
        method: 'POST',
        body: JSON.stringify({ password }),
    });
    if (response.token) setAccessToken(response.token);
    return response;
};

export const logoutUser = async (): Promise<void> => {
  try {
      await apiClient('/auth/logout', { method: 'POST' });
  } catch (e) {
      console.error("Logout failed, clearing token locally.", e);
  } finally {
      setAccessToken(null);
  }
};

export const getCurrentUserProfile = async (): Promise<User> => {
  return apiClient('/auth/me'); 
};

// --- User Profile & Analytics ---
export const getUserAnalytics = async (): Promise<UserAnalyticsData> => {
  return apiClient('/auth/me/analytics');
};

export const updateUserProfile = async (payload: Partial<UpdateUserPayload>): Promise<User> => {
  return apiClient('/auth/me', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
};

export const changeUserPassword = async (payload: ChangePasswordPayload): Promise<{ message: string }> => {
  return apiClient('/auth/me/change-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

// --- PUBLIC VIEWS ---
export const getPublicProjectByShareLink = async (shareableLink: string): Promise<{ project: any }> => {
    const response = await fetch(`${BACKEND_API_BASE_URL}/projects/public/${shareableLink}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Could not fetch project.');
    }
    return response.json();
};

export const getPublicFolioApi = async (shareableLink: string): Promise<{ project: any }> => {
    const response = await fetch(`${BACKEND_API_BASE_URL}/projects/folio/${shareableLink}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Could not fetch folio.');
    }
    return response.json();
};

export const generateApiKey = async (): Promise<{ apiKey: string }> => {
  return apiClient('/auth/me/api-key', {
    method: 'POST',
  });
};
