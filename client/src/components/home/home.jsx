import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../../redux/apiAction";
import { format } from "date-fns";
import HTMLReactParser from "html-react-parser/lib/index";

export const HomeComp = () => {
  const blogs = useSelector((state) => state.api.blogs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        {}
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              {blogs[0].title}{" "}
            </h1>
            <p className="max-w-2xl mb-2 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              {HTMLReactParser(blogs[0].description)}
            </p>
            <div className="mb-6 text-gray-500">
              <span className="italic text-sm">
                at {format(blogs[0].createdAt, "d MMM yyyy")}
              </span>
            </div>
            <Link
              to="#"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-900"
            >
              Continue Reading
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src={blogs[0].images}
              // src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
              alt="mockup"
            />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
            {blogs?.map((post) => (
              <div
                key={post.title}
                className="group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg  transition-all"
              >
                <Link to={`/details/${post._id}`}>
                  <img
                    src={post.images}
                    alt="post cover"
                    className="h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20"
                  />
                </Link>
                <div className="p-3 flex flex-col gap-2">
                  <p className="text-lg font-semibold line-clamp-2">
                    {post.title}
                  </p>
                  {/* <span className="italic text-sm">{post.category}</span> */}
                  <span className="text-sm">
                    posted by {post.user_details?.map((item) => item.username)}
                  </span>
                  <span className="italic text-sm">
                    at {format(post.createdAt, "d MMM yyyy")}
                  </span>

                  <Link
                    to={`/details/${String(post._id)}`}
                    className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
                  >
                    Read article
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
