import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/User/home/Home";
import { ProtectedRoute } from "../components";
import { Dashboard } from "../pages/Admin/dashboard/Dashboard";
import { NotFoundPage } from "../pages/NotFound/NotFound";
import { RoomDetails } from "../pages/rooms/room-details/RoomDetails";
import { Rooms } from "../pages/rooms/Rooms";

const Routers = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/Dashboard",
      element: (
        <ProtectedRoute role="admin">
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/Rooms",
      element:(
        <ProtectedRoute role={"admin" || "user"}>
          <Rooms />
        </ProtectedRoute>
      ),
      // children: [
      //     {
      //         path: ':roomname',
      //         element:
      //             <ProtectedRoute role={"admin" || "user"}>
      //                 <RoomDetails />
      //             </ProtectedRoute>,
      //     }
      // ]
    },
    {
      path: "/roomImage/:roomname",
      element: (
        <ProtectedRoute role={"admin" || "user"}>
          <RoomDetails />
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
