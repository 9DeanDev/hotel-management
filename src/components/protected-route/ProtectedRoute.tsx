import { Navigate } from "react-router";
import { IProtectedRoute } from "./ProtectedRoute.model";

export const ProtectedRoute = ({ children, role }: IProtectedRoute) => {
    const roleUser = localStorage.getItem('role');

    // Kiểm tra nếu role là một mảng chứa nhiều vai trò
    if (!roleUser || (Array.isArray(role) ? !role.includes(roleUser) : roleUser !== role)) {
        return <Navigate to='/' />
    }

    return children;
};
