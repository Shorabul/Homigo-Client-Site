import React from 'react';
import { FaTools, FaHouseUser, FaHammer } from "react-icons/fa"; // icons

const ServiceCard = ({ service }) => {
    const { serviceName, category, price } = service;
    return (

        <div
            className="relative rounded-lg overflow-hidden shadow-lg group"
        >
            {/* Background image */}
            <img
                src="https://handyman.homerakshak.up2client.com/assets/paint-services-img2-B59NjlkQ.jpg"
                alt={serviceName}
                className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4">
                <div className="mb-4">{price}</div>
                <h2 className="text-xl font-bold">{category}</h2>
            </div>
        </div>
    );
};

export default ServiceCard;