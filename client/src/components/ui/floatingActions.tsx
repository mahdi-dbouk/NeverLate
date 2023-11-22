import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { faHistory } from "@fortawesome/free-solid-svg-icons/faHistory";
import Button from "../shared/button";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import CreateTodoModal from "./createTodoModal";

const FloatingActions: React.FC<{showCompleted:boolean, setShowCompleted: (val: boolean) => void}> = ({showCompleted, setShowCompleted}) => {

  const createTodoModalRef = useRef<React.ElementRef<typeof CreateTodoModal>>(null)
  return (
    <>
    <CreateTodoModal ref={createTodoModalRef}/>
    <div className="fixed bottom-3 right-3 flex h-fit w-16 flex-col items-center justify-center gap-3">
      <Button
        variant="icon"
        height="h-12"
        width="w-12"
        icon={faAdd}
        iconColor="white"
        disabled={false}
        action={() => {createTodoModalRef.current?.openModal('create')}}
      />
      <Button
        variant="ghost-icon"
        width="w-12"
        height="h-12"
        icon={showCompleted? faClose:faHistory}
        textColor="text-rose-500"
        onHoverTextColor="hover:text-rose-600"
        buttonColor="border-rose-500"
        onHoverColor="hover:border-rose-600"
        disabled={false}
        action={() => {showCompleted?setShowCompleted(false):setShowCompleted(true)}}
      />
    </div>
    </>
  );
};

export default FloatingActions;
