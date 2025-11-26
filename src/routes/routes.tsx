import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import HotelRooms from "../pages/HotelRooms";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import SignUp from "../pages/SignUp";
import UserInvoice from "../pages/UserInvoice";
import AdminPage from "../pages/AdminPage";
import AdminDashboard from "../pages/AdminDashboard";

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
      {
        id: "userInvoice",
        path: "/user-invoice",
        element: <UserInvoice />,
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
  {
    id: "forgetPassword",
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    id: "admin",
    path: "/admin",
    element: <AdminPage />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
    ],
  },
  // todo: add NotFound Page
  // {
  //   id: "not-found",
  //   path: "*",
  //   element: <NotFound />,
  // },
]);

export default routes;
