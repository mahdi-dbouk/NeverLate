export type Todo = {
    id: number;
    description: string;
    date: string;
    priority: string;
    status: string;
  };
  
export type GroupedTodo = {
    [date: string]: Todo[];
};

export type CreateTodoRequest = {
    description: string;
    priority: string;
    date: Date;
}
export type UpdateTodoRequest = {
    id: number;
    description: string;
    priority: string;
    date: Date;
}

export type CreateTodoResponse = {
    id: number;
    description: string;
    priority: string;
    status: string;
    date: Date;
    userId: number;
}