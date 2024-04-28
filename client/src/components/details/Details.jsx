/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { viewDetails } from "../../redux/apiAction";
import { useEffect } from "react";

export const Details = () => {
  const { error, blogDetails, isLoading } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(
    (id) => {
      dispatch(viewDetails(id));
    },
    [dispatch],
  );
  if (isLoading) {
    return <div>Loading....</div>;
  }

  console.log("details", isLoading, error, blogDetails);

  return (
    <>
      <div>
        {blogDetails.title}
        <div className="px-4 py-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-800 xl:text-4xl"></h2>
          <p className="mt-4 block max-w-4xl text-gray-500"></p>
        </div>
      </div>
    </>
  );
};
