/* eslint-disable react/prop-types */
import { Form, Formik } from "formik";
import Select from "../../ui/select";
import { Button } from "../../ui/button";
import Input from "../../ui/input";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import { updateBlogs } from "../../redux/apiAction";
import { ToastContainer } from "react-toastify";
import { UploadSingleImage } from "../ui/upload-single-image";
import { useNavigate } from "react-router-dom";

export const EditBlogForm = ({ blogsData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Edit your product
        </h2>
        <Formik
          initialValues={blogsData}
          enableReinitialize // to refresh initial data
          onSubmit={async (values, { resetForm }) => {
            try {
              const formData = new FormData();
              Object.keys(values).forEach((value) => {
                return formData.append(value, values[value]);
              });

              dispatch(updateBlogs(values._id, formData));

              navigate("/dashboard");

              resetForm();
            } catch (error) {
              console.log(error.message);
            }
          }}
        >
          {({ values, setFieldValue, handleChange }) => (
            <Form className="flex flex-col gap-4 mb-4 ">
              <Input name="title" type="text" label="Write blog title" />
              <Select
                options={["nodejs", "film"]}
                name="category"
                label="Category"
              />

              <UploadSingleImage
                setFieldValue={setFieldValue}
                values={values || ""}
                fieldId="images"
                handleChange={handleChange}
              />

              {/* <input
                type="file"
                name="images"
                onChange={(e) => {
                  setImagePreviews(URL.createObjectURL(e.target.files[0]));
                  setFieldValue("images", e.target.files[0]);
                }}
              />
              <div
                style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}
              >
                <div style={{ marginRight: "10px", position: "relative" }}>
                  <img
                    src={imagePreviews}
                    alt=""
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
              </div> */}

              <ReactQuill
                theme="snow"
                placeholder="Write something ..."
                className="h-72 mb-12 "
                defaultValue={values}
                onChange={(value) => setFieldValue("description", value)}
              />
              <Button type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};
