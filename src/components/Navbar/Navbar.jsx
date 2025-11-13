import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { TbLogout } from "react-icons/tb";
import ThemeToggle from "../ThemToggle/ThemeToggle";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
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
        <div className="flex flex-col gap-4 md:hidden">
            <NavLink to='/' className="hover:text-primary transition-colors">Home</NavLink>
            <NavLink to='/services' className="hover:text-primary transition-colors">Services</NavLink>
            {user && <>
                <NavLink to='/profile' className="hover:text-primary transition-colors">Profile</NavLink>
                <NavLink to='/add-service' className="hover:text-primary transition-colors">Add Service</NavLink>
                <NavLink to='/user/services' className="hover:text-primary transition-colors">My Services</NavLink>
                <NavLink to='/user/bookings' className="hover:text-primary transition-colors">My Bookings</NavLink>
            </>}
        </div>
        <div className="hidden md:flex items-center gap-6 text-secondary-content font-medium">
            <NavLink to='/' className="hover:text-primary transition-colors">Home</NavLink>
            <NavLink to='/services' className="hover:text-primary transition-colors">Services</NavLink>

            {user && (
                <div className="relative">
                    <button
                        onClick={handledashboardToggle}
                        className="cursor-pointer hover:text-primary transition-colors flex items-center"
                    >
                        Dashboard {dashboardToggle ? <RxCaretUp /> : <RxCaretDown />}
                    </button>

                    {dashboardToggle && (
                        <ul className="absolute right-0 mt-2 menu p-2 shadow bg-base-100 rounded-box w-52 z-50">
                            <li><NavLink to='/profile'>Profile</NavLink></li>
                            <li><NavLink to='/add-service'>Add Service</NavLink></li>
                            <li><NavLink to='/user/services'>My Services</NavLink></li>
                            <li><NavLink to='/user/bookings'>My Bookings</NavLink></li>
                        </ul>
                    )}
                </div>
            )}

        </div>


    </>



    return (
        <header className="w-full shadow-md transition-all duration-500 ease-in-out">
            {/* Top bar */}
            <div className="bg-primary text-primary-content text-sm py-2 text-white">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <p className="font-medium">Welcome to Our Homigo</p>
                    <div className="flex items-center gap-3 text-white">
                        <span className="hidden sm:inline">Follow Us On:</span>
                        <FaLinkedinIn className="hover:text-secondary transition-colors hover:scale-110" />
                        <FaTwitter className="hover:text-secondary transition-colors hover:scale-110" />
                        <FaYoutube className="hover:text-secondary transition-colors hover:scale-110" />
                        <FaFacebookF className="hover:text-secondary transition-colors hover:scale-110" />
                    </div>
                </div>
            </div>

            {/* Main navbar */}
            <nav className="bg-base-100 dark:bg-base-200 transition-colors duration-500">
                <div className="container mx-auto flex justify-between items-center px-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="https://i.ibb.co/Y4pSn57k/Homigo-logo.png"
                            alt="Homigo Logo"
                            className="w-24 h-24"
                        />
                        <h2 className="text-lg font-bold text-secondary-content dark:text-white">
                            Homigo
                        </h2>
                    </Link>

                    {/* Links */}
                    <div className="hidden md:flex items-center gap-6 text-secondary-content font-medium">
                        {links}
                    </div>

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div
                                onClick={handleProfileToggle}
                                className="cursor-pointer hover:scale-105 transition-transform"
                            >
                                <img
                                    src={user?.photoURL || "https://i.ibb.co/kgVb18wv/user-icon.jpg"}
                                    alt={user?.displayName}
                                    className="w-10 h-10 rounded-full border-2 border-primary shadow-md"
                                />
                            </div>
                        ) : (
                            <Link
                                to="/auth/login"
                                className="px-5 py-2 rounded-full font-semibold text-white bg-primary hover:bg-error transition-all duration-500 shadow-md"
                            >
                                Login
                            </Link>
                        )}
                        <ThemeToggle />
                    </div>

                    {/* Profile dropdown */}
                    {profileToggle && user && (
                        <div className="text-sm w-64 p-3 bg-base-100 dark:bg-base-200 border border-gray-300 text-base-content rounded-md font-medium absolute top-26 right-4 shadow-lg z-10">
                            <ul className="flex flex-col gap-2">
                                <li className="font-semibold">{user?.displayName}</li>
                                <li className="text-xs opacity-80">{user?.email}</li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left text-error hover:text-error-content transition-colors"
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
                            className="h-7 w-7 cursor-pointer text-secondary-content hover:text-primary transition-colors"
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
                        <div className="absolute right-0 top-9 w-full py-20 bg-base-100 dark:bg-base-200 text-base flex flex-col md:hidden font-medium bg- text-primary-content z-50 justify-center items-center shadow-lg">
                            <button
                                className="absolute top-6 left-4 text-primary hover:text-error transition-colors"
                                onClick={handleMenuToggle}
                            >
                                ✕
                            </button>
                            <div className="flex flex-col items-center text-center justify-center gap-4">
                                {links}
                                {user ? (
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 rounded-md bg-primary text-white hover:bg-error-content transition-colors"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <Link
                                        to="/auth/login"
                                        className="px-4 py-2 rounded-md bg-primary text-primary hover:bg-error transition-colors"
                                    >
                                        Login
                                    </Link>
                                )}
                                <ThemeToggle />
                            </div>
                        </div>

                    )}

                    {/* {dashboardToggle && <ul tabIndex={0} className="absolute top-21 z-10 right-43 dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><NavLink to='/profile'>Profile</NavLink></li>
                        <li><NavLink to='/add-service'>Add Service</NavLink></li>
                        <li><NavLink to='/user/services'>My Services</NavLink></li>
                        <li><NavLink to='/user/bookings'>My Bookings</NavLink></li>
                    </ul>} */}

                </div>
            </nav>
        </header>
    );
};

export default Navbar;