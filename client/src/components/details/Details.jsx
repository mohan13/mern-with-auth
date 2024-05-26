/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const Details = ({ post }) => {
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <button>{post && post.category}</button>
      </Link>
      <img
        src={post && post.images}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.description.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>

      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent articles</h1>
        {/* <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div> */}
      </div>
    </main>
    // <section className="bg-white dark:bg-gray-900">
    //   <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
    //     <div className="grid gap-8 items-center mb-8 lg:mb-24 lg:gap-12 ">
    //       <div className=" text-center sm:mb-6 lg:text-left lg:mb-0">
    //         <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl xl:text-6xl dark:text-white">
    //           {blog.title}
    //         </h1>
    //         <div>
    //           <img
    //             className=" w-full rounded-lg sm:h-96 object-cover"
    //             src={blog.images}
    //             alt={blog.title}
    //           />
    //         </div>
    //         <p className="mx-auto mb-6 max-w-xl font-light text-gray-500 lg:mx-0 xl:mb-8 md:text-lg xl:text-xl dark:text-gray-400">
    //           {blog.description}
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};
