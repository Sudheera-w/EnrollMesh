import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
    const token = localStorage.getItem("token");

    // If user is already logged in, redirect to home
    if (token) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default PublicRoute;
