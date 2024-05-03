/* eslint-disable react/prop-types */

import { useParams } from "react-router-dom";
import { Details } from "../components/details/Details";
import { useDispatch, useSelector } from "react-redux";
import { viewDetails } from "../redux/apiAction";
import { useEffect } from "react";
const BlogDetails = () => {
  const { id } = useParams();
  const { error, blogDetails, isLoading } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewDetails(id));
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error ? (
            <div className="px-4 py-8">{error}</div>
          ) : (
            <Details blog={blogDetails} />
          )}
        </>
      )}
    </div>
  );
};

export default BlogDetails;
