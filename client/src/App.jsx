import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <>
      {/* routing */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
