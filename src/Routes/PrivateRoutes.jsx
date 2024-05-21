import { children, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router"


const PrivateRoutes = () => {
    const location = useLocation()

    const { user, loading } = useContext(AuthContext);
    if (loading) { return <span className="loading loading-spinner text-warning"></span> }
    if (user) { return children }
    return <Navigate to={'/login'} state={{ from: location }} />
};

export default PrivateRoutes;