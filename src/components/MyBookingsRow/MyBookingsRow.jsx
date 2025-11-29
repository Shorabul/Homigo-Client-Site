// import React from 'react';
// import { useState } from 'react';
// import { useEffect } from 'react';

// const MyBookingsRow = ({ booking, index, handleDelete }) => {
//     const { _id,
//         userEmail,
//         serviceId,
//         bookingDate,
//         price,
//     } = booking;
//     const [service, setService] = useState(null);
//     useEffect(() => {
//         fetch(`https://homigo-server-new.vercel.app/services/${serviceId}`)
//             .then(res => res.json())
//             .then(data => setService(data))
//             .catch(err => console.error("Error loading service details:", err));
//     }, [serviceId]);
//     return (
//         <tr>
//             <th>{index}</th>
//             <td>
//                 <div className="flex items-center gap-3">
//                     <div className="avatar">
//                         <div className="mask mask-squircle h-12 w-12">
//                             <img
//                                 src={service?.serviceImageURL}
//                                 alt={service?.serviceName} />
//                         </div>
//                     </div>
//                     <div>
//                         <div className="font-bold">{service?.serviceName}</div>
//                         <div className="text-sm opacity-50">{service?.category
//                         }</div>
//                     </div>
//                 </div>
//             </td>
//             <td>
//                 {userEmail}
//                 <br />
//                 <span className="badge badge-ghost badge-sm">{bookingDate}</span>
//             </td>
//             <td>{price}</td>
//             <th>
//                 <button className="btn btn-ghost btn-xs">Details</button>
//                 <button
//                     onClick={() => handleDelete(_id)}
//                     className="btn btn-ghost btn-xs">
//                     Delete</button>
//             </th>
//         </tr>
//     );
// };

// export default MyBookingsRow;

import React, { useState, useEffect, useContext } from "react";
import { motion as Motion } from "framer-motion";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router";

const MyBookingsRow = ({ booking, index, handleDelete }) => {
    const { _id, userEmail, serviceId, bookingDate, price, } = booking;
    console.log(booking);
    const [service, setService] = useState(null);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`https://homigo-server-new.vercel.app/services/${serviceId}`, {
            headers: {
                authorization: `Bearer ${user.
                    accessToken}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setService(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading service details:", err);
                setLoading(false);
            });
    }, [serviceId, user.accessToken]);

    if (loading) {
        return (
            <section className="text-[#ee3131] text-center">
                <span className="loading loading-spinner loading-xltext-[#ee3131]"></span>
                <p className="ml-3 text-[#ee3131] font-medium">Loading Booking...</p>
            </section>
        );
    }
    return (
        <Motion.tr
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
        >
            <th>{index}</th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img src={service?.serviceImageURL} alt={service?.serviceName} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{service?.serviceName}</div>
                        <div className="text-sm opacity-50">{service?.category}</div>
                    </div>
                </div>
            </td>
            <td>
                {userEmail}
                <br />
                <span className="badge bg-[#ee313180] badge-sm">{bookingDate}</span>
            </td>
            <td className="text-[#ee3131] font-semibold">${price}</td>
            <th className="flex gap-2">
                <Link

                    to={`/serviceDetails/${serviceId}`}
                    className="btn bg-[#ee3131] btn-xs text-white">Details</Link>
                <button
                    onClick={() => handleDelete(_id)}
                    className="btn btn-error btn-xs text-white"
                >
                    Delete
                </button>
            </th>
        </Motion.tr>
    );
};

export default MyBookingsRow;
