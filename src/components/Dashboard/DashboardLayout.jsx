import React, { useState, useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { FaHome, FaServicestack, FaPlus, FaCalendarAlt, FaUser, FaChartBar, FaUsers } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const DashboardLayout = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const handleLogout = () => {
        signOutUser()
            .then(() => toast.success("Logged out successfully"))
            .catch(err => toast.error("Logout failed", err));
    };

    const userMenuItems = [
        { path: '/dashboard', icon: FaHome, label: 'Dashboard Home' },
        { path: '/dashboard/my-services', icon: FaServicestack, label: 'My Services' },
        { path: '/dashboard/add-service', icon: FaPlus, label: 'Add Service' },
        { path: '/dashboard/my-bookings', icon: FaCalendarAlt, label: 'My Bookings' },
        { path: '/dashboard/profile', icon: FaUser, label: 'Profile' },
    ];

    const adminMenuItems = [
        { path: '/admin/dashboard', icon: FaHome, label: 'Admin Dashboard' },
        { path: '/admin/users', icon: FaUsers, label: 'Manage Users' },
        { path: '/admin/services', icon: FaServicestack, label: 'Manage Services' },
        { path: '/admin/bookings', icon: FaCalendarAlt, label: 'All Bookings' },
        { path: '/admin/reports', icon: FaChartBar, label: 'Reports' },
    ];

    const menuItems = user?.role === 'admin' ? adminMenuItems : userMenuItems;

    return (
        <div className="flex min-h-screen bg-base-100">
            {/* Sidebar */}
            <aside className={`fixed lg:static w-64 bg-base-200 shadow-lg transition-transform duration-300 ease-in-out z-40 h-screen overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}>
                <div className="p-6 border-b border-base-300 sticky top-0 bg-base-200">
                    <div className="flex items-center gap-3 mb-4">
                        <img
                            src={user?.photoURL || 'https://i.ibb.co/kgVb18wv/user-icon.jpg'}
                            alt="User"
                            className="w-12 h-12 rounded-full border-2 border-red-500"
                        />
                        <div className="flex-grow">
                            <p className="font-bold text-sm">{user?.displayName}</p>
                            <p className="text-xs text-base-content/60 capitalize">{user?.role || 'User'}</p>
                        </div>
                    </div>
                </div>

                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-red-500 text-white'
                                        : 'text-base-content hover:bg-base-300'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-6 left-4 right-4">
                    <button
                        onClick={handleLogout}
                        className="btn btn-outline btn-error w-full flex items-center gap-2"
                    >
                        <FiLogOut /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Bar */}
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

                {/* Content */}
                <main className="flex-1 p-4 md:p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>

            {/* Overlay */}
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