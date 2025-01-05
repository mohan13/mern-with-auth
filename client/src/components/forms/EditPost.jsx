/* eslint-disable react/prop-types */
import { Form, Formik } from "formik";
import Select from "../../ui/select";
import { Button } from "../../ui/button";
import Input from "../../ui/input";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import { updateBlogs } from "../../redux/apiAction";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export const EditBlogForm = ({ blogsData }) => {
  const [editpost, setEditpost] = useState(blogsData.description);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("navigate", blogsData);

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Edit your product
        </h2>
        <Formik
          initialValues={blogsData}
          enableReinitialize // to refresh initial data
          onSubmit={(values, { resetForm }) => {
            toast.success("Blog updated");
            try {
              let formData = new FormData();
              formData.append("title", values.title);
              formData.append("description", editpost);
              formData.append("images", values.images);

              formData.append("category", values.category);
              dispatch(updateBlogs(values._id, formData));

              navigate("/dashboard");

              resetForm({
                values: { title: "", category: "", description: "" },
              });
            } catch (error) {
              console.log(error.message);
            }
          }}
        >
          {(setFieldValue) => (
            <Form className="flex flex-col gap-4 mb-4 ">
              <Input name="title" type="text" label="Write blog title" />
              <Select
                options={["nodejs", "film"]}
                name="category"
                label="Category"
              />
              <input
                type="file"
                name="images"
                onChange={(e) => setFieldValue("images", e.target.files[0])}
              />

              <ReactQuill
                theme="snow"
                placeholder="Write something"
                className="h-72 mb-12 "
                name="description"
                value={editpost}
                onChange={(value) => setEditpost(value)}
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
