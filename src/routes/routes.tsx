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
import UserManagement from "../pages/UserManagement";
import HotelManagement from "../pages/HotelManagement";
import RoomManagement from "../pages/RoomManagement";
import ServiceManagement from "../pages/ServiceManagement";
import InvoiceManagement from "../pages/InvoiceManagement";
import LogManagement from "../pages/LogManagement";
import ScheduleManagement from "../pages/ScheduleManagement";
import { requireAuth } from "../ultils/authUltils";
import NotFoundPage from "../pages/NotFoundPage";

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
        loader: requireAuth,
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
        loader: requireAuth,
      },
      {
        path: "users",
        id: "userManagement",
        element: <UserManagement />,
        loader: requireAuth,
      },
      {
        path: "hotels",
        element: <HotelManagement />,
        loader: requireAuth,
      },
      {
        path: "rooms",
        element: <RoomManagement />,
        loader: requireAuth,
      },
      {
        path: "services",
        element: <ServiceManagement />,
        loader: requireAuth,
      },
      {
        path: "invoices",
        element: <InvoiceManagement />,
        loader: requireAuth,
      },
      {
        path: "schedule",
        element: <ScheduleManagement />,
        loader: requireAuth,
      },
      {
        path: "logs",
        element: <LogManagement />,
        loader: requireAuth,
      },
    ],
  },
  {
    id: "not-found",
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default routes;
