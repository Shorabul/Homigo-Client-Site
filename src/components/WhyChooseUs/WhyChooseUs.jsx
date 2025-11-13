import React from "react";
import { FaPhone, FaHardHat, FaMoneyBillWave, FaRocket } from "react-icons/fa";

const WhyChooseUs = () => {
    const features = [
        {
            icon: <FaPhone size={30} className="text-primary" />,
            title: "24/7 Availability",
            description: "We are always available to assist you with high-quality services anytime.",
        },
        {
            icon: <FaHardHat size={30} className="text-primary" />,
            title: "Certified Technicians",
            description: "All our technicians are certified and highly skilled for all tasks.",
        },
        {
            icon: <FaMoneyBillWave size={30} className="text-primary" />,
            title: "Honest Pricing",
            description: "We offer transparent and fair pricing for all services.",
        },
        {
            icon: <FaRocket size={30} className="text-primary" />,
            title: "Fast Response",
            description: "Quick response time to make sure your problems are solved immediately.",
        },
    ];

    return (
        <section className="py-16">
            <div className="container mx-auto px-4 md:flex md:items-center md:gap-12">
                {/* Left Column */}
                <div className="md:w-1/2">
                    <h2 className="text-secondary text-3xl font-bold mb-8">Why Choose Us</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-start gap-2">
                                <div>{feature.icon}</div>
                                <h3 className="font-semibold text-lg">{feature.title}</h3>
                                <p className="text-color-secondary">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                    {/* <button className="b text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
                        Book your appointment now
                    </button> */}
                </div>

                {/* Right Column - Image */}
                <div className="md:w-1/2 mt-8 md:mt-0">
                    <img
                        src="https://live.sociolib.com/lockfix/wp-content/uploads/sites/9/2025/04/maintenance-concept-focused-serious-young-locksmi-2025-01-08-02-29-41-utc.webp"
                        alt="Technician working"
                        className="rounded-lg shadow-lg w-full"
                    />
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
