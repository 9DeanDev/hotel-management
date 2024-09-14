import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/User/home/Home";
import { ProtectedRoute } from "../components";
import { Dashboard } from "../pages/Admin/dashboard/Dashboard";
import { NotFoundPage } from "../pages/NotFound/NotFound";
import { RoomDetails } from "../pages/rooms/room-details/RoomDetails";
import { Rooms } from "../pages/rooms/Rooms";
import { ContactUs } from "../pages/ContactUs/ContactUs";
import { Service } from "../pages/Services/Services";

const Routers = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/Rooms",
      element: (
          <Rooms />
      ),
       children: [
            {
      path: ":roomname",
      element: (
          <RoomDetails />
      ),
    },
       ]
    },
    {
      path: "/Room/:roomname",
      element: (     
        <RoomDetails />
      ),
    },
    {
      path: "/Service",
      element: (
        <Service />
      ),
    },
    {
      path: "/ContactUs",
      element: (
        <ContactUs />
      ),
    },
    {
      path: "/Dashboard",
      element: (
        <ProtectedRoute role={["admin"]}>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routers;
