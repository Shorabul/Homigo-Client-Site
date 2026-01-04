import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "../ThemToggle/ThemeToggle";
import { FaFacebookF, FaLinkedinIn, FaSignOutAlt, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { toast } from 'react-hot-toast';
import { motion as Motion } from "framer-motion";

const Navbar = () => {
    const [menutoggle, setMenuToggle] = useState(false);
    const [profileToggle, setProfileToggle] = useState(false);
    const { user, signOutUser } = useContext(AuthContext);

    const [hideTopBar, setHideTopBar] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide top bar when scrolling down
            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                setHideTopBar(true);
            } else {
                setHideTopBar(false);
            }

            // Make navbar sticky after scrolling a bit
            if (currentScrollY > 50) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const handleLogout = () => {
        signOutUser()
            .then(() => {
                toast.success("You logged out successfully");
                setProfileToggle(false);
            })
            .catch((error) => console.log(error));
    };

    const closeAllMenus = () => {
        setMenuToggle(false);
        setProfileToggle(false);

    };

    const handleMenuToggle = () => {
        setProfileToggle(false);

        setMenuToggle(!menutoggle);
    };

    const handleProfileToggle = () => {
        setMenuToggle(false);

        setProfileToggle(!profileToggle);
    };


    const links = <>
        <div className="flex flex-col gap-4 md:hidden">
            <NavLink to='/' onClick={closeAllMenus} className="hover:text-red-500 transition-colors">Home</NavLink>
            <NavLink to='/services' onClick={closeAllMenus} className="hover:text-red-500 transition-colors">Services</NavLink>
            <NavLink to='/about' onClick={closeAllMenus} className="hover:text-red-500 transition-colors">About</NavLink>
            <NavLink to='/blogs' onClick={closeAllMenus} className="hover:text-red-500 transition-colors">Blogs</NavLink>
            <NavLink to='/contact-us' onClick={closeAllMenus} className="hover:text-red-500 transition-colors">Contact-Us</NavLink>
            {user && <>
                <NavLink to='/dashboard/overview' onClick={closeAllMenus} className="hover:text-red-500 transition-colors">Dashboard</NavLink>
            </>}
        </div>
        <div className="hidden md:flex items-center gap-6 text-base-content">
            <NavLink to='/' className="cursor-pointer hover:text-red-500 transition-colors">Home</NavLink>
            <NavLink to='/services' className="cursor-pointer hover:text-red-500 transition-colors">Services</NavLink>
            <NavLink to='/about' className="cursor-pointer hover:text-red-500 transition-colors">About</NavLink>
            <NavLink to='/blogs' className="cursor-pointer hover:text-red-500 transition-colors">Blogs</NavLink>
            <NavLink to='/contact-us' className="cursor-pointer hover:text-red-500 transition-colors">Contact-Us</NavLink>

            {user && (
                <NavLink to='/dashboard/overview' className="hover:text-red-500">Dashboard</NavLink>
            )}
        </div>
    </>

    return (
        <header className={`w-full shadow-sm transition-all duration-300 ${isSticky ? "fixed top-0 left-0 z-50 bg-base-100" : "relative"} `}>
            {/* Top bar */}
            <div className={`text-sm py-2 w-full text-white brand-color-bg transition-all duration-500 ${hideTopBar ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"} `}>
                <div className="container mx-auto flex justify-between items-center px-4">
                    <p className="font-medium text-sm md:text-base">Welcome to Our Homigo</p>
                    <div className="flex items-center gap-3">
                        <span className="hidden sm:inline text-xs md:text-sm">Follow Us On:</span>
                        <a href="#" className="cursor-pointer hover:text-base-content transition-all hover:scale-110"><FaLinkedinIn /></a>
                        <a href="#" className="cursor-pointer hover:text-base-content transition-all hover:scale-110"><FaXTwitter /></a>
                        <a href="#" className="cursor-pointer hover:text-base-content transition-all hover:scale-110"><FaYoutube /></a>
                        <a href="#" className="cursor-pointer hover:text-base-content transition-all hover:scale-110"><FaFacebookF /></a>
                    </div>
                </div>
            </div>

            {/* Main navbar */}
            <nav className="container mx-auto transition-colors duration-500 px-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                        <Motion.img
                            whileHover={{ scale: 1.05 }}
                            src="https://i.ibb.co/Y4pSn57k/Homigo-logo.png"
                            alt="Homigo Logo"
                            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
                        />
                    </Link>

                    {/* Links */}
                    <div className="hidden md:flex items-center gap-2">
                        {links}
                    </div>

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-2">
                        <div className="bg-red-500 p-1.5 rounded-lg hover:bg-red-600 transition-colors">
                            <ThemeToggle />
                        </div>
                        {user ? (
                            <Motion.div
                                onClick={handleProfileToggle}
                                className="cursor-pointer"
                                whileHover={{ scale: 1.1 }}
                            >
                                <img
                                    src={user?.photoURL || "https://i.ibb.co/kgVb18wv/user-icon.jpg"}
                                    alt={user?.displayName}
                                    className="w-10 h-10 rounded-full border-2 border-red-500 shadow-md object-cover"
                                />
                            </Motion.div>
                        ) : (
                            <Link
                                to="/auth/login"
                                className="py-2 px-4 lg:px-5 lg:py-3 rounded-lg font-semibold text-white brand-color-bg hover:shadow-lg transition-all duration-500 text-sm md:text-base"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Profile dropdown */}
                    {profileToggle && user && (
                        <Motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-base-300 text-sm sm:text-base w-64 p-4 rounded-lg absolute top-32 md:top-28 right-4 shadow-lg z-50 text-base-content"
                        >
                            <ul className="flex flex-col gap-3 items-start">
                                <li className="font-semibold text-base">{user?.displayName}</li>
                                <li className="text-xs opacity-70">{user?.email}</li>
                                <hr className="w-full opacity-30" />
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center hover:text-red-500 transition-colors text-sm"
                                    >
                                        <FaSignOutAlt className="mr-2" /> Logout
                                    </button>
                                </li>
                            </ul>
                        </Motion.div>
                    )}

                    {/* Mobile Menu Icon */}
                    <div className="block md:hidden">
                        <button onClick={handleMenuToggle} className="p-2 hover:bg-base-200 rounded-lg transition-colors">
                            {menutoggle ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>

                    {/* Mobile menu */}
                    {menutoggle && (
                        <Motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            className="bg-base-300 absolute right-0 top-full w-full py-16 flex flex-col md:hidden font-medium z-40 shadow-lg"
                        >
                            <button
                                className="absolute top-4 right-4 transition-colors"
                                onClick={handleMenuToggle}
                            >
                                <FiX size={24} />
                            </button>
                            <div className="flex flex-col items-start gap-4 px-6">
                                {links}
                                <hr className="w-full opacity-30 my-2" />
                                <div className="mt-2">
                                    <ThemeToggle />
                                </div>
                                {user ? (
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center hover:text-red-500 transition-colors delay-100"
                                    >
                                        <FaSignOutAlt className="mr-2" /> Logout
                                    </button>
                                ) : (
                                    <Link
                                        to="/auth/login"
                                        onClick={closeAllMenus}
                                        className="hover:text-red-500 transition-colors"
                                    >
                                        Login
                                    </Link>
                                )}

                            </div>
                        </Motion.div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;