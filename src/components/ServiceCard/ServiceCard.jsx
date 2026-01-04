import React from 'react';
import { Link } from 'react-router';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { motion as Motion } from 'framer-motion';

export const ServiceCardSkeleton = () => (
    <div className="bg-base-300 rounded-xl overflow-hidden shadow-md animate-pulse h-full">
        <div className="h-48 bg-base-200"></div>
        <div className="p-4 space-y-3">
            <div className="h-4 bg-base-200 rounded w-3/4"></div>
            <div className="h-3 bg-base-200 rounded w-full"></div>
            <div className="h-3 bg-base-200 rounded w-5/6"></div>
            <div className="flex justify-between items-center">
                <div className="h-6 bg-base-200 rounded w-1/4"></div>
                <div className="h-4 bg-base-200 rounded w-1/4"></div>
            </div>
            <div className="h-10 bg-base-200 rounded w-full"></div>
        </div>
    </div>
);

const ServiceCard = ({ service, isLoading = false }) => {
    if (isLoading) return <ServiceCardSkeleton />;

    return (
        <Motion.div
            whileHover={{ y: -8 }}
            className="bg-base-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col"
        >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden bg-base-200 group">
                <img
                    src={service.serviceImageURL || 'https://via.placeholder.com/300x200?text=Service'}
                    alt={service.serviceName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ${service.price}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="font-bold text-lg text-base-content line-clamp-2 mb-2">
                    {service.serviceName}
                </h3>

                {/* Description */}
                <p className="text-sm text-base-content/70 line-clamp-2 mb-3 flex-grow">
                    {service.description}
                </p>

                {/* Meta Info */}
                <div className="space-y-2 mb-4 text-sm">
                    {service.location && (
                        <div className="flex items-center gap-2 text-base-content/60">
                            <FaMapMarkerAlt className="text-red-500 flex-shrink-0" />
                            <span className="line-clamp-1">{service.location}</span>
                        </div>
                    )}
                    {service.rating && (
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`text-sm ${i < Math.floor(service.rating)
                                            ? 'text-yellow-500'
                                            : 'text-base-300'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-base-content/60">({service.reviews || 0})</span>
                        </div>
                    )}
                </div>

                {/* View Details Button */}
                <Link
                    to={`/service/${service._id}`}
                    className="btn btn-sm btn-outline btn-error w-full hover:btn-error"
                >
                    View Details
                </Link>
            </div>
        </Motion.div>
    );
};

export default ServiceCard;