import React from 'react';
import { Link } from 'react-router';
import { motion as Motion } from 'framer-motion';

const MyServiceRow = ({ service, index, handleDelete }) => {
    const {
        _id,
        serviceName,
        category,
        serviceImageURL,
        providerName,
        providerEmail,
        price,
    } = service;

    return (
        <Motion.tr
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.02, }}
        >
            <th>{index}</th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img src={serviceImageURL} alt={serviceName} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{serviceName}</div>
                        <div className="text-sm opacity-50">{category}</div>
                    </div>
                </div>
            </td>
            <td>
                {providerName}
                <br />
                <span className="badge badge-primary badge-sm">{providerEmail}</span>
            </td>
            <td className="text-primary font-semibold">${price}</td>
            <th className="flex gap-2">
                <button className="btn btn-primary btn-xs">Details</button>
                <Link
                    to={`/update-service/${_id}`}
                    className="btn btn-primary btn-xs"
                >
                    Update
                </Link>
                <button
                    onClick={() => handleDelete(_id)}
                    className="btn btn-error btn-xs"
                >
                    Remove
                </button>
            </th>
        </Motion.tr>
    );
};

export default MyServiceRow;
