import React from "react";
import { motion as Motion } from "framer-motion";

import { FaPhone, FaHardHat, FaMoneyBillWave, FaRocket } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
const WhyChooseUs = () => {
    const features = [
        {
            icon: <FaPhone size={30} className="text-[#ee3131]" />,
            title: "24/7 Availability",
            description: "We are always available to assist you with high-quality services anytime.",
        },
        {
            icon: <FaHardHat size={30} className="text-[#ee3131]" />,
            title: "Certified Technicians",
            description: "All our technicians are certified and highly skilled for all tasks.",
        },
        {
            icon: <FaMoneyBillWave size={30} className="text-[#ee3131]" />,
            title: "Honest Pricing",
            description: "We offer transparent and fair pricing for all services.",
        },
        {
            icon: <FaRocket size={30} className="text-[#ee3131]" />,
            title: "Fast Response",
            description: "Quick response time to make sure your problems are solved immediately.",
        },
    ];
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: (i = 1) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" }
        }),
    };

    return (
        <section className="py-16">
            <div className="container mx-auto px-4 md:flex md:items-center md:gap-12">

                {/* Left Column */}
                <Motion.div
                    className="md:w-1/2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <Motion.p
                        className="text-sm sm:text-base md:text-lg font-semibold text-[#ee3131] mb-3 inline-table border-b-2 pb-0.5"
                        variants={fadeUp}
                        custom={1}
                    >
                        <span className="flex items-center">
                            <HiOutlineLightBulb className="size-4 sm:size-5 md:size-6" />
                            <span>Why Choose Us</span>
                        </span>
                    </Motion.p>

                    <Motion.h2
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-snug text-base-content"
                        variants={fadeUp}
                        custom={2}
                    >
                        We Provide High <span className="text-[#ee3131]">Quality Services</span> For You
                    </Motion.h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        {features.map((feature, index) => (
                            <Motion.div
                                key={index}
                                className="flex flex-col items-start gap-2"
                                variants={fadeUp}
                                custom={index + 3}
                            >
                                <div>{feature.icon}</div>
                                <h3 className="font-semibold text-base-content text-sm md:text-base lg:text-lg xl:text-xl">
                                    {feature.title}
                                </h3>
                                <p className="text-base-content/90 text-xs md:text-sm lg:text-base leading-relaxed">
                                    {feature.description}
                                </p>
                            </Motion.div>
                        ))}
                    </div>
                </Motion.div>

                {/* Right Column - Image */}
                <Motion.div
                    className="md:w-1/2 mt-8 md:mt-0"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <img
                        src="https://ronie.foxcreation.net/risegarden/wp-content/uploads/sites/16/2024/10/garden-lawn-maintenance-2023-11-27-05-01-43-LCJRA6P.jpg"
                        alt="Technician working"
                        className="rounded-lg shadow-lg w-full"
                    />
                </Motion.div>

            </div>
        </section>
    );
};

export default WhyChooseUs;
