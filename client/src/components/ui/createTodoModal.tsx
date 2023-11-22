import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Modal from "react-modal";
import Input from "../shared/input";
import Button from "../shared/button";
import DropDown from "../shared/dropdown";
import DatePicker from "../shared/datepicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, updateTodoById } from "../../services/todos.service";
import { CreateTodoRequest, CreateTodoResponse, UpdateTodoRequest } from "../../types/todo.types";
import Snackbar from "../shared/snackbar";

type CreateTodoModalProps = {
  todoId?: number
};
export type CreateTodoModalRef = {
  openModal: (action: string) => void;
  closeModal: () => void;
};
const CreateTodoModal = forwardRef<CreateTodoModalRef, CreateTodoModalProps>(
  ({todoId = -1}, ref) => {
    useImperativeHandle(ref, () => ({
      openModal(action: string) {
        setShowModal(true);
        setActionType(action);
        console.log("openModal() in CreateTodoModal Component was invoked");
      },
      closeModal() {
        setShowModal(false);
      },
    }));

    const snackbarRef = useRef<React.ElementRef<typeof Snackbar>>(null);

    const [actionType, setActionType] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    const [snackbarStatus, setSnackbarStatus] = useState<string>("");

    const queryClient = useQueryClient();

    const [todoData, setTodoData] = useState({
      description: "",
      priority: "",
      date: new Date(),
    });

    const customStyles = {
      content: {
        width: "40%",
        height: "fit",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      },
    };

    const closeModal = () => {
      setShowModal(false);
    };

    const mutation = useMutation({
        mutationKey: ['todos'],
        mutationFn: async (data: CreateTodoRequest) => {
            const response = await createTodo(data);
            return response.data;
        },
        onSuccess: (data: CreateTodoResponse) => {
            console.log(data)
            queryClient.invalidateQueries({queryKey: ['todos']});
            snackbarRef.current?.show();
            setSnackbarMessage("Todo Created Successfully!");
            setSnackbarStatus("success");
            setTimeout(() => {
              snackbarRef.current?.hide();
              closeModal();
            }, 3600);
        },
        onError(error) {
            console.log(error)
        },
    })

    const updateByIdMutation = useMutation({
        mutationKey: ['todos'],
        mutationFn: async (data: UpdateTodoRequest) => {
            const response = await updateTodoById(data);
            return response.data;
        },
        onSuccess: (data: CreateTodoResponse) => {
            console.log(data)
            queryClient.invalidateQueries({queryKey: ['todos']});
            snackbarRef.current?.show();
            setSnackbarMessage("Todo Updated Successfully!");
            setSnackbarStatus("success");
            setTimeout(() => {
              snackbarRef.current?.hide();
              closeModal();
            }, 3600);
        },
        onError(error) {
            console.log(error)
        },
    })

    const submit = () => {
        if(actionType === 'create') {
            mutation.mutate(todoData);
        }
        if(actionType === 'update') {
            updateByIdMutation.mutate({id: todoId, ...todoData});
        }
    }

    return (
      <div className="w-full h-full flex flex-col">
      <Snackbar ref={snackbarRef} message={snackbarMessage} status={snackbarStatus} />
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="flex flex-row justify-between">
          <span className="text-base font-semibold">New Todo</span>
          <button onClick={closeModal}>
            <FontAwesomeIcon icon={faClose} scale={3} color="#1c1c1c" />
          </button>
        </div>
        <div className="flex h-fit w-full flex-col gap-4">
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="description">Description</label>
            <Input
              type="text"
              placeholder="Description"
              height="h-10"
              width="w-full"
              value={todoData.description}
              disabled={false}
              onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTodoData({ ...todoData, description: event.target.value });
              }}
            />
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-1 flex-col items-start justify-center">
              <label htmlFor="Priority">Priority</label>
              <DropDown
                height="h-10"
                width="w-full"
                placeholder="Priority"
                onSelection={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  setTodoData({ ...todoData, priority: event.target.value });
                }}
              />
            </div>
            <div className="flex flex-1 flex-col items-start justify-center">
              <label htmlFor="Date">Date</label>
              <DatePicker
                height="h-10"
                width="w-full"
                onSelection={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setTodoData({ ...todoData, date: new Date(event.target.value) });
                }}
              />
            </div>
          </div>
          <div className="flex flex-1 flex-row">
            <Button
              height="h-10"
              width="w-full"
              text={"Create"}
              disabled={false}
              variant="primary"
              action={() => {
                submit()
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
    );
  },
);

export default CreateTodoModal;
