import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getMyBlogs } from "../../redux/apiAction";
import { formatDateTime } from "../../utils/getTimeDate";
import { useNavigate } from "react-router-dom";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import { AddPostForm } from "../forms/AddPost";
import HTMLReactParser from "html-react-parser/lib/index";

export const Dashboard = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myBlogs = useSelector((state) => state.api.myBlogs);
  const loading = useSelector((state) => state.api.isLoading);
  const token = useSelector((state) => state.api.token);

  useEffect(() => {
    if (token) {
      dispatch(getMyBlogs());
    }
  }, [dispatch, token]);

  const blogSearch = (e) => {
    setBlogTitle(e.target.value);
  };

  const searchOnTitle = (array) => {
    return array?.filter((item) =>
      item.title.toLowerCase().includes(blogTitle.toLocaleLowerCase()),
    );
  };

  const FilteredBlogs = searchOnTitle(myBlogs);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <div className="flex items-center">
            <div className="sr-only">Search</div>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                onChange={blogSearch}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button
            onClick={onOpen}
            className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            <svg
              className="h-3.5 w-3.5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              />
            </svg>
            Add product
          </button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              <AddPostForm />
            </ModalContent>
          </Modal>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <select
              onChange={(e) => e.target.value}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5`}
            >
              <option value="">--- Select ---</option>
              {["Film", "nodejs"]?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-2 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      S.N
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                {loading && !myBlogs ? (
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>Loading....</tr>{" "}
                  </tbody>
                ) : (
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {FilteredBlogs?.map((item, index) => {
                      return (
                        <tr key={item._id}>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={item.images}
                                  alt={item.title}
                                />
                              </div>
                              <div className="ml-4">
                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                  {item.title}
                                </td>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            {item.category}
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            {HTMLReactParser(item.description)}
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            {formatDateTime(item.createdAt)}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                            <div className="flex gap-2">
                              <button
                                className="cursor-pointer"
                                onClick={() => dispatch(deleteBlog(item._id))}
                              >
                                Delete
                              </button>
                              <button
                                onClick={() =>
                                  navigate(`/details/${String(item._id)}`)
                                }
                              >
                                View
                              </button>
                              <button
                                onClick={() =>
                                  navigate(`/editpost/${String(item._id)}`)
                                }
                              >
                                Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
