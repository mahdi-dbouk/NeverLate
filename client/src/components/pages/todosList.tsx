import { useQuery } from "@tanstack/react-query";
import Todo from "../ui/todo";
import axios from "axios";
import Snackbar from "../shared/snackbar";
import { useEffect, useRef, useState } from "react";
import TodoLoading from "../ui/todoLoading";
import { groupTodosByDate } from "../../utilities/todo.utilities";

const token = localStorage.getItem('access-token')
console.log(token)

const TodoList = () => {
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarStatus, setSnackbarStatus] = useState<string>("");
  const snackbarRef = useRef<React.ElementRef<typeof Snackbar>>(null);

  const {data, isLoading, isError, isSuccess} = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/todos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    },
    staleTime: 20 * 1000
  })

  useEffect(() => {
    if (isError) {
      setSnackbarMessage('Oops..Something went wrong!');
      setSnackbarStatus('failed');
      snackbarRef.current?.show();
      setTimeout(() => {
        snackbarRef.current?.hide();
      }, 3600);
    }
  }, [isError]);

  const groupedByDateTodos = isSuccess? groupTodosByDate(data): [];
  return (
    <div className="flex flex-col items-center justify-center gap-2 pb-4 pt-20">
      <Snackbar ref={snackbarRef} message={snackbarMessage} status={snackbarStatus}/>
      {
        isSuccess && Object.entries(groupedByDateTodos).map(([date, todosForDate]) => (
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
      
      {
        isLoading && 
        <div className="flex flex-col h-full w-full items-center justify-start gap-4">
          <TodoLoading />
          <TodoLoading />
          <TodoLoading />
        </div>
      }
    </div>
  );
};

export default TodoList;
