import { Form, Formik } from "formik";
import Select from "../../ui/select";
import { Button } from "../../ui/button";
import Input from "../../ui/input";
import Textarea from "../../ui/description";
import { useDispatch } from "react-redux";
import { writeBlog } from "../../redux/apiAction";
export const EditBlogForm = () => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Edit your product
        </h2>
        <Formik
          initialValues={{ title: "", category: "", description: "" }}
          onSubmit={(values, { resetForm }) => {
            try {
              let formData = new FormData();
              formData.append("title", values.title);
              formData.append("description", values.description);
              formData.append("category", values.category);
              dispatch(writeBlog(formData));
              resetForm({ values: { email: "", password: "" } });
            } catch (error) {
              console.log(error.message);
            }
          }}
        >
          {() => (
            <Form className="flex flex-col gap-4 mb-4 ">
              <Input name="title" type="text" label="Write blog title" />
              <Select
                options={["nodejs", "film"]}
                name="category"
                label="Category"
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
