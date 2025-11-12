import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import PageLoader from '../pages/PageLoader/PageLoader';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    console.log(location);
    if (loading) {
        return <PageLoader></PageLoader>;
    } else if (user) {
        return children;
    } else {
        // return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }
};

export default PrivateRoute;