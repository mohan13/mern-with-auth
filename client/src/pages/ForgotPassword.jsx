import { Formik, Form } from "formik";
import Input from "../ui/input";

const ForgotPassword = () => {
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow  md:mt-0 sm:max-w-md 700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Change Password
          </h2>
          <Formik
            initialValues={{ email: "", newPassword: "", oldPassword: "" }}
            onSubmit={() => console.log("submitted")}
          >
            {() => (
              <Form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                <Input type="email" label="Email" name="email" />
                <Input
                  type="password"
                  label="New Password"
                  name="newPassword"
                />
                <Input
                  type="password"
                  label="Old Password"
                  name="oldPassword"
                />

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Reset password
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
