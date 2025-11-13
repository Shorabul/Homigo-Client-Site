import React, { useEffect, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const CustomersReview = () => {
    const testimonials = [
        {
            name: 'Robert K.',
            role: 'Prevented Potential House Fire',
            quote:
                'The creosote removal was night and day difference! The team showed us infrared scans of the buildup before cleaning, and the draft improvement was immediate. Professional, punctual, and worth every penny.',
            avatar: 'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1480',
        },
        {
            name: 'Mark T.',
            role: 'Complete Chimney Restoration',
            quote:
                'Our smoking fireplace problem that 2 other companies couldn’t fix? Homigo diagnosed it in 20 minutes – improper chimney height. Their extension solution worked perfectly!',
            avatar: 'https://images.unsplash.com/photo-1654110455429-cf322b40a906?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1760',
        },
        {
            name: 'Emily R.',
            role: 'Solved 5-Year Smoke Issue',
            quote:
                'After years of worrying about chimney fires, Homigo’s Level 3 inspection found dangerous cracks in our flue liner we never knew existed. Their stainless steel relining solution gave us peace of mind – and our fireplace works better than ever!',
            avatar: 'https://images.unsplash.com/photo-1730573520149-7a5b97d35ccc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1480',
        },
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000); // Change every 6 seconds
        return () => clearInterval(timer);
    }, []);
    return (
        <>
            <section className="text-primary py-16 px-4 md:px-8">
                <div className="text-center mb-12">
                    <div className="flex justify-center items-center gap-2 text-primary-content text-2xl font-bold">
                        🔥 What Our Customers Say
                    </div>
                    <h2 className="text-4xl font-bold mt-2">
                        Hear From Our <span className="text-primary-content">Satisfied</span> Customers
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-secondary-content">
                        Integer varius ornare commodo. Aenean faucibus tortor dictum, luctus purus id, imperdiet purus.
                    </p>
                </div>

                <div className="flex justify-center">
                    <AnimatePresence mode="wait">
                        <Motion.div
                            key={index}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="bg-white text-gray-800 rounded-xl shadow-lg p-6 max-w-xl w-full"
                        >
                            <div className="flex items-center gap-2 text-primary mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                            <p className="italic text-gray-700 mb-4">“ {testimonials[index].quote} ”</p>
                            <div className="flex items-center gap-4">
                                <img
                                    src={testimonials[index].avatar}
                                    alt={testimonials[index].name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                                />
                                <div>
                                    <p className="font-bold text-primary">{testimonials[index].name}</p>
                                    <p className="text-sm text-gray-500">{testimonials[index].role}</p>
                                </div>
                            </div>
                        </Motion.div>
                    </AnimatePresence>
                </div>
            </section>
        </>
    );
};

export default CustomersReview;
