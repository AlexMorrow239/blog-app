import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import BlogsPage from "./pages/Blogs";
import BlogPage from "./pages/Blog";
import CategoryPage from "./pages/Categories";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";

const routes = [
  {
    path: "",
    element: <HomePage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/blogs/:categoryId?",
    element: <BlogsPage />,
  },
  {
    path: "/blog/:blogId",
    element: <BlogPage />,
  },
  {
    path: "/categories",
    element: <CategoryPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/profile/:authorId",
    element: <ProfilePage />,
  },
];
const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
