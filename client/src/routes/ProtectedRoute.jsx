import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { API } from "../providers/request";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  // eslint-disable-next-line
  const getUser = async () => {
    try {
      const res = await API.post(
        "api/v1/user/getUserData",
        {
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      localStorage.clear();
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return navigate("/login");
  }
}
