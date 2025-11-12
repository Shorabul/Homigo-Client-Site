import React from 'react';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import { useState } from 'react';
import { TbLogout } from "react-icons/tb";
import ThemeToggle from '../ThemToggle/ThemeToggle';

const Navbar = () => {
    const [menutoggle, setMenuToggle] = useState(false);
    const [profileToggle, setProfileToggle] = useState(false);
    const { user, signOutUser } = useContext(AuthContext);
    const links = <>
        <NavLink to='/' className="flex bg-linear-to-r justify-center items-center gap-1">Home</NavLink>
        <NavLink to='/services' className="flex justify-center items-center gap-1">Services</NavLink>
        {user && <>
            <NavLink to='/profile' className="flex justify-center items-center gap-1">Profile</NavLink>
            <NavLink to='/add-service' className="flex justify-center items-center gap-1">Add Service</NavLink>
            <NavLink to='/user/services' className="flex justify-center items-center gap-1">My Services</NavLink>
            <NavLink to='/user/bookings' className="flex justify-center items-center gap-1">My Bookings</NavLink>
        </>}
    </>
    const handleLogout = () => {
        signOutUser()
            .then(() => {
                alert("You logged out successfully")
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleMenuToggle = () => {
        if (profileToggle) {
            setProfileToggle(false);
        }
        setMenuToggle(!menutoggle);
    }
    const handleProfileToggle = () => {
        if (menutoggle) {
            setMenuToggle(false);
        }
        setProfileToggle(!profileToggle);
        // setProfileToggle(prev => !prev);
        // setTimeout(() => setProfileToggle((prev) => !prev), 0);
    }





    return (
        <main className="relative container mx-auto">
            <nav className=' w-full flex items-center justify-between p-4'>
                <NavLink to='/'>
                    <img className='w-10 h-10' src="https://i.ibb.co/TqtQSf4Z/logo.webp" alt="" />
                </NavLink>
                <div className="hidden md:flex items-center gap-4 lg:gap-8">
                    {links}
                </div>
                {
                    user ? <div className="hidden md:flex"
                        onClick={handleProfileToggle}
                    >
                        <img
                            className="h-10 w-10 rounded-full"
                            src={`${user ? user.photoURL : 'https://i.ibb.co/kgVb18wv/user-icon.jpg'}`}
                            // src='https://i.ibb.co/SXC1MkJy/do.webp'
                            alt={user?.displayName} />
                    </div>
                        : <div className="hidden md:flex items-center gap-4">
                            <Link
                                to="/auth/login"
                                className="px-8 py-2.5 rounded-full ml-4 bg-gradient-to-r from-primary to-secondary"
                            >
                                Login
                            </Link>
                            <ThemeToggle />
                        </div>
                }
                <div className="flex items-center gap-3 md:hidden">
                    <svg
                        onClick={handleMenuToggle}
                        className={`h-6 w-6 cursor-pointer `}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24">
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                </div>
                {
                    profileToggle && user && <div className="text-sm w-64 p-3 bg-white border border-gray-500/30 text-gray-800/80 rounded-md font-medium absolute top-34 right-0 z-2000">
                        <ul className="flex flex-col gap-px">
                            <li className="flex items-center justify-between cursor-pointer">
                                <Link>{user?.displayName}</Link>
                            </li>
                            <li className="flex items-center justify-between cursor-pointer rounded">
                                <p className="-mr-px">{user?.email}</p>
                            </li>

                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="-mr-px">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                }

                {
                    menutoggle && (
                        <div
                            className='absolute right-0 top-0 w-[60%]
                    h-screen text-base flex flex-col md:hidden items-start gap-6 font-medium bg-gray-40 bg-yellow-600 z-1000'>
                            <button className="absolute top-6 left-4"
                                onClick={handleMenuToggle}
                            >
                                <svg className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>

                            <div className='mt-16 flex flex-col'>
                                {links}

                                {user ? <button
                                    onClick={handleLogout}
                                    className="-mr-px">
                                    Logout
                                </button> : <Link
                                    to="/auth/login"
                                    className="px-8 py-2.5 rounded-full ml-4 bg-gradient-to-r from-primary to-secondary"
                                >
                                    Login
                                </Link>}
                                <ThemeToggle />
                            </div>
                        </div>)
                }

            </nav>
        </main>
    );
}
export default Navbar;
{/* 
    <div className="relative container mx-auto">
            <nav className=' w-full flex items-center justify-between p-4'>


<NavLink to='/'>
    <img className='w-10 h-10 rounded-lg' src="https://i.ibb.co/5h8s3J5M/homigo-logo.png" alt="" />
</NavLink>


<div className="hidden md:flex items-center gap-4 lg:gap-8">
    {links}
</div>


{
    user ? <div className=""
        onClick={handleProfileToggle}
    >
        <img
            className="h-10 w-10 rounded-full"
            src={user?.photoURL}
            alt="" />
    </div>
        : <div className="hidden md:flex items-center gap-4">
            <Link
                to="/auth/login"
                className="px-8 py-2.5 rounded-full ml-4 bg-gradient-to-r from-primary to-secondary"
            >
                Login
            </Link>
            <ThemeToggle />
        </div>
}

{
    profileToggle && user && <div className="text-sm w-64 p-3 bg-white border border-gray-500/30 text-gray-800/80 rounded-md font-medium absolute top-34 right-0">
        <ul className="flex flex-col gap-px">
            <li className="flex items-center justify-between gap-3 bg-gray-500/20 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
                <Link>{user?.displayName}</Link>
            </li>
            <li className="flex items-center justify-between gap-2 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
                <p className="-mr-px">{user?.email}</p>
            </li>
            <div className="w-full h-px bg-gray-300/70 my-2"></div>

            <div className="w-full h-px bg-gray-300/50 my-2"></div>
            <li className="flex items-center justify-between gap-2 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
                <button
                    onClick={handleLogout}
                    className="-mr-px">
                    <TbLogout />
                    <span>Logout</span>
                </button>
            </li>
        </ul>
    </div>
}


<div className="flex items-center gap-3 md:hidden">
    <svg
        onClick={handleMenuToggle}
        className={`h-6 w-6 cursor-pointer `}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24">
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
</div>


{
    menutoggle && (
        <div
            className='absoluteright-0 top-0 w-[50vh]
                    h-screen text-base flex flex-col md:hidden items-start 
                    justify-center gap-6 font-medium text-gray-800'>
            <button className="absolute top-6 left-4"
                onClick={handleMenuToggle}
            >
                <svg className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            {links}

            <button
                className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
                Login
            </button>
        </div>)
}

            </nav >
        </div > */}