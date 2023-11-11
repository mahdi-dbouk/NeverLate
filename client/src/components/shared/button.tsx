import classNames from "classnames";

type ButtonProps = {
  text: string;
  variant: string;
  height: string,
  width: string,
  disabled: boolean;
  action: () => void;
};

const Button: React.FC<ButtonProps> = ({
  text = "click me",
  variant = "primary",
  height = "h-fit",
  width = "w-fit",
  disabled = false,
  action,
}) => {
  return (
    <button
      className={classNames(
        `${height} ${width}`,
        {
          "bg-gray-500 px-4 py-2 text-white":
            variant === "primary" && disabled === true,
          "border-2 border-gray-500 px-4 py-2 text-gray-500":
            variant === "secondary" && disabled === true,
        },
        {
          "bg-blue-500 px-4 py-2 text-white hover:bg-blue-600":
            variant === "primary" && disabled === false,
          "border-2 border-blue-500 bg-white px-4 py-2 text-blue-500 hover:border-blue-600 hover:text-blue-600":
            variant === "secondary" && disabled === false,
          "text-blue-500 font-bold hover:text-blue-600":
            variant === "text" && disabled === false,
        },
      )}
      onClick={action}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
