import React from 'react';
import { FaTools, FaHouseUser, FaHammer } from "react-icons/fa"; // icons
import { Link } from 'react-router';

const ServiceCard = ({ service }) => {
    const { _id, serviceName, description, price, serviceImageURL } = service;
    return (
        <div
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 border border-gray-100 flex flex-col justify-between"
        >
            <div className='w-full'>
                <img
                    src={serviceImageURL}
                    alt={serviceName}
                    className="w-full h-40 object-cover rounded-lg mb-4 transition-transform hover:scale-105"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                    {serviceName}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {description}
                </p>
            </div>
            <div className='flex justify-between items-center'>
                <p className="font-bold text-primary">${price}</p>
                <Link
                    to={`/serviceDetails/${_id}`}
                    className='bg-primary py-2 px-3 text-white rounded-md'>Details</Link>
            </div>
        </div>
    );
};

export default ServiceCard;