/* eslint-disable react/prop-types */
import React, { useId } from "react";
import { useField } from "formik";

const Select = ({ options, label, className, ...props }, ref) => {
  const id = useId();
  const [field, meta] = useField(props);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <select
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ${className}`}
        {...field}
        {...props}
        id={id}
        ref={ref}
      >
        <option value="">--- Select ---</option>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="mt-1 text-xs text-red-500">*{meta.error}</div>
      ) : null}
    </div>
  );
};

export default React.forwardRef(Select);
