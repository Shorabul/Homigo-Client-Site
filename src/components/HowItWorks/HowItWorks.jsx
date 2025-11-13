import { motion as Motion } from 'framer-motion';
import { FaSearch, FaCalendarCheck, FaStar } from 'react-icons/fa';

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
        <section className="py-16 px-4 md:px-8 text-primary">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold">How It Works</h2>
                <p className="mt-4 text-gray-600 max-w-xl mx-auto">
                    Simple steps to find and book trusted home services in your area.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, i) => (
                    <Motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.2 }}
                        viewport={{ once: true }}
                        className="bg-blue-50 rounded-xl p-6 shadow-md text-center"
                    >
                        <div className="text-primary mb-4">{step.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                    </Motion.div>
                ))}
            </div>
        </section>
    );
};
export default HowItWorks;