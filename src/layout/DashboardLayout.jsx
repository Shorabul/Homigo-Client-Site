import React, { useContext, useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router';
import { motion as Motion } from "framer-motion";
import { AuthContext } from '../contexts/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaHome, FaServicestack, FaPlus, FaCalendarAlt, FaUser, FaSignOutAlt, FaBlogger } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import ThemeToggle from '../components/ThemToggle/ThemeToggle';

const DashboardLayout = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const [profileToggle, setProfileToggle] = useState(false);

    const handleLogout = () => {
        signOutUser()
            .then(() => {
                toast.success("Logged out successfully");
                setSidebarOpen(false);
            })
            .catch(err => toast.error("Logout failed", err));
    };
    const handleProfileToggle = () => {
        setProfileToggle(!profileToggle);
    };

    const menuItems = [
        { path: '/dashboard/overview', icon: FaHome, label: 'Overview' },
        { path: '/dashboard/profile', icon: FaUser, label: 'Profile' },
        { path: '/dashboard/user/bookings', icon: FaCalendarAlt, label: 'My Bookings' },
        { path: '/dashboard/add-service', icon: FaPlus, label: 'Add Service' },
        { path: '/dashboard/user/services', icon: FaServicestack, label: 'My Services' },
        { path: '/dashboard/create-blog', icon: FaBlogger, label: 'Create Blog' },
    ];

    return (
        <div className="flex flex-col lg:flex-row min-h-screen w-full bg-base-100">
            {/* Sidebar Overlay for Mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40 transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:sticky top-0 left-0 w-64 bg-base-200 shadow-xl transition-transform duration-300 ease-in-out z-50 h-screen overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}>
                {/* Logo Section */}
                <div className="p-6 border-b border-base-300 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <img src="https://i.ibb.co/Y4pSn57k/Homigo-logo.png" alt="Logo" className="w-10 h-10" />
                        <span className="font-bold text-xl tracking-tight text-red-500">Homigo</span>
                    </Link>
                    <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                        <FiX size={24} />
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-red-500 text-white shadow-md' : 'text-base-content hover:bg-base-300'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Logout - Pushed to bottom */}
                <div className="mt-auto p-4 border-t border-base-300">
                    <button onClick={handleLogout} className="btn border border-red-500 text-red-500 hover:bg-red-500 hover:text-white w-full gap-2">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Navbar */}
                <header className="bg-base-100/80 backdrop-blur-md border-b border-base-300 sticky top-0 z-30 h-16 flex items-center justify-between px-4 lg:px-8">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden btn btn-ghost btn-sm btn-square">
                            <FiMenu size={20} />
                        </button>
                        <h1 className="text-lg font-bold lg:text-xl truncate">Dashboard</h1>
                    </div>

                    <div className='flex items-center gap-3'>
                        <div className="bg-red-500 p-1 rounded-lg hover:bg-red-600 transition-colors">
                            <ThemeToggle />
                        </div>
                        <div className="relative">
                            <img
                                onClick={() => setProfileToggle(!profileToggle)}
                                src={user?.photoURL || "https://i.ibb.co/kgVb18wv/user-icon.jpg"}
                                className="w-9 h-9 rounded-full border-2 border-red-500 cursor-pointer object-cover"
                                alt="Profile"
                            />
                            {profileToggle && (
                                <div className="absolute right-0 mt-3 w-56 bg-base-200 rounded-2xl shadow-2xl p-4 border border-base-300">
                                    <p className="font-bold truncate text-sm">{user?.displayName}</p>
                                    <p className="text-xs opacity-60 truncate mb-3">{user?.email}</p>
                                    <button onClick={handleLogout} className="btn bg-red-500 text-white btn-outline w-full">Logout</button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Content Container */}
                <main className="p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
