// import React from 'react';
// import { useContext } from 'react';
// import { useEffect } from 'react';
// import { AuthContext } from '../../contexts/AuthContext';
// import { useState } from 'react';
// import Swal from "sweetalert2";
// import MyBookingsRow from '../../components/MyBookingsRow/MyBookingsRow';
// // import toast from "react-hot-toast";

// const MyBookings = () => {
//     const { user } = useContext(AuthContext);
//     const [myBookings, setMyBookings] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (!user?.email) return;

//         fetch(`https://homigo-server-new.vercel.app/my-bookings?email=${user.email}`)
//             .then(res => res.json())
//             .then(bookings => {
//                 setMyBookings(bookings);
//                 setLoading(false);
//             });
//     }, [user]);

//     const handleDelete = (id) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 fetch(`https://homigo-server-new.vercel.app/bookings/${id}`, {
//                     method: "DELETE",
//                 })
//                     .then(res => res.json())
//                     .then(data => {
//                         if (data.deletedCount > 0) {
//                             Swal.fire({
//                                 title: "Deleted!",
//                                 text: "Your service has been deleted.",
//                                 icon: "success"
//                             });
//                             setMyBookings(myBookings.filter(myBookings => myBookings._id !== id));
//                         }
//                     })
//                     .catch(err => console.error("Error deleting service:", err));
//             }
//         });
//     };


//     if (loading) {
//         return <div> Please wait ... Loading...</div>
//     }

//     return (
//         <div className="overflow-x-auto">
//             <h1 className='text-center'>My Booking</h1>
//             <table className="table">

//                 <thead>
//                     <tr>
//                         <th>SL No.</th>
//                         <th>Service</th>
//                         <th>Booking Date</th>
//                         <th>Price</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>

//                     {
//                         myBookings.map((booking, index) => (
//                             <MyBookingsRow
//                                 key={booking._id}
//                                 index={index + 1}
//                                 booking={booking}
//                                 handleDelete={handleDelete}
//                             ></MyBookingsRow>
//                         ))
//                     }
//                 </tbody>

//                 <tfoot>
//                     <tr>
//                         <th>Total</th>
//                         <th>{myBookings.length}</th>
//                         <th></th>
//                         <th></th>
//                         <th></th>
//                     </tr>
//                 </tfoot>
//             </table>
//         </div>
//     );
// };

// export default MyBookings;

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
            confirmButtonColor: "#2563eb", // brand primary
            cancelButtonColor: "#d33",
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
                <span className="loading loading-spinner text-primary"></span>
                <p className="ml-3 text-primary font-medium">Loading bookings...</p>
            </div>
        );
    }

    return (
        <Motion.div
            className="overflow-x-auto max-w-5xl mx-auto mt-10 p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-center text-3xl font-bold text-primary mb-6">
                My Bookings
            </h1>
            <table className="table table-zebra w-full">
                <thead className="bg-primary text-white">
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
