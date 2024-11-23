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
import Contacts from "../../page/Contacts/Contacts.jsx";

const PrivateRoute = ({ children }) => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const token = getCookie("token"); // Проверяем наличие токена в куки

  if (!token) {
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
    path: "/contacts",
    element: <Contacts />,
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
