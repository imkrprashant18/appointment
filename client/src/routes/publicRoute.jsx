import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function PublicRoute({ children }) {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
