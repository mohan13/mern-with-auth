/* eslint-disable react/prop-types */

export const Details = ({ blog }) => {
  // console.log("details", isLoading, error, blogDetails);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
        <div className="grid gap-8 items-center mb-8 lg:mb-24 lg:gap-12 ">
          <div className=" text-center sm:mb-6 lg:text-left lg:mb-0">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl xl:text-6xl dark:text-white">
              {blog.title}
            </h1>
            <div>
              <img
                className=" w-full rounded-lg sm:h-96 object-cover"
                src={blog.images}
                alt={blog.title}
              />
            </div>
            <p className="mx-auto mb-6 max-w-xl font-light text-gray-500 lg:mx-0 xl:mb-8 md:text-lg xl:text-xl dark:text-gray-400">
              {blog.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
