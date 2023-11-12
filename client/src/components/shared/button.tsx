import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faAdd, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

type ButtonProps = {
  text?: string;
  icon?: IconDefinition;
  iconSize?: SizeProp;
  iconColor?: string;
  variant: string;
  height?: string;
  width?: string;
  buttonColor?: string;
  onHoverColor?: string;
  textColor?: string;
  onHoverTextColor?: string;
  disabled?: boolean;
  action: () => void;
};

const Button: React.FC<ButtonProps> = ({
  text = "click me",
  icon = faAdd,
  buttonColor = "",
  textColor = "",
  onHoverColor = "",
  onHoverTextColor = "",
  iconColor = "white",
  iconSize = "1x",
  variant = "primary",
  height = "h-fit",
  width = "w-fit",
  disabled = false,
  action,
}) => {
  let dynamicClassList: string = "";
  if (disabled) dynamicClassList = `${height} ${width}`;
  else
    dynamicClassList = `${height} ${width} ${buttonColor} ${textColor} ${onHoverColor} ${onHoverTextColor}`;
  return (
    <button
      className={classNames(
        //Base classes
        `${dynamicClassList}`,

        //disabled button
        {
          //primary - disabled
          "bg-gray-500 px-4 py-2 text-white":
            variant === "primary" && disabled === true,

          //secondary - disabled
          "border-2 border-gray-500 px-4 py-2 text-gray-500":
            variant === "secondary" && disabled === true,

          //textButton - disabled
          "font-bold text-gray-500": variant === "text" && disabled === true,

          //iconButton - disabled
          "h-12 w-12 rounded-full bg-gray-500 ":
            variant === "icon" && disabled === true,

          //ghostIconButton - diabled
          "h-12 w-12 rounded-full border-2 border-gray-500 text-gray-500":
            variant === "ghost-icon" && disabled === true,
        },

        //enabled button
        {
          //primary
          "bg-blue-500 px-4 py-2 text-white hover:bg-blue-600":
            variant === "primary" && disabled === false,

          //secondary
          "border-2 border-blue-500 bg-white px-4 py-2 text-blue-500 hover:border-blue-600 hover:text-blue-600":
            variant === "secondary" && disabled === false,

          //textButton
          "font-bold text-blue-500 hover:text-blue-600":
            variant === "text" && disabled === false,

          //iconButton
          "h-12 w-12 rounded-full bg-blue-500 hover:bg-blue-600":
            variant === "icon" && disabled === false,

          //ghostIconButton
          "h-12 w-12 rounded-full border-2 border-blue-500 text-blue-500 hover:border-blue-600 hover:text-blue-600":
            variant === "ghost-icon" && disabled === false,
        },
      )}
      onClick={action}
      disabled={disabled}
    >
      {variant === "icon" || variant === "ghost-icon" ? (
        //case where button is iconButton
        <FontAwesomeIcon
          icon={icon!}
          color={variant === "ghost-icon" ? "" : iconColor!}
          size={iconSize!}
        ></FontAwesomeIcon>
      ) : (
        // case where button is default button
        text
      )}
    </button>
  );
};

export default Button;
