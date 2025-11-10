import React from 'react';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import { useState } from 'react';
import { TbLogout } from "react-icons/tb";

const Navbar = () => {
    const [menutoggle, setMenuToggle] = useState(false);
    const [profileToggle, setProfileToggle] = useState(false);
    const { user, signOutUser } = useContext(AuthContext);
    const links = <>
        <NavLink to='/' className="flex justify-center items-center gap-1">Home</NavLink>
        <NavLink to='/services' className="flex justify-center items-center gap-1">Services</NavLink>
        {user && <>
            <NavLink to='/profile' className="flex justify-center items-center gap-1">Profile</NavLink>
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
        setToggle(!toggle);
    }
    const handleProfileToggle = () => {
        if (menutoggle) {
            setMenuToggle(false);
        }
        setProfileToggle(!profileToggle);
        // setProfileToggle(prev => !prev);
        // setTimeout(() => setProfileToggle((prev) => !prev), 0);
    }

    const ref = React.useRef(null)

    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(ref.current.scrollTop > 10);
        };
        ref.current.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div ref={ref} className="relative">
            <nav className={`fixed top-0 left-0 bg-white w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50`}>

                {/* Logo */}
                <NavLink to='/'>
                    <img className='w-10 h-10 rounded-lg' src="https://i.ibb.co/5h8s3J5M/homigo-logo.png" alt="" />
                </NavLink>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8">
                    {links}
                </div>

                {/* Desktop Right */}
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
                            <Link to='/auth/login' className={`px-8 py-2.5 rounded-full ml-4`}>
                                Login
                            </Link>
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

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-3 md:hidden">
                    <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                </div>

                {/* Mobile Menu */}
                <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800`}>
                    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {links}

                    <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
                        New Launch
                    </button>

                    <button className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
                        Login
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;