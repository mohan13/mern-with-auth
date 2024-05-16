import React from "react";

export const ErrrorMessage = ({ error }) => {
  return <div className="text-red-500 font-medium font-base">{error}</div>;
};
