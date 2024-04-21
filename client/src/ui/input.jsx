/* eslint-disable react/prop-types */
import React, { useId } from "react";

const Input = (
  { label, type = "text", className = "", errorMessage, ...props },
  ref,
) => {
  const id = useId();
  return (
    <div className="w-full md:w-1/3">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
      <input
        className={`
        flex h-10 w-full rounded-md  bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${className}        `}
        type={type}
        placeholder="Enter your name"
        {...props}
        ref={ref}
      />
      {errorMessage && (
        <p className="mt-1 text-xs text-red-500">*{errorMessage}</p>
      )}
    </div>
  );
};

export default React.forwardRef(Input);
