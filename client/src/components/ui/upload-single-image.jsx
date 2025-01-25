/* eslint-disable react/prop-types */
import { FaUpload } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

export const isValidImageUrl = (url) => {
  const imageRegex = /\.(jpeg|jpg|gif|png|webp|svg)$/i;
  return imageRegex.test(url);
};

export const UploadSingleImage = ({
  values,
  setFieldValue,
  fieldId,
  handleChange,
}) => {
  const isImageValid = isValidImageUrl(values[fieldId]);
  return (
    <div className="p-6 border-dashed border-2  h-52 relative flex items-center justify-center">
      {values[fieldId] instanceof File || isImageValid ? (
        <label className="cursor-pointer flex items-center justify-center w-full h-full">
          <img
            src={
              values[fieldId] instanceof File
                ? URL.createObjectURL(values[fieldId]) // Generate blob URL if the value is a file
                : values[fieldId]
            }
            className="max-h-full max-w-full rounded"
          />
          <span
            onClick={(e) => {
              e.preventDefault();
              setFieldValue(fieldId, "");
            }}
            className="text-lg right-2 bottom-2 text-white bg-red-600 p-1 absolute rounded-full"
          >
            <IoCloseOutline />
          </span>
        </label>
      ) : (
        <>
          <label
            htmlFor={fieldId}
            className="cursor-pointer border-gray-300 flex-col gap-y-4 flex items-center justify-center   relative p-5  "
          >
            <span className="text-gray-500 text-2xl  bg-white    flex items-center justify-center">
              <FaUpload />
            </span>
            <span className="text-gray-500">Click to Upload</span>
          </label>
          <input
            id={fieldId}
            type="file"
            name={fieldId}
            className="hidden"
            onChange={(e) => {
              handleChange(e);
              setFieldValue(fieldId, e.target.files[0]);
              console.log(
                e.target.files && URL.createObjectURL(e.target.files[0]),
              );
              e.target.value = "";
            }}
          />
        </>
      )}
    </div>
  );
};
