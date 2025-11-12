import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const MyBookingsRow = ({ booking, index, handleDelete }) => {
    const { _id,
        userEmail,
        serviceId,
        bookingDate,
        price,
    } = booking;
    const [service, setService] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:3000/services/${serviceId}`)
            .then(res => res.json())
            .then(data => setService(data))
            .catch(err => console.error("Error loading service details:", err));
    }, [serviceId]);
    return (
        <tr>
            <th>{index}</th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={service?.serviceImageURL}
                                alt={service?.serviceName} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{service?.serviceName}</div>
                        <div className="text-sm opacity-50">{service?.category
                        }</div>
                    </div>
                </div>
            </td>
            <td>
                {userEmail}
                <br />
                <span className="badge badge-ghost badge-sm">{bookingDate}</span>
            </td>
            <td>{price}</td>
            <th>
                <button className="btn btn-ghost btn-xs">Details</button>
                <button
                    onClick={() => handleDelete(_id)}
                    className="btn btn-ghost btn-xs">
                    Delete</button>
            </th>
        </tr>
    );
};

export default MyBookingsRow;