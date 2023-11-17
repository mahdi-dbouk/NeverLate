import classNames from "classnames";

type InputProps = {
  type: string;
  height: string,
  width: string,
  value: string,
  placeholder: string;
  disabled: boolean;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  type,
  height,
  width,
  value,
  placeholder,
  disabled,
  onValueChange,
}) => {
  return (
    <input
      className={classNames(`${height} ${width}`,{
        "border border-solid rounded-md border-gray-400 px-4 py-2 focus:outline-blue-500":
          disabled === false,
      })}
      value={value}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onValueChange}
    />
  );
};

export default Input;
