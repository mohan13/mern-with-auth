import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../ui/button";
import { logout } from "../../redux/apiAction";

const Home = () => {
  // const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      <div className="grid gap-4">
        <h4>Welcome</h4>
        {userInfo}
        <Button onClick={() => dispatch(logout())}>Log Out</Button>
        {/* <Buttoo onClick={() => dispatch(logout())}>LOGOUT</Buttoo> */}
      </div>
    </>
  );
};

export default Home;
