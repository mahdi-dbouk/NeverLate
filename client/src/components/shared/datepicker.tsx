import classNames from "classnames";

type DatePickerProps = {
  height: string;
  width: string;
  onSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({
  height,
  width,
  onSelection,
}) => {
  return (
    <input
      type="date"
      name="datepicker"
      id="datepicker"
      placeholder="Pick a date"
      className={classNames(
        `${height} ${width} rounded-md border border-solid border-gray-400 px-4 py-2 focus:outline-blue-500 `,
      )}
      onChange={onSelection}
    />
  );
};

export default DatePicker;
