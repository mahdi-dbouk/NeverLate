import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { faHistory } from "@fortawesome/free-solid-svg-icons/faHistory";
import Button from "../shared/button";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import CreateTodoModal from "./createTodoModal";

const FloatingActions = () => {

  const createTodoModalRef = useRef<React.ElementRef<typeof CreateTodoModal>>(null)
  return (
    <div className="fixed bottom-3 right-3 flex h-fit w-16 flex-col items-center justify-center gap-3">
      <Button
        variant="ghost-icon"
        width="w-12"
        height="h-12"
        icon={faSearch}
        textColor="text-green-500"
        onHoverTextColor="hover:text-green-600"
        buttonColor="border-green-500"
        onHoverColor="hover:border-green-600"
        disabled={false}
        action={() => {}}
      />
      <Button
        variant="icon"
        height="h-12"
        width="w-12"
        icon={faAdd}
        iconColor="white"
        disabled={false}
        action={() => {createTodoModalRef.current?.openModal()}}
      />
      <Button
        variant="ghost-icon"
        width="w-12"
        height="h-12"
        icon={faHistory}
        textColor="text-rose-500"
        onHoverTextColor="hover:text-rose-600"
        buttonColor="border-rose-500"
        onHoverColor="hover:border-rose-600"
        disabled={false}
        action={() => {}}
      />

      <CreateTodoModal ref={createTodoModalRef}/>
    </div>
  );
};

export default FloatingActions;
