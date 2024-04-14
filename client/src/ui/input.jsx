import { Input as TextInput } from "@nextui-org/react";

export default function Input({ type, label, placeholder, ...props }) {
  return (
    <div className="">
      <TextInput
        type={type}
        // label={label}
        label=""
        radius={"sm"}
        labelPlacement="outside"
        placeholder={placeholder}
        classNames={{
          input: "text-base ",
          label: "text-lg ",
        }}
        {...props}
      />
    </div>
  );
}
