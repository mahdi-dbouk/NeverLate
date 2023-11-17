import Todo from "../ui/todo";

type Todo = {
  description: string;
  date: string;
  priority: string;
  status: boolean;
};

type GroupedTodo = {
  [date: string]: Todo[];
};

const TodoList = () => {
  const groupTodosByDate = (todos: Todo[]): GroupedTodo => {
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
  const todoData: Todo[] = []

  const groupedByDateTodos = groupTodosByDate(todoData);
  return (
    <div className="flex flex-col items-center justify-center gap-2 pb-4 pt-20">
      {Object.entries(groupedByDateTodos).map(([date, todosForDate]) => (
        <>
          <div  key={date} className="flex h-12 w-2/5 flex-row items-center justify-start">
            <span className="text-md font-medium text-gray-500">
              {new Date(date).toDateString() == new Date().toDateString()
                ? "Today"
                : new Date(date).toDateString() ==
                  new Date(
                    new Date().setDate(new Date().getDate() + 1),
                  ).toDateString()
                ? "Tomorrow"
                : new Date(date).toDateString()}
            </span>
          </div>
          {todosForDate.map((todo, index) => (
            <Todo
              key={index}
              description={todo.description}
              date={todo.date}
              priority={todo.priority}
              status={todo.status}
            />
          ))}
        </>
      ))}
    </div>
  );
};

export default TodoList;
