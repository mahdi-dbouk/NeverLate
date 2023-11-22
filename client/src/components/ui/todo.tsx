import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../shared/button";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import classNames from "classnames";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { useRef, useState } from "react";
import CreateTodoModal from "./createTodoModal";
import Snackbar from "../shared/snackbar";
import { CreateTodoResponse } from "../../types/todo.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodoById, markTodoCompleted } from "../../services/todos.service";

type TodoProps = {
  id: number
  description?: string;
  priority?: string;
  date?: string;
  status?: string;
};

const Todo: React.FC<TodoProps> = ({id, description, priority, date, status }) => {

  const createTodoModalRef = useRef<React.ElementRef<typeof CreateTodoModal>>(null)
  const queryClient = useQueryClient();
  const snackbarRef = useRef<React.ElementRef<typeof Snackbar>>(null);

  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarStatus, setSnackbarStatus] = useState<string>("");

  const markCompletedMutation = useMutation({
    mutationKey: ['todos'],
    mutationFn: async (id: number) => {
      const response = await markTodoCompleted(id);

      return response.data;
    },
    onSuccess: (data: CreateTodoResponse) => {
      console.log(data)
      queryClient.invalidateQueries({queryKey: ['todos']});
      snackbarRef.current?.show();
      setSnackbarMessage("Status Updated Successfully!");
      setSnackbarStatus("success");
      setTimeout(() => {
        snackbarRef.current?.hide();
      }, 3600);
    },
    onError: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
      snackbarRef.current?.show();
      setSnackbarMessage("Oops...Something went wrong!");
      setSnackbarStatus("failed");
      setTimeout(() => {
        snackbarRef.current?.hide();
      }, 3600);
    }, 

  });

  const deleteTodoByIdMutation = useMutation({
    mutationKey: ['todos'],
    mutationFn: async (id: number) => {
      const response = await deleteTodoById(id);

      return response.data;
    },
    onSuccess: (data: CreateTodoResponse) => {
      console.log(data)
      queryClient.invalidateQueries({queryKey: ['todos']});
      snackbarRef.current?.show();
      setSnackbarMessage("Todo Deleted Successfully!");
      setSnackbarStatus("success");
      setTimeout(() => {
        snackbarRef.current?.hide();
      }, 3600);
    },
    onError: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
      snackbarRef.current?.show();
      setSnackbarMessage("Oops...Something went wrong!");
      setSnackbarStatus("failed");
      setTimeout(() => {
        snackbarRef.current?.hide();
      }, 3600);
    }, 

  })



  const markCompleted = () => {
    markCompletedMutation.mutate(id);
  }

  const deleteTodo = () => {
    deleteTodoByIdMutation.mutate(id);
  }


  return (
    <>
    <CreateTodoModal todoId={id} ref={createTodoModalRef} />
    <Snackbar ref={snackbarRef} message={snackbarMessage} status={snackbarStatus} /> 
    <div className="h-36 w-2/5 border bg-white px-2 shadow-md">
      <div className="flex flex-col">
        <div className="flex h-8 w-full flex-row items-center justify-between pt-2">
          <div
            className={classNames(
              "flex h-[24px] w-fit flex-row items-center justify-center rounded-full px-2 py-1",
              {
                "bg-green-600": status === 'completed',
                "bg-amber-400": status === 'pending',
              },
            )}
          >
            <span className="text-xs font-bold text-white">
              {status === 'completed' ? "Completed" : "Pending"}
            </span>
          </div>
          <div className="flex h-[24px] w-fit flex-row items-center justify-center gap-1 px-2 py-1">
            <span className="text-xs font-normal text-slate-500">
              Priority:
            </span>
            <span
              className={classNames("text-xs font-bold", {
                "text-red-600": priority === "high",
                "text-yellow-600": priority === "medium",
                "text-blue-600": priority === "low",
              })}
            >
              {priority}
            </span>
          </div>
        </div>
        <div className="flex h-16 w-full flex-row items-center justify-start px-2">
          <span className="text-ellipsis text-justify text-sm font-normal text-black">
            {description}
          </span>
        </div>
        <div className="flex h-12 w-full flex-row items-center justify-between px-2">
          <div className="flex flex-row gap-1">
            <FontAwesomeIcon icon={faClock} color="gray" size="1x" />
            <span className="text-xs font-normal text-slate-500">
              {new Date(date!).toDateString()}
            </span>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <Button
              variant="icon"
              height="h-8"
              width="w-8"
              buttonColor="bg-green-500"
              onHoverColor="hover:bg-green-600"
              icon={faCheck}
              iconColor="white"
              disabled={false}
              action={() => {markCompleted()}}
            />
            <Button
              variant="icon"
              height="h-8"
              width="w-8"
              icon={faEdit}
              iconColor="white"
              disabled={false}
              action={() => {createTodoModalRef.current?.openModal('update')}}
            />
            <Button
              variant="ghost-icon"
              width="w-8"
              height="h-8"
              icon={faTrash}
              textColor="text-rose-500"
              onHoverTextColor="hover:text-rose-600"
              buttonColor="border-rose-500"
              onHoverColor="hover:border-rose-600"
              disabled={false}
              action={() => {deleteTodo()}}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Todo;
