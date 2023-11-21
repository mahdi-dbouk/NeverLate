import axios, { AxiosResponse } from "axios";

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  data: {
    email: string;
    id: number;
    name: string;
  };
};
export const Login = async (
  data: LoginRequest,
): Promise<AxiosResponse<LoginResponse>> => {
  try {
    return await axios.post("http://localhost:3000/auth/login", data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const Register = async (
  data: RegisterRequest,
): Promise<AxiosResponse<LoginResponse>> => {
  try {
    return await axios.post("http://localhost:3000/auth/register", data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
