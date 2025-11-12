import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import HotelRooms from "../pages/HotelRooms";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

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
      {
        path: "/hotels/:hotelId/rooms",
        id: "hotel-rooms",
        element: <HotelRooms />,
      },
    ],
  },
  {
    id: "login",
    path: "/login",
    element: <Login />,
  },
  {
    id: "register",
    path: "/register",
    element: <SignUp />,
  },
  // todo: add NotFound Page
  // {
  //   id: "not-found",
  //   path: "*",
  //   element: <NotFound />,
  // },
]);

export default routes;
