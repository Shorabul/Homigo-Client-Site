import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigation } from 'react-router';
import PageLoader from '../pages/PageLoader/PageLoader';

const AuthLayout = () => {
    const { state } = useNavigation();
    const navigation = useNavigation();
    const location = useLocation();
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        setShowLoader(true);
        const timer = setTimeout(() => setShowLoader(false), 500);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <div className='min-h-screen relative flex justify-center items-center'>
            {/* name and logo */}
            {(navigation.state === "loading" || showLoader) && <PageLoader />}
            <div className="flex items-center gap-3 absolute top-5 left-5">
                <Link to='/'>
                    <img className='w-20 h-20 rounded-lg' src="https://i.ibb.co/Y4pSn57k/Homigo-logo.png" alt="Homigo Logo"
                    />
                </Link>
            </div>
            {state === "loading" ? <p>loging</p> : <Outlet></Outlet>}
        </div>
    );
};

export default AuthLayout;