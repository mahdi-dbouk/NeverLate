import axios, { AxiosResponse } from "axios";
import { LoginRequest, RegisterRequest, LoginResponse } from "../types/auth.types";

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
