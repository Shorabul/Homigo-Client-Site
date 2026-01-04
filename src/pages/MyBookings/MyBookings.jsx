import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import MyBookingsRow from "../../components/MyBookingsRow/MyBookingsRow";
import { motion as Motion } from "framer-motion";

const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const [myBookings, setMyBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`https://homigo-server-new.vercel.app/my-bookings?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.
                    accessToken}`
            }
        })
            .then((res) => res.json())
            .then((bookings) => {
                setMyBookings(bookings);
                setLoading(false);
            });
    }, [user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ee3131",
            cancelButtonColor: "#666666",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://homigo-server-new.vercel.app/bookings/${id}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${user.
                            accessToken}`
                    }
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your booking has been deleted.",
                                icon: "success",
                            });
                            setMyBookings(myBookings.filter((b) => b._id !== id));
                        }
                    })
                    .catch((err) => console.error("Error deleting booking:", err));
            }
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">

                <span className="loading loading-spinner text-red-500"></span>

                <p className="ml-3 text-red-500 font-medium">Loading bookings...</p>
            </div>
        );
    }

    return (
        <Motion.div
            className="overflow-x-auto container mx-auto p-6 rounded-xl shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-3xl font-bold text-red-500 mb-6">
                My Bookings
            </h1>
            <table className="table table-zebra w-full">
                <thead className="brand-color-bg text-white">
                    <tr>
                        <th>SL No.</th>
                        <th>Service</th>
                        <th>Booking Date</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {myBookings.map((booking, index) => (
                        <MyBookingsRow
                            key={booking._id}
                            index={index + 1}
                            booking={booking}
                            handleDelete={handleDelete}
                        />
                    ))}
                </tbody>
                <tfoot className="">
                    <tr>
                        <th>Total</th>
                        <th>{myBookings.length}</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </Motion.div>
    );
};

export default MyBookings;
