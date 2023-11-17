import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../shared/button";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import classNames from "classnames";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";

type TodoProps = {
  description?: string;
  priority?: string;
  date?: string;
  status?: boolean;
};

const Todo: React.FC<TodoProps> = ({ description, priority, date, status }) => {
  return (
    <div className="h-36 w-2/5 border bg-white px-2 shadow-md">
      <div className="flex flex-col">
        <div className="flex h-8 w-full flex-row items-center justify-between pt-2">
          <div
            className={classNames(
              "flex h-[24px] w-fit flex-row items-center justify-center rounded-full px-2 py-1",
              {
                "bg-green-600": status,
                "bg-amber-400": !status,
              },
            )}
          >
            <span className="text-xs font-bold text-white">
              {status ? "Completed" : "Pending"}
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
              action={() => {}}
            />
            <Button
              variant="icon"
              height="h-8"
              width="w-8"
              icon={faEdit}
              iconColor="white"
              disabled={false}
              action={() => {}}
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
              action={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
