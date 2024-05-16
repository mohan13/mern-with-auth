import { Form, Formik } from "formik";
import Select from "../../ui/select";
import { Button } from "../../ui/button";
import Input from "../../ui/input";
import Textarea from "../../ui/description";
import { useDispatch, useSelector } from "react-redux";
import { writeBlog } from "../../redux/apiAction";

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

  const success = useSelector((state) => state.api.success);
  if (success) {
    alert(`Successful !!`);
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
          {({ setFieldValue, isSubmitting }) => (
            <Form className="flex flex-col gap-4 mb-4 ">
              <Input name="title" type="text" label="Write blog title" />
              <Select
                options={["nodejs", "film"]}
                name="category"
                label="Category"
              />
              <input
                // className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="file"
                name="images"
                onChange={(e) => setFieldValue("images", e.target.files[0])}
                // onChange={(e) => {
                //   const reader = new FileReader();
                //   reader.onload = () => {
                //     if (reader.readyState == 2) {
                //       console.log("inside ready state");
                //       setFieldValue("images", reader.result);
                //     }
                //   };
                //   reader.readAsDataURL(e.target.files[0]);
                // }}
              />

              <Textarea name="description" label="Write description here..." />

              <Button type="submit">
                {isSubmitting === true ? "Submitting" : "Submit"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
