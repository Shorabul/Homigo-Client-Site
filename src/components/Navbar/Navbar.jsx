import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { TbLogout } from "react-icons/tb";
import ThemeToggle from "../ThemToggle/ThemeToggle";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { toast } from 'react-hot-toast';

const Navbar = () => {
    const [menutoggle, setMenuToggle] = useState(false);
    const [profileToggle, setProfileToggle] = useState(false);
    const [dashboardToggle, setDashboardToggle] = useState(false);
    const { user, signOutUser } = useContext(AuthContext);

    const handleLogout = () => {
        signOutUser()
            .then(() => toast.success("You logged out successfully"))
            .catch((error) => console.log(error));
    };

    const handleMenuToggle = () => {
        if (profileToggle) setProfileToggle(false);
        if (dashboardToggle) setDashboardToggle(false);
        setMenuToggle(!menutoggle);
    };

    const handleProfileToggle = () => {
        if (menutoggle) setMenuToggle(false);
        if (dashboardToggle) setDashboardToggle(false);
        setProfileToggle(!profileToggle);
    };
    const handledashboardToggle = () => {
        if (profileToggle) setProfileToggle(false);
        if (menutoggle) setMenuToggle(false);
        setDashboardToggle(!dashboardToggle);
    };

    const links = <>
        <div className="flex flex-col gap-4 md:hidden transition-color">
            <NavLink to='/' className="hover:text-red-500 ">Home</NavLink>
            <NavLink to='/services' className="hover:text-red-500 ">Services</NavLink>
            {user && <>
                <NavLink to='/profile' className=" hover:text-red-500 ">Profile</NavLink>
                <NavLink to='/add-service' className=" hover:text-red-500 ">Add Service</NavLink>
                <NavLink to='/user/services' className=" hover:text-red-500 ">My Services</NavLink>
                <NavLink to='/user/bookings' className=" hover:text-red-500 ">My Bookings</NavLink>
            </>}
        </div>
        <div className="hidden md:flex items-center gap-6 text-base-content transition-colors">
            <NavLink to='/' className="cursor-pointer hover:text-red-500">Home</NavLink>
            <NavLink to='/services' className="cursor-pointer hover:text-red-500">Services</NavLink>

            {user && (
                <div className="relative">
                    <button
                        onClick={handledashboardToggle}
                        className="cursor-pointer hover:text-red-500 flex items-center"
                    >
                        Dashboard {dashboardToggle ? <RxCaretUp /> : <RxCaretDown />}
                    </button>

                    {dashboardToggle && (
                        <ul className="bg-base-300 absolute right-0 mt-2 menu p-2 shadow rounded-box w-52 z-50">
                            <li><NavLink to='/profile' className="hover:text-red-500 ">Profile</NavLink></li>
                            <li><NavLink to='/add-service' className="hover:text-red-500">Add Service</NavLink></li>
                            <li><NavLink to='/user/services' className="hover:text-red-500 ">My Services</NavLink></li>
                            <li><NavLink to='/user/bookings' className="hover:text-red-500 ">My Bookings</NavLink></li>
                        </ul>
                    )}
                </div>
            )}

        </div>


    </>



    return (
        <header className="w-full shadow-md transition-all duration-500 ease-in-out">
            {/* Top bar */}
            <div className="text-sm py-2 text-white brand-color-bg">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <p className="font-medium">Welcome to Our Homigo</p>
                    <div className="flex items-center gap-3">
                        <span className="hidden sm:inline">Follow Us On:</span>
                        <FaLinkedinIn className="cursor-pointer hover:text-base-content transition-colors hover:scale-110" />
                        <FaXTwitter className="cursor-pointer hover:text-base-content transition-colors hover:scale-110" />
                        <FaYoutube className="cursor-pointer hover:text-base-content transition-colors hover:scale-110" />
                        <FaFacebookF className="cursor-pointer hover:text-base-content transition-colors hover:scale-110" />
                    </div>
                </div>
            </div>

            {/* Main navbar */}
            <nav className="container mx-auto rounded-2xl transition-colors duration-500">
                <div className="flex justify-between items-center px-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="https://i.ibb.co/Y4pSn57k/Homigo-logo.png"
                            alt="Homigo Logo"
                            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
                        />

                    </Link>

                    {/* Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {links}
                    </div>

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="bg-red-400 p-2 lg:p-3 rounded-md flex items-center justify-center">

                            <ThemeToggle />
                        </div>
                        {user ? (
                            <div
                                onClick={handleProfileToggle}
                                className="cursor-pointer hover:scale-105 transition-transform"
                            >
                                <img
                                    src={user?.photoURL || "https://i.ibb.co/kgVb18wv/user-icon.jpg"}
                                    alt={user?.displayName}
                                    className="w-10 h-10 rounded-full border-2 border-[#ee3131] shadow-md"
                                />
                            </div>
                        ) : (
                            <Link
                                to="/auth/login"
                                className="py-2 px-4 lg:px-5 lg:py-3 rounded-md font-semibold text-white brand-color-bg  transition-all duration-500 shadow-md text-sm md:text-base"
                            >
                                Login
                            </Link>
                        )}

                    </div>

                    {/* Profile dropdown */}
                    {profileToggle && user && (
                        <div className="bg-base-300 text-sm sm:text-base md:text-lg w-64 p-3 rounded-md absolute top-26 right-4 shadow-lg z-10 text-base-content transition-colors">
                            <ul className="flex flex-col gap-2 items-start">
                                <li className="font-semibold">{user?.displayName}</li>
                                <li className="text-xs opacity-80">{user?.email}</li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center justify-center hover:text-red-500 "
                                    >
                                        <TbLogout className="inline mr-2" /> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}

                    {/* Mobile Menu Icon */}
                    <div className="block md:hidden">
                        <svg
                            onClick={handleMenuToggle}
                            className="h-7 w-7 cursor-pointer transition-colors"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <line x1="4" y1="6" x2="20" y2="6" />
                            <line x1="4" y1="12" x2="20" y2="12" />
                            <line x1="4" y1="18" x2="20" y2="18" />
                        </svg>
                    </div>

                    {/* Mobile menu */}
                    {menutoggle && (
                        <div className="bg-base-300 absolute right-0 top-9 w-full py-20 flex flex-col md:hidden font-medium  z-50 justify-center items-center shadow-lg transition-all duration-500 ">
                            <button
                                className="absolute top-6 left-4 transition-colors"
                                onClick={handleMenuToggle}
                            >
                                <IoClose size={24} />
                            </button>
                            <div className="flex flex-col items-start text-left justify-center gap-4">
                                {links}
                                {user ? (
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center justify-center hover:text-red-500 "
                                    >
                                        <TbLogout className="inline mr-2" /> <span>Logout</span>
                                    </button>
                                ) : (
                                    <Link
                                        to="/auth/login"
                                        className="flex items-center justify-center hover:text-red-500 "
                                    >
                                        Login
                                    </Link>
                                )}
                                <ThemeToggle />
                            </div>
                        </div>

                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;