/* eslint-disable react/prop-types */

export const Details = ({ blog }) => {
  // console.log("details", isLoading, error, blogDetails);

  return (
    <>
      <div>
        <div className="px-4 py-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-800 xl:text-4xl">
            {blog.title}
          </h2>
          <p className="mt-4 block max-w-4xl text-gray-500">
            {blog.description}
          </p>
        </div>
      </div>
    </>
  );
};
