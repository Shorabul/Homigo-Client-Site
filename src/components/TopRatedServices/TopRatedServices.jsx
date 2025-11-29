import React, { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { Link } from 'react-router';
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaStar } from "react-icons/fa";


const TopRatedServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("https://homigo-server-new.vercel.app/services/top-rated")
            .then(res => res.json())
            .then(data => {
                setServices(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching top-rated services:", err);
                setLoading(false);
            });
    }, []);

    return (
        <>
            {loading ? <div className="flex justify-center items-center h-64">

                <span className="loading loading-spinner text-[#ee3131]"></span>

                <p className="ml-3 text-[#ee3131] font-medium">Loading Top Rated Services...</p>
            </div>
                : <section className="text-white py-20 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Text Block */}
                        <div>
                            <p className="text-sm sm:text-base md:text-lg font-semibold text-[#ee3131] mb-3 inline-table border-b-2 pb-0.5">
                                <span className="flex items-center">
                                    <HiOutlineLightBulb className="size-4 sm:size-5 md:size-6" />
                                    <span>OUR TOP RATED SERVICES</span>
                                </span>
                            </p>
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-snug text-base-content">
                                Highest <span className="text-[#ee3131]">rated</span> company
                            </h2>
                            <p className="text-base-content text-xs md:text-sm lg:text-base leading-relaxed lg:mb-30">
                                All-rounder Zurich is the leading premier Handyman Service in Switzerland.
                                We have been helping people with their home and office repairs in other countries.
                                Our handymen are multi-skilled, punctual, polite and will always leave your property clean and tidy.
                                If you are looking for the best handyman service Zurich has to offer, then look no further, you've found it.
                                Our normal working hours are 8 a.m. to 8 p.m. weekdays. However we are also available to attend earlier in the morning, later in the evening and at weekends.
                                Providing a service of the highest all-round quality is our guarantee. We are primarily active in the Zurich area, although we can also offer our service in other areas, upon request.
                                To learn about our all-round service in more detail, our website has everything you need to know, alternatively you can contact us directly.
                            </p>
                        </div>

                        {/* Right - Auto Scrolling Cards */}
                        <div className="relative w-full overflow-hidden">
                            <Motion.div
                                className="flex gap-6"
                                animate={{ x: ["0%", "-100%"] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 20,
                                    ease: "linear",
                                }}
                            >
                                {[...services, ...services].map((service, i) => (
                                    <div
                                        key={i}
                                        className="min-w-[250px] relative overflow-hidden rounded-2xl shadow-lg group flex-shrink-0 cursor-pointer"
                                    >
                                        <img
                                            src={service?.serviceImageURL}
                                            alt={service?.serviceName}
                                            className="object-cover w-full h-64 group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 brand-color-bg bg-opacity-70 p-4 flex items-center justify-between">
                                            <div>
                                                {service.icon}
                                                <p className="text-white text-sm font-semibold mt-1">
                                                    {service.serviceName}
                                                </p>
                                                <p className="text-yellow-400 text-xs flex items-center gap-2">
                                                    <FaStar />
                                                    <span>
                                                        {service?.averageRating}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Motion.div>
                        </div>
                    </div>

                    {/* View All Button */}
                    <div className="text-center mt-16">
                        <Link
                            to="/services"
                            className="py-3 px-4 lg:px-5 lg:py-4 rounded-md font-semibold text-white brand-color-bg hover:bg-error transition-all duration-500 shadow-md items-center"
                        >
                            <span className="mr-2">→</span> View All Services
                        </Link>
                    </div>
                </section>
            }
        </>
    );
};

export default TopRatedServices;