import { Navigate } from "react-router";
import { IProtectedRoute } from "./ProtectedRoute.model";

export const ProtectedRoute = ({ children, role }: IProtectedRoute) => {
    const roleUser = localStorage.getItem('role')

    if (!roleUser || roleUser !== role) {
        return <Navigate to='/' />
    }

    return children
}