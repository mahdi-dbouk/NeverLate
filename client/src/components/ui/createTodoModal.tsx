import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useImperativeHandle, useState } from "react";
import Modal from "react-modal";
import Input from "../shared/input";
import Button from "../shared/button";

type CreateTodoModalProps = {
  //
};
export type CreateTodoModalRef = {
  openModal: () => void;
  closeModal: () => void;
};
const CreateTodoModal = forwardRef<CreateTodoModalRef, CreateTodoModalProps>(
  (_, ref) => {
    useImperativeHandle(ref, () => ({
      openModal() {
        setShowModal(true);
        console.log("openModal() in CreateTodoModal Component was invoked");
      },
      closeModal() {
        setShowModal(false);
      },
    }));

    const [showModal, setShowModal] = useState<boolean>(false);

    const [todoData, setTodoData] = useState({
      text: "",
      priority: "",
      date: "",
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

    return (
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
              value={todoData.text}
              disabled={false}
              onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTodoData({ ...todoData, text: event.target.value });
              }}
            />
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-1 flex-col items-start justify-center">
              <label htmlFor="Priority">Priority</label>
              <Input
                type="text"
                placeholder="Priority"
                height="h-10"
                width="w-full"
                value={todoData.priority}
                disabled={false}
                onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setTodoData({ ...todoData, priority: event.target.value });
                }}
              />
            </div>
            <div className="flex flex-1 flex-col items-start justify-center">
              <label htmlFor="Date">Date</label>
              <Input
                type="text"
                placeholder="Date"
                height="h-10"
                width="w-full"
                value={todoData.date}
                disabled={false}
                onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setTodoData({ ...todoData, date: event.target.value });
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
                console.log("clicked");
              }}
            />
          </div>
        </div>
      </Modal>
    );
  },
);

export default CreateTodoModal;
