import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // If not logged in, redirected to login
    if (!token || !role) {
        return <Navigate to="/login" replace />;
    }

    // Check if user is admin (also converted to lower case)
    const isAdmin = role && role.toLowerCase() === "admin";

    // If not admin, redirect to home
    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default AdminRoute;
