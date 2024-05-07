import axios from "axios";

import { Formik, Field, Form } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
  const [errors, setErrors] = useState("");

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
          formData.append("username", values.username);
          formData.append("email", values.email);
          formData.append("password", values.password);
          axios
            .post("http://localhost:4000/signup", formData, {
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                //add headers when data is not accepted by backend
              },
            })
            .then((res) => {
              console.log(res.data.msg);
              setErrors(res.data.msg);
              alert(res.data.msg);
            });
          resetForm({ values: { username: "", email: "", password: "" } });
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
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
                      id="Username"
                      name="username"
                      placeholder="Jane"
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
                  <Field
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    name="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              {toast.warn({ errors })} <button type="submit">Submit</button>
            </Form>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default Signup;
