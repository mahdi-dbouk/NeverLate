import { GroupedTodoByDate, GroupedTodoByStatus, TodoType } from "../types/todo.types";


export const groupTodosByDate = (todos: TodoType[]): GroupedTodoByDate => {
    const groupedTodos = todos.reduce((result: GroupedTodoByDate, todo: TodoType) => {
      const date = todo.date.split("T")[0];
      if (!result[date]) {
        result[date] = [];
      }
      result[date].push(todo);
      return result;
    }, {});

    return groupedTodos;
  };

  export const groupTodosByStatus = (todos: TodoType[]): GroupedTodoByStatus => {
    const groupedTodos = todos.reduce((result: GroupedTodoByStatus, todo: TodoType) => {
      const status = todo.status
      if (!result[status]) {
        result[status] = [];
      }
      result[status].push(todo);
      return result;
    }, {});

    return groupedTodos;
  }

  export const sortTodosByDateAndPriority = (todos: GroupedTodoByDate): GroupedTodoByDate => {
    const sortedTodos: GroupedTodoByDate = {};
    const sortedDates = Object.keys(todos).sort();
    sortedDates.forEach((date) => {
      const todosForDate = todos[date];
  
      const sortedForDate = todosForDate.sort((a, b) => {
        const priorityOrder = {
          "high": 0,
          "medium": 1,
          "low": 2,
        };
  
        const priorityComparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (priorityComparison !== 0) {
          return priorityComparison;
        }
  
        return a.id - b.id;
      });
  
      sortedTodos[date] = sortedForDate;
    });
  
    return sortedTodos;
  };