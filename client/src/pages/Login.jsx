import { Formik, Field, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiAction";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.api.error);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values, { resetForm }) => {
        try {
          let formData = new FormData();
          formData.append("email", values.email);
          formData.append("password", values.password);

          dispatch(login(formData));
          resetForm({ values: { email: "", password: "" } });
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Login
            </h2>

            <Form>
              <div className="space-y-5">
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
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-base font-medium text-gray-900">
                      Password
                    </label>
                    <Link
                      to="/update-password"
                      className="text-sm font-semibold text-black hover:underline"
                    >
                      Forgot password?{" "}
                    </Link>
                  </div>
                  <Field
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    name="password"
                    placeholder="Password"
                  />
                </div>
              </div>

              <Button className="mt-2" size="sm" color="default" type="submit">
                Submit
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default Login;
