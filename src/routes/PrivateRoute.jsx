import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    // console.log(location);
    if (loading) {
        return <p>Loading</p>;
    } else if (user) {
        return children;
    } else {
        return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
    }
};

export default PrivateRoute;