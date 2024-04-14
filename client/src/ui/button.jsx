/* eslint-disable react/prop-types */
import { Button as Btn } from "@nextui-org/react";

export const Button = ({ size, color, ...props }) => {
  return (
    <Btn size={size} radius={"md"} color={color} {...props}>
      button
    </Btn>
  );
};
