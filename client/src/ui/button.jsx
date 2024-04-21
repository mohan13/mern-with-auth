/* eslint-disable react/prop-types */
// import { Button as Btn } from "@nextui-org/react";

const Button = ({
  type = "button",
  bgColor = "bg-black",
  textColor = "text-white",
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`
      rounded-md  px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-black/80 
     ${textColor} ${bgColor} ${className} `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
