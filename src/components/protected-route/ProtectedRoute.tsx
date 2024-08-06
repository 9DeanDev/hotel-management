import { Navigate } from "react-router";
import { IProtectedRoute } from "./ProtectedRoute.model";

export const ProtectedRoute = ({ children, role }: IProtectedRoute) => {
    const user = JSON.parse(localStorage.getItem('user') as string)

    if (!user || user.role !== role) {
        return <Navigate to='/' />
    }

    return children
}