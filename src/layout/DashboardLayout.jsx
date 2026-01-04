import React, { useContext } from 'react';
import { Outlet, Link, NavLink } from 'react-router';
import { motion as Motion } from "framer-motion";
import { AuthContext } from '../contexts/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaHome, FaServicestack, FaPlus, FaCalendarAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const DashboardLayout = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const handleLogout = () => {
        signOutUser()
            .then(() => {
                toast.success("Logged out successfully");
                setSidebarOpen(false);
            })
            .catch(err => toast.error("Logout failed", err));
    };

    const menuItems = [
        { path: '/dashboard/overview', icon: FaHome, label: 'Overview' },
        { path: '/dashboard/profile', icon: FaUser, label: 'Profile' },
        { path: '/dashboard/user/bookings', icon: FaCalendarAlt, label: 'My Bookings' },
        { path: '/dashboard/add-service', icon: FaPlus, label: 'Add Service' },
        { path: '/dashboard/user/services', icon: FaServicestack, label: 'My Services' },
    ];

    return (
        <div className="flex min-h-screen bg-base-100">
            {/* Sidebar */}
            <aside className={`fixed lg:static w-64 bg-base-200 shadow-lg transition-transform duration-300 ease-in-out z-40 h-screen overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}>
                {/* Logo Section */}
                <div className="p-6 border-b border-base-300 sticky top-0 bg-base-200">
                    <Link to="/" className="flex items-center gap-3">
                        <Motion.img
                            whileHover={{ scale: 1.05 }}
                            src="https://i.ibb.co/Y4pSn57k/Homigo-logo.png"
                            alt="Homigo Logo"
                            className="w-12 h-12"
                        />
                        <span className="font-bold text-lg hidden md:inline">Homigo</span>
                    </Link>
                </div>

                {/* User Profile Section */}
                <div className="p-4 border-b border-base-300">
                    <div className="flex items-center gap-3 mb-2">
                        <img
                            src={user?.photoURL || 'https://i.ibb.co/kgVb18wv/user-icon.jpg'}
                            alt="User"
                            className="w-10 h-10 rounded-full border-2 border-red-500 object-cover"
                        />
                        <div className="flex-grow min-w-0">
                            <p className="font-bold text-sm truncate">{user?.displayName || 'User'}</p>
                            <p className="text-xs text-base-content/60 truncate">{user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="p-4 space-y-2 flex-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-red-500 text-white'
                                    : 'text-base-content hover:bg-base-300'
                                    }`}
                            >
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                <span className="font-medium">{item.label}</span>
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-base-300">
                    <button
                        onClick={handleLogout}
                        className="btn btn-outline btn-error w-full flex items-center justify-center gap-2"
                    >
                        <FaSignOutAlt className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Navbar */}
                <header className="bg-base-200 shadow-md sticky top-0 z-30">
                    <div className="flex items-center justify-between p-4 md:p-6">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden btn btn-ghost btn-circle"
                        >
                            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <div className="w-10"></div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default DashboardLayout;