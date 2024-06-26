import { Formik, Field, Form } from "formik";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/apiAction";
import { toast } from "react-toastify";

export const SignupComponent = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.api.error);

  if (error) {
    toast.error(error);
  }
  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
      }}
      onSubmit={(values, { resetForm }) => {
        try {
          let formData = new FormData();
          const { username, email, password } = values;
          formData.append("username", username);
          formData.append("email", email);
          formData.append("password", password);
          dispatch(signup(formData));
          resetForm({ values: { username: "", email: "", password: "" } });
        } catch (error) {
          console.log("error", error.message);
          toast.error(error.message);
        }
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <Link to="/login">Back</Link>

          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign up
            </h2>

            <Form>
              <div className="space-y-5">
                <div>
                  <label className="text-base font-medium text-gray-900">
                    Full Name
                  </label>
                  <div className="mt-2">
                    <Field
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      name="username"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-base font-medium text-gray-900">
                    Email
                  </label>
                  <div className="mt-2">
                    <Field
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label className="text-base font-medium text-gray-900">
                    Password
                  </label>
                  <Field
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <Button type="submit" className="mt-3">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Formik>
  );
};
