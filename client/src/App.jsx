import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/publicRoute";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notification from "./pages/Notification";
import UserTable from "./pages/admin/User";
import Doctor from "./pages/admin/Doctor";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  console.log("Loading state:", loading);
  return (
    <>
      {/* routing */}
      <BrowserRouter>
        {loading ? (
          <Loader />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/apply-doctor"
              element={
                <ProtectedRoute>
                  <ApplyDoctor />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <Notification />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <UserTable />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/doctors"
              element={
                <ProtectedRoute>
                  <Doctor />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
