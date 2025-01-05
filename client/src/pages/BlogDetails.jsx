/* eslint-disable react/prop-types */

import { useParams } from "react-router-dom";
import { Details } from "../components/details/Details";
import { useDispatch, useSelector } from "react-redux";
import { viewDetails } from "../redux/apiAction";
import { useEffect } from "react";
const BlogDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blogDetails = useSelector((state) => state.api.blogDetails);
  const isLoading = useSelector((state) => state.api.isLoading);

  useEffect(() => {
    if (id) {
      dispatch(viewDetails(id));
    }
  }, [dispatch, id]);

  console.log(blogDetails);
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Details
          title={blogDetails[0].title}
          images={blogDetails[0].images}
          description={blogDetails[0].description}
        />
      )}
    </div>
  );
};

export default BlogDetails;
