/* eslint-disable react/prop-types */

import { useParams } from "react-router-dom";

import { Details } from "../components/details/Details";
const BlogDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <Details id={id} />
    </div>
  );
};

export default BlogDetails;
