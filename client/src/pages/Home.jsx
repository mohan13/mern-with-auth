import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/apiAction";

const Home = () => {
  const { userInfo } = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(userInfo);
  return (
    <>
      <div className="home_page">
        <h4>Welcome</h4>
        {userInfo}
        <button onClick={() => dispatch(logout())}>LOGOUT</button>
      </div>
    </>
  );
};

export default Home;
