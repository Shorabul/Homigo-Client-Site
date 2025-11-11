import React, { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { Wrench, Brush, Wind } from "lucide-react";
import { Link } from 'react-router';

const TopRatedServices = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/services/top-rated")
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.error("Error fetching top-rated services:", err));
    }, []);

    return (
        <section className="bg-black text-white py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Text Block */}
                <div>
                    <p className="text-sm font-semibold text-orange-500 mb-3">OUR TOP RATED SERVICES</p>
                    <h2 className="text-4xl font-bold mb-6 leading-snug">
                        We provide your all <br /> required handyman <br /> services into your location
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-10">
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
                                className="min-w-[250px] relative overflow-hidden rounded-2xl shadow-lg group flex-shrink-0"
                            >
                                <img
                                    src={service?.serviceImageURL}
                                    alt={service?.serviceName}
                                    className="object-cover w-full h-64 group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 flex items-center justify-between">
                                    <div>
                                        {service.icon}
                                        <p className="text-white text-sm font-semibold mt-1">
                                            {service.serviceName}
                                        </p>
                                        <p className="text-yellow-400 text-xs">⭐ {service?.ratings}</p>
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
                    className="items-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition"
                >
                    <span className="mr-2">→</span> View All Services
                </Link>
            </div>
        </section>
    );
};

export default TopRatedServices;