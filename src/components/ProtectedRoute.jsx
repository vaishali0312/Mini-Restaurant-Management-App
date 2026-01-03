import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate,Outlet } from "react-router-dom";

export default function ProtectedRoute({  allowedRole }) {
    const { user } = useContext(AuthContext);
    if (!user) {
        return <Navigate to="/login" replace />;
    }if (allowedRole && user.role !== allowedRole) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}