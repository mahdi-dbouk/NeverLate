import { useQuery } from "@tanstack/react-query";
import Todo from "../ui/todo";
import Snackbar from "../shared/snackbar";
import { useEffect, useRef, useState } from "react";
import TodoLoading from "../ui/todoLoading";
import { groupTodosByDate, groupTodosByStatus, sortTodosByDateAndPriority } from "../../utilities/todo.utilities";
import { getAllTodos } from "../../services/todos.service";
import { TodoType } from "../../types/todo.types";
import { useNavigate } from "react-router-dom";
import { deleteAuthUser } from "../../utilities/localstorage.utilities";


const TodoList: React.FC<{showCompleted: boolean}> = ({showCompleted}) => {
  const token = localStorage.getItem('access-token')
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarStatus, setSnackbarStatus] = useState<string>("");
  const [pendingTodos, setPendingTodos] = useState<TodoType[]>([])
  const [completedTodos, setCompletedTodos] = useState<TodoType[]>([])
  const navigate = useNavigate();
  
  const snackbarRef = useRef<React.ElementRef<typeof Snackbar>>(null);

  const {data, isLoading, isError, error, isSuccess} = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await getAllTodos();
      return response.data
    },
    staleTime: 20 * 1000,
    enabled: !!token,
  })

  useEffect(() => {
    if(isSuccess){
      const groupedByStatusTodos = isSuccess? groupTodosByStatus(data): null;
      setPendingTodos(groupedByStatusTodos!.pending);
      setCompletedTodos(groupedByStatusTodos!.completed);
    }
  }, [data, isSuccess])

  useEffect(() => {
    if (isError) {
      if(error.response.status === 401) {
        deleteAuthUser()
        navigate('/', {replace: true})
      }
      setSnackbarMessage('Oops..Something went wrong!');
      setSnackbarStatus('failed');
      snackbarRef.current?.show();
      setTimeout(() => {
        snackbarRef.current?.hide();
      }, 3600);
    }
  }, [navigate, error, isError]);

  let groupedByDateTodos;
  if(showCompleted){
    groupedByDateTodos = isSuccess? groupTodosByDate(completedTodos??[]):groupTodosByDate([]);
  } else {
    groupedByDateTodos = isSuccess? groupTodosByDate(pendingTodos??[]):groupTodosByDate([]);
  }

  const sortedByDateAndPriorityTodos = sortTodosByDateAndPriority(groupedByDateTodos);

  return (
    <div className="flex flex-col items-center justify-center gap-2 pb-4 pt-20">
      <Snackbar ref={snackbarRef} message={snackbarMessage} status={snackbarStatus}/>
      {
        isSuccess && Object.entries(sortedByDateAndPriorityTodos).map(([date, todosForDate]) => (
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
            {todosForDate.map((todo) => (
              <Todo
                key={todo.id}
                id={todo.id}
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
