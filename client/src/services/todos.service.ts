import axios, { AxiosResponse } from "axios";
import {
  CreateTodoRequest,
  CreateTodoResponse,
  TodoType,
  UpdateTodoRequest,
} from "../types/todo.types";

const getToken = (): string | null => {
  return localStorage.getItem("access-token");
};

export const getAllTodos = async (): Promise<
  AxiosResponse<TodoType[]>
> => {
  try {
    const token = getToken();
    return await axios.get("http://localhost:3000/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createTodo = async (
  data: CreateTodoRequest,
): Promise<AxiosResponse<CreateTodoResponse>> => {
  try {
    const token = getToken();
    return await axios.post("http://localhost:3000/todos/create", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateTodoById = async (
  data: UpdateTodoRequest,
): Promise<AxiosResponse<CreateTodoResponse>> => {
  try {
    const token = getToken();
    return await axios.put(
      `http://localhost:3000/todos/update/${data.id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const markTodoCompleted = async (
  id: number,
): Promise<AxiosResponse<CreateTodoResponse>> => {
  try {
    const token = getToken();
    return await axios.patch(
      `http://localhost:3000/todos/update/${id}/status`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteTodoById = async (
  id: number,
): Promise<AxiosResponse<CreateTodoResponse>> => {
  try {
    const token = getToken();
    return await axios.delete(`http://localhost:3000/todos/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
