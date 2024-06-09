/* eslint-disable react/prop-types */
import React, { useId } from "react";
import { useField } from "formik";

const Textarea = React.forwardRef(function Textarea({ label, ...props }, ref) {
  const [field, meta] = useField(props);
  const id = useId();
  return (
    <div className="w-full ">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}

      {/* <ReactQuill {...props} ref={ref} onChange={(e = { ...field })} /> */}
      <textarea
        rows="5"
        className={`bg-gray-50 border p-2.5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full bg-transparent         `}
        {...props}
        {...field}
        ref={ref}
      />
      {meta.touched && meta.error ? (
        <p className="mt-1 text-xs text-red-500">*{meta.error}</p>
      ) : null}
    </div>
  );
});

export default Textarea;
