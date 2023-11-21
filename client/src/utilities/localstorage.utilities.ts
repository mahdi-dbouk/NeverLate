import { LoginResponse } from "../services/auth.service";

export const saveAuthUser = (data: LoginResponse) => {
    localStorage.setItem('auth-user-email', data.data.email);
    localStorage.setItem('auth-user-name', data.data.name);
    localStorage.setItem('auth-user-id', data.data.id.toString())
    localStorage.setItem('access-token', data.token)
}