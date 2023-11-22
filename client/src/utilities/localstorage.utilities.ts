import { LoginResponse } from "../types/auth.types";

export const saveAuthUser = (data: LoginResponse) => {
    localStorage.setItem('access-token', data.token);
    localStorage.setItem('auth-user-email', data.data.email);
    localStorage.setItem('auth-user-name', data.data.name);
    localStorage.setItem('auth-user-id', data.data.id.toString());
}

export const deleteAuthUser = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('auth-user-email');
    localStorage.removeItem('auth-user-name');
    localStorage.removeItem('auth-user-id');
}