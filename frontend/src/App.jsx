import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import BlogsPage from "./pages/BlogsPage";
import BlogPage from "./pages/BlogPage";
import CategoriesPage from "./pages/CategoriesPage";

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
    path: "/blogs",
    element: <BlogsPage />,
  },
  {
    path: "/blog/:blogId",
    element: <BlogPage />,
  },
  {
    path: "/categories",
    element: <CategoriesPage />,
  },
];
const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
