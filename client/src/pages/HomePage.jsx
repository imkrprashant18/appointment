import { useEffect } from "react";
import { API } from "../providers/request";
const HomePage = () => {
  const getUserData = async () => {
    try {
      const res = await API.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return <div>HomePage</div>;
};

export default HomePage;
