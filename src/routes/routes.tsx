import { createBrowserRouter, RouteObject } from "react-router-dom";
import Login from "../pages/Login";
import LandingPage from "../pages/LandingPage";
import Dashboard from "../pages/Dashboard";
import HotelRooms from "../pages/HotelRooms";

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
    id: "hotel-rooms",
    path: "/hotels/:hotelId/rooms",
    element: <LandingPage />,
    children: [
      {
        index: true,
        id: "",
        element: <HotelRooms />,
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
