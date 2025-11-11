import React, { useEffect, useState } from 'react';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
// import { FaTools, FaHouseUser, FaHammer } from "react-icons/fa";
import { motion as Motion } from "framer-motion";
// import { Link, NavLink } from 'react-router';

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/services")
            .then((res) => res.json())
            .then((data) => setServices(data))
            .catch((err) => console.error("Error loading services:", err));
    }, []);

    //  Group services by category
    const groupedServices = services.reduce((groups, service) => {
        const category = service.category || "Other";
        if (!groups[category]) groups[category] = [];
        groups[category].push(service);
        return groups;
    }, {});

    return (
        <div className='mt-10'>
            <div className="relative h-56 sm:h-66 md:h-76 lg:h-86 xl:h-96 w-full">
                <img src="https://i.ibb.co/G3FH83P7/electrical-services-img-1.jpg" alt="example" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40">
                </div>
                <div className="absolute text-white top-1/3 left-1/5 font-bold">
                    <p className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl'>Our Services</p>
                    <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'>All By Category</p>
                </div>

            </div>
            <div className="container mx-auto mt-10 px-4">
                <h1 className="text-4xl font-bold text-center text-orange-600 mb-10">
                    Our Services
                </h1>

                {/* Loop through categories */}
                {Object.keys(groupedServices).map((category, i) => (
                    <Motion.div
                        key={category}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="mb-12"
                    >

                        <div key={category} className="mb-12">
                            {/* Category Title */}
                            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-l-4 border-orange-500 pl-3 bg-gradient-to-r from-orange-50 to-white p-6 rounded-xl">
                                {category}
                            </h2>

                            {/* Service Cards */}
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {groupedServices[category].map((service) => (
                                    <ServiceCard key={service._id} service={service}></ServiceCard>

                                ))}
                            </div>
                        </div>
                    </Motion.div>
                ))}

            </div>

        </div>
    );
};

export default Services;