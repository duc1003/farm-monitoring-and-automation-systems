import { useContext } from "react";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";

import HomePage from "./pages/home/HomePage.jsx";

import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";

import "./style.scss";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar.jsx";

const Layout = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <div style={{ display: "flex" }}>
        <LeftSidebar />
        <div >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <HomePage /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
