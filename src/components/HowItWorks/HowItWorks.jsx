import { motion as Motion } from 'framer-motion';
import { FaSearch, FaCalendarCheck, FaStar } from 'react-icons/fa';
import { HiOutlineLightBulb } from "react-icons/hi";

const steps = [
    {
        icon: <FaSearch size={32} />,
        title: 'Browse Services',
        description: 'Explore trusted local providers for cleaning, repairs, and more.',
    },
    {
        icon: <FaCalendarCheck size={32} />,
        title: 'Book Appointment',
        description: 'Choose your time, confirm details, and get matched instantly.',
    },
    {
        icon: <FaStar size={32} />,
        title: 'Rate & Review',
        description: 'Share your experience to help others and improve service quality.',
    },
];

const HowItWorks = () => {
    return (
        <section className="py-16 px-4 text-[#ee3131] container mx-auto">
            <div className="text-center mb-12">
                <p
                    className="text-sm sm:text-base md:text-lg font-semibold text-[#ee3131] mb-3 inline-table border-b-2 pb-0.5"
                >
                    <span className="flex items-center">
                        <HiOutlineLightBulb className="size-4 sm:size-5 md:size-6" />
                        <span>How It Works</span>
                    </span>
                </p>

                <h2
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-snug text-base-content"
                >
                    Simple steps to find and book <span className="text-[#ee3131]">trusted</span> home services in your area
                </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, i) => (
                    <Motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.2 }}
                        viewport={{ once: true }}
                        className="bg-base-300 rounded-xl p-6 shadow-md text-center"
                    >
                        <div className="text-[#ee3131] mb-4">{step.icon}</div>
                        <h3 className="text-xl text-base-content/90 font-semibold mb-2">{step.title}</h3>
                        <p className="text-base-content/80">{step.description}</p>
                    </Motion.div>
                ))}
            </div>
        </section>
    );
};
export default HowItWorks;