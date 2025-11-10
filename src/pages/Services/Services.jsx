import React from 'react';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import { FaTools, FaHouseUser, FaHammer } from "react-icons/fa"; // icons
import { useLoaderData } from 'react-router';

const Services = () => {
    const servicesData = useLoaderData();
    return (
        <div className='mt-10'>
            <div className="relative h-96 w-full">
                <img src="https://i.ibb.co/G3FH83P7/electrical-services-img-1.jpg" alt="example" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40">
                </div> {/* 40% black overlay */}
                <p className="absolute text-white top-10 text-4xl font-bold">Text on top</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
                {
                    servicesData.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div>

        </div>
    );
};

export default Services;