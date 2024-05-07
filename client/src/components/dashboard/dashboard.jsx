import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, fetchBlogs } from "../../redux/apiAction";
import { formatDateTime } from "../../utils/getTimeDate";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs, isLoading } = useSelector((state) => state);
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  console.log("blogs", blogs[0].images, typeof blogs);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
      <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-lg font-semibold">Employees</h2>
          <p className="mt-1 text-sm text-gray-700">
            This is a list of all employees. You can add new employees, edit or
            delete existing ones.
          </p>
        </div>
        <div>
          <div className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
            Add new employee
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
                {isLoading ? (
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>Loading....</tr>
                  </tbody>
                ) : (
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {Object.values(blogs)?.map((item, index) => {
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
                            {item.description}
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
                              <div
                                className="cursor-pointer"
                                onClick={() =>
                                  navigate(`/details/${String(item._id)}`)
                                }
                              >
                                View
                              </div>
                              <div
                                className="cursor-pointer"
                                onClick={() =>
                                  navigate(`/editpost/${String(item._id)}`)
                                }
                              >
                                Edit
                              </div>
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
