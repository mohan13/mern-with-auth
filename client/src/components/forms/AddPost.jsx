import { Form, Formik } from "formik";
import Select from "../../ui/select";
import { Button } from "../../ui/button";
import Input from "../../ui/input";
import Textarea from "../../ui/description";
import { useDispatch, useSelector } from "react-redux";
import { writeBlog } from "../../redux/apiAction";
import { toast } from "react-toastify";

// export const convertToBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);
//     fileReader.onload = () => {
//       resolve(fileReader.result);
//     };
//     fileReader.onerror = (error) => {
//       reject(error);
//     };
//   });
// };

export const AddPostForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.api.error);
  if (error) {
    toast.error(error);
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new product
        </h2>

        <Formik
          initialValues={{
            title: "",
            category: "",
            description: "",
            images: "",
          }}
          onSubmit={(values, { resetForm }) => {
            try {
              let formData = new FormData();
              formData.append("title", values.title);
              formData.append("description", values.description);
              formData.append("category", values.category);
              formData.append("images", values.images);

              dispatch(writeBlog(formData));
              resetForm({
                values: {
                  title: "",
                  category: "",
                  description: "",
                  images: "",
                },
              });
            } catch (error) {
              console.log(error.message);
            }
          }}
        >
          {({ setFieldValue }) => (
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
              <Textarea name="description" label="Write description here..." />
              <Button type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
