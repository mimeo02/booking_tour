import { createBrowserRouter, RouteObject } from "react-router-dom";
import Login from "../pages/Login";
import LandingPage from "../pages/LandingPage";
import Dashboard from "../pages/Dashboard";

const routes = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <LandingPage />,
    children: [
      {
        index: true,
        id: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    id: "login",
    path: "/login",
    element: <Login />,
  },
  // todo: add NotFound Page
  // {
  //   id: "not-found",
  //   path: "*",
  //   element: <NotFound />,
  // },
]);

export default routes;
