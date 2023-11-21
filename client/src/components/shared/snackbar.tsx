import { faCheck, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useState, forwardRef, useImperativeHandle } from "react";

type SnackbarProps = {
  message: string;
  status: string;
};

export type SnackbarRef = {
  show: () => void;
  hide: () => void;
};

const Snackbar = forwardRef<SnackbarRef, SnackbarProps>(
  ({ message, status }, ref) => {
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [renderSnackbar, setRenderSnackbar] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      show() {
        setShowSnackbar(true);
        setRenderSnackbar(true);
      },
      hide() {
        setShowSnackbar(false);
        setTimeout(() => {
          setRenderSnackbar(false);
        }, 900);
      },
    }));

    return (
      renderSnackbar && (
        <div
          className={classNames(
            "fixed top-16 flex h-12 w-[320px] flex-row items-center justify-start rounded-lg px-4 py-2 text-lg font-bold text-white shadow-lg",
            {
              "bg-green-500": status === "success",
              "bg-red-500": status === "failed",
            },
            {
              "animate-fadeInBounce": showSnackbar === true,
              "animate-fadeOutBounce": showSnackbar === false,
            },
          )}
        >
          {status === "success" ? (
            <span className="flex h-full w-full flex-row items-center justify-start gap-2">
              <FontAwesomeIcon icon={faCheck} size="1x" color="white" />
              {message}
            </span>
          ) : (
            <span className="flex h-full w-full flex-row items-center justify-start gap-2">
              <FontAwesomeIcon icon={faWarning} size="1x" color="white" />
              {message}
            </span>
          )}
        </div>
      )
    );
  },
);

export default Snackbar;
