/* eslint-disable react/prop-types */

import { useId } from "react";

export const Label = ({ label }) => {
  const id = useId();
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
    </>
  );
};
