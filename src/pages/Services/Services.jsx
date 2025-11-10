import React from 'react';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import { FaTools, FaHouseUser, FaHammer } from "react-icons/fa"; // icons

const Services = () => {
    return (
        <div>
            <div className="relative h-96">
                <img src="https://i.ibb.co/G3FH83P7/electrical-services-img-1.jpg" alt="example" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40">
                </div> {/* 40% black overlay */}
                <p className="absolute text-white top-10 text-4xl font-bold">Text on top</p>
            </div>

            <ServiceCard></ServiceCard>

        </div>
    );
};

export default Services;