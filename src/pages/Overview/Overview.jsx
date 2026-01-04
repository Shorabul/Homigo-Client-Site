import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { motion as Motion } from 'framer-motion';
import { FaServicestack, FaCalendarAlt, FaDollarSign, FaStar } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Overview = () => {
    const { user } = useContext(AuthContext);
    const [myServices, setMyServices] = useState([]);
    const [myBookings, setMyBookings] = useState([]);
    const [stats, setStats] = useState({
        totalServices: 0,
        totalBookings: 0,
        totalRevenue: 0,
        averageRating: 0,
    });
    const [loading, setLoading] = useState(true);

    // Fetch user's services and bookings
    useEffect(() => {
        if (!user?.email) return;

        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch user's services
                const servicesRes = await fetch(
                    `https://homigo-server-new.vercel.app/my-services?email=${user.email}`,
                    {
                        headers: {
                            authorization: `Bearer ${user.accessToken}`,
                        },
                    }
                );
                const servicesData = await servicesRes.json();
                setMyServices(servicesData);

                // Fetch user's bookings
                const bookingsRes = await fetch(
                    `https://homigo-server-new.vercel.app/my-bookings?email=${user.email}`,
                    {
                        headers: {
                            authorization: `Bearer ${user.accessToken}`,
                        },
                    }
                );
                const bookingsData = await bookingsRes.json();
                setMyBookings(bookingsData);

                // Calculate stats
                const totalRevenue = servicesData.reduce((sum, service) => {
                    const serviceBookings = bookingsData.filter(
                        (booking) => booking.serviceId === service._id
                    ).length;
                    return sum + serviceBookings * service.price;
                }, 0);

                const avgRating =
                    servicesData.reduce((sum, service) => sum + (service.averageRating || 0), 0) /
                    (servicesData.length || 1);

                setStats({
                    totalServices: servicesData.length,
                    totalBookings: bookingsData.length,
                    totalRevenue: totalRevenue,
                    averageRating: avgRating.toFixed(1),
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to load overview data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const StatCard = ({ icon: Icon, label, value, color }) => (
        <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-base-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-base-content/70 text-sm mb-1">{label}</p>
                    <p className="text-3xl font-bold text-base-content">{loading ? '...' : value}</p>
                </div>
                <div className={`${color} p-4 rounded-lg text-white text-2xl`}>
                    <Icon />
                </div>
            </div>
        </Motion.div>
    );

    return (
        <div className="space-y-8 container mx-auto">
            {/* Page Header */}
            <Motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-base-content">Dashboard Overview</h1>
                <p className="text-base-content/70 mt-2">Welcome back, {user?.displayName}!</p>
            </Motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={FaServicestack}
                    label="Total Services"
                    value={stats.totalServices}
                    color="bg-blue-500"
                />
                <StatCard
                    icon={FaCalendarAlt}
                    label="Total Bookings"
                    value={stats.totalBookings}
                    color="bg-green-500"
                />
                <StatCard
                    icon={FaDollarSign}
                    label="Total Revenue"
                    value={`$${stats.totalRevenue}`}
                    color="bg-yellow-500"
                />
                <StatCard
                    icon={FaStar}
                    label="Average Rating"
                    value={`${stats.averageRating}★`}
                    color="bg-purple-500"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Services vs Bookings Chart */}
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-base-200 rounded-xl p-6 shadow-md"
                >
                    <h3 className="text-lg font-bold text-base-content mb-4">Services vs Bookings</h3>
                    <div className="flex items-end justify-around gap-4 h-64">
                        {/* Services Bar */}
                        <div className="flex flex-col items-center flex-1">
                            <div className="w-full bg-blue-500 rounded-t" style={{ height: `${(stats.totalServices / Math.max(stats.totalServices, stats.totalBookings, 10)) * 100}%` }}></div>
                            <p className="text-sm font-semibold mt-2 text-base-content">{stats.totalServices}</p>
                            <p className="text-xs text-base-content/60">Services</p>
                        </div>
                        {/* Bookings Bar */}
                        <div className="flex flex-col items-center flex-1">
                            <div className="w-full bg-green-500 rounded-t" style={{ height: `${(stats.totalBookings / Math.max(stats.totalServices, stats.totalBookings, 10)) * 100}%` }}></div>
                            <p className="text-sm font-semibold mt-2 text-base-content">{stats.totalBookings}</p>
                            <p className="text-xs text-base-content/60">Bookings</p>
                        </div>
                    </div>
                </Motion.div>

                {/* Revenue Distribution */}
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-base-200 rounded-xl p-6 shadow-md"
                >
                    <h3 className="text-lg font-bold text-base-content mb-4">Revenue Distribution</h3>
                    <div className="space-y-4">
                        {myServices.slice(0, 5).map((service, idx) => {
                            const serviceRevenue = myBookings.filter(
                                (booking) => booking.serviceId === service._id
                            ).length * service.price;

                            const percentage =
                                stats.totalRevenue > 0
                                    ? (serviceRevenue / stats.totalRevenue) * 100
                                    : 0;

                            return (
                                <div key={idx}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-medium text-base-content line-clamp-1">
                                            {service.serviceName}
                                        </span>
                                        <span className="text-sm font-bold text-red-500">${serviceRevenue}</span>
                                    </div>
                                    <div className="h-2 bg-base-300 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-red-500 rounded-full transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                        {myServices.length === 0 && (
                            <p className="text-sm text-base-content/60">No services yet</p>
                        )}
                    </div>
                </Motion.div>
            </div>

            {/* My Services Table */}
            <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-base-200 rounded-xl p-6 shadow-md"
            >
                <h3 className="text-lg font-bold text-base-content mb-4">My Services</h3>
                <div className="overflow-x-auto">
                    {myServices.length > 0 ? (
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-base-300">
                                    <th className="text-base-content">Service Name</th>
                                    <th className="text-base-content">Price</th>
                                    <th className="text-base-content">Bookings</th>
                                    <th className="text-base-content">Revenue</th>
                                    <th className="text-base-content">Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myServices.map((service) => {
                                    const serviceBookings = myBookings.filter(
                                        (booking) => booking.serviceId === service._id
                                    );
                                    const revenue = serviceBookings.length * service.price;

                                    return (
                                        <tr key={service._id} className="hover:bg-base-300 transition-colors">
                                            <td className="font-medium text-base-content line-clamp-2">
                                                {service.serviceName}
                                            </td>
                                            <td className="font-semibold text-red-500">${service.price}</td>
                                            <td className="text-center">
                                                <span className="badge badge-sm">{serviceBookings.length}</span>
                                            </td>
                                            <td className="font-bold text-green-500">${revenue}</td>
                                            <td>
                                                <div className="flex items-center gap-1">
                                                    <FaStar className="text-yellow-500" size={14} />
                                                    <span className="text-sm">
                                                        {service.averageRating || 'N/A'}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-base-content/60">No services created yet</p>
                        </div>
                    )}
                </div>
            </Motion.div>

            {/* Recent Bookings Table */}
            <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-base-200 rounded-xl p-6 shadow-md"
            >
                <h3 className="text-lg font-bold text-base-content mb-4">Recent Bookings</h3>
                <div className="overflow-x-auto">
                    {myBookings.length > 0 ? (
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-base-300">
                                    <th className="text-base-content">Service ID</th>
                                    <th className="text-base-content">Price</th>
                                    <th className="text-base-content">Booking Date</th>
                                    <th className="text-base-content">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myBookings.slice(0, 10).map((booking) => (
                                    <tr key={booking._id} className="hover:bg-base-300 transition-colors">
                                        <td className="font-medium text-base-content text-sm">
                                            {booking.serviceId.substring(0, 8)}...
                                        </td>
                                        <td className="font-semibold text-green-500">${booking.price}</td>
                                        <td className="text-sm">
                                            {new Date(booking.bookingDate).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <span className="badge badge-success text-white">Booked</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-base-content/60">No bookings yet</p>
                        </div>
                    )}
                </div>
            </Motion.div>
        </div>
    );
};

export default Overview;