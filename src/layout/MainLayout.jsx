// import React from 'react';
// import { Outlet } from 'react-router';
// import Navbar from '../components/Navbar/Navbar';
// import Footer from '../components/Footer/Footer';

// const MainLayout = () => {
//     return (
//         <div className='flex flex-col h-screen w-full'>
//             <Navbar></Navbar>
//             <div className='flex-1'>
//                 <Outlet></Outlet>
//             </div>
//             <Footer></Footer>
//         </div>
//     );
// };
// export default MainLayout;

import React, { useEffect, useState } from 'react';
import { Outlet, useNavigation, useLocation } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import PageLoader from '../pages/PageLoader/PageLoader';

const MainLayout = () => {
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
        <div className="flex flex-col h-screen w-full">
            {(navigation.state === "loading" || showLoader) && <PageLoader />}
            <Navbar />
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
