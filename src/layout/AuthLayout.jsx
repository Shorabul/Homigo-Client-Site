import React from 'react';
import { Link, Outlet, useNavigation } from 'react-router';

const AuthLayout = () => {
    const { state } = useNavigation();

    return (
        <div className='min-h-screen relative flex justify-center items-center'>
            {/* name and logo */}
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