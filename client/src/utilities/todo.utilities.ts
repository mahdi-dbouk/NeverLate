import { GroupedTodo, Todo } from "../types/todo.types";


export const groupTodosByDate = (todos: Todo[]): GroupedTodo => {
    const groupedTodos = todos.reduce((result: GroupedTodo, todo: Todo) => {
      const date = todo.date.split("T")[0];
      if (!result[date]) {
        result[date] = [];
      }
      result[date].push(todo);
      return result;
    }, {});

    return groupedTodos;
  };