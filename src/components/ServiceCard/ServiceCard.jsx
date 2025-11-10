import React from 'react';
import { FaTools, FaHouseUser, FaHammer } from "react-icons/fa"; // icons

const ServiceCard = () => {
    const services = [
        {
            title: "Plumbing Solutions",
            icon: <FaTools size={32} />,
            image: "/plumbing.jpg", // replace with your image path
        },
        {
            title: "Roofing Solutions",
            icon: <FaHouseUser size={32} />,
            image: "/roofing.jpg",
        },
        {
            title: "Carpentry Solutions",
            icon: <FaHammer size={32} />,
            image: "/carpentry.jpg",
        },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {services.map((service, index) => (
                <div
                    key={index}
                    className="relative rounded-lg overflow-hidden shadow-lg group"
                >
                    {/* Background image */}
                    <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4">
                        <div className="mb-4">{service.icon}</div>
                        <h2 className="text-xl font-bold">{service.title}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ServiceCard;