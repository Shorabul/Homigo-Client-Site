import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigation } from 'react-router';
import PageLoader from '../pages/PageLoader/PageLoader';

const AuthLayout = () => {
    const { state } = useNavigation();
    const navigation = useNavigation();
    const location = useLocation();
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        // Show loader briefly on every route change
        setShowLoader(true);
        const timer = setTimeout(() => setShowLoader(false), 500); // 0.5s splash
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <div className='min-h-screen relative flex justify-center items-center'>
            {/* name and logo */}
            {(navigation.state === "loading" || showLoader) && <PageLoader />}
            <div className="flex items-center gap-3 absolute top-5 left-5">
                <Link to='/'>
                    <img className='w-10 h-10 rounded-lg' src="https://i.ibb.co/5h8s3J5M/homigo-logo.png" alt="" />
                </Link>
            </div>
            {state === "loading" ? <p>loging</p> : <Outlet></Outlet>}
        </div>
    );
};

export default AuthLayout;