import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "../pages/User/home/Home"
import { ProtectedRoute } from "../components"
import { Dashboard } from "../pages/Admin/dashboard/Dashboard"
import { NotFoundPage } from "../pages/NotFound/NotFound"
import { RoomDetails } from "../pages/User/room-details/RoomDetails"

const Routers = () => {
    const router = createBrowserRouter(
        [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/Dashboard',
                element:
                    <ProtectedRoute role="admin">
                        <Dashboard />
                    </ProtectedRoute>
            },
            {
                path: '/Room-Details/:roomname',
                element:
                    <ProtectedRoute role={"admin" || "user"}>
                        <RoomDetails />
                    </ProtectedRoute>,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ]
    )

    return <RouterProvider router={router} />
}

export default Routers