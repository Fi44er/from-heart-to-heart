import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../../page/home/home";
import News from "../../page/news/news.jsx";
import NewsDynamicPage from "../../page/news/newsDynamicPage.jsx";
import Admin from "../../page/Admin/Admin.jsx";
import Auth from "../../page/Admin/auth/Auth.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx"; // Импортируйте ErrorBoundary
import CreateNews from "../../page/Admin/components/CreateNews/CreateNews.jsx";
import { Navigate } from "react-router-dom";
import UpdateNews from "../../page/Admin/components/UpdateNews/UpdateNews.jsx";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/news",
    element: <News />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/news/:id",
    element: <NewsDynamicPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/Admin",
    element: (
      <PrivateRoute>
        <Admin />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/create-news",
    element: (
      <PrivateRoute>
        <CreateNews />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/create-news/:id",
    element: (
      <PrivateRoute>
        <UpdateNews />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "*",
    element: <ErrorBoundary />,
  },
]);
