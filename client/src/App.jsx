import { useContext } from "react";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";

import HomePage from "./pages/home/HomePage.jsx";

import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";

import "./App.scss";
import NavHeader from "./components/NavHeader/NavHeader.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar.jsx";
import ChartAnalysis from "./components/ChartAnalysis/ChartAnalysis.jsx";
import AIComponent from "./components/AI/AIComponent.jsx";
import { useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.jsx";

const Layout = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  if (!user) {
    navigate("/login");
  }

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      {/* <NavHeader /> */}
      <div className="content">
        <LeftSidebar />
        <Outlet />
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
      { path: "/home/dashboard", element: <AIComponent /> },
      { path: "/home/chart", element: <ChartAnalysis /> },
      { path: "/home/AI", element: <Dashboard /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
