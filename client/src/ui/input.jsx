import { Input as TextInput } from "@nextui-org/react";

export default function Input() {
  return (
    <div className="">
      <TextInput
        type="email"
        label="Email"
        labelPlacement="outside"
        placeholder="Enter your email"
        className="text-4xl text-red-400"
        classNames={{
          input: "text-4xl",
        }}
      />
    </div>
  );
}
