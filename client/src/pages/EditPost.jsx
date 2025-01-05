import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { viewDetails } from "../redux/apiAction";
import { EditBlogForm } from "../components/forms/EditPost";

const EditPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blogDetails = useSelector((state) => state.api.blogDetails);

  useEffect(() => {
    if (id) {
      dispatch(viewDetails(id));
    }
  }, [dispatch, id]);

  return <EditBlogForm blogsData={blogDetails[0]} />;
};

export default EditPost;
