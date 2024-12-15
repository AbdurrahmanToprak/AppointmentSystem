import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import the AuthContext

const PrivateRoute = ({ children }) => {
    const { authData } = useContext(AuthContext); // Access the authentication data

    if (!authData?.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
