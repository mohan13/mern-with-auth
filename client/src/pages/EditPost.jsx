import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { viewDetails } from "../redux/apiAction";
import { EditBlogForm } from "../components/forms/EditPost";

const EditPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blogDetails } = useSelector((state) => state);

  useEffect(() => {
    dispatch(viewDetails(id));
  }, [dispatch]);

  console.log("edit", id, Object.values(blogDetails));
  return (
    <>
      <EditBlogForm blogsData={[blogDetails]} />{" "}
    </>
  );
};

export default EditPost;
