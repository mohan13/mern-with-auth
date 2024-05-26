import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../../redux/apiAction";

export const HomeComp = () => {
  // const navigate = useNavigate();
  const blogs = useSelector((state) => state.api.blogs);
  const token = useSelector((state) => state.api.token);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, token]);

  console.log(blogs);

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Here you&apos;ll find a variety of articles and tutorials on topics
          such as web development, software engineering, and programming
          languages.
        </p>
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
          <div className="flex flex-wrap gap-4">
            {blogs?.map((post) => (
              <div
                key={post.title}
                className="group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all"
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
                  <span className="italic text-sm">{post.category}</span>
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
