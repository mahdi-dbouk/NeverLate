import classNames from "classnames";

type DropDownProps = {
  placeholder: string;
  height: string;
  width: string;
  onSelection: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const DropDown: React.FC<DropDownProps> = ({
  height,
  width,
  placeholder,
  onSelection,
}) => {
  return (
    <select
      name="priority"
      id="priority"
      className={classNames(
        `${height} ${width} rounded-md border border-solid border-gray-400 px-4 py-2 focus:outline-blue-500`,
      )}
      onChange={onSelection}
      placeholder={placeholder}
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  );
};

export default DropDown;
