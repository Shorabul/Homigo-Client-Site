import React, { useEffect, useState } from "react";
import { FaTools, FaHouseUser, FaHammer } from "react-icons/fa"; // icons
import { useParams } from "react-router";

const ServiceDetails = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/services/${id}`)
            .then(res => res.json())
            .then(data => setService(data))
            .catch(err => console.error("Error loading service details:", err));
    }, [id]);

    if (!service) {
        return <p className="text-center mt-10">Loading service details...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
            <img
                src={service.serviceImageURL}
                alt={service.serviceName}
                className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h2 className="text-3xl font-bold mb-4">{service.serviceName}</h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <p className="text-lg font-semibold text-orange-600 mb-2">
                Price: ${service.price}
            </p>
            <p className="text-sm text-gray-500">
                Provided by: {service.providerName} ({service.providerEmail})
            </p>
        </div>
    );
};

export default ServiceDetails;
