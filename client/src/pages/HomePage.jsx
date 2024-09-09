import { useEffect } from "react";
import { API } from "../providers/request";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
const HomePage = () => {
  const { user } = useSelector((state) => state.user);

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
  return (
    <>
      <Layout>
        <h1>Hello</h1>
      </Layout>
    </>
  );
};

export default HomePage;
