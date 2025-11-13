import React, { useEffect, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import PageLoader from '../../pages/PageLoader/PageLoader';

const CustomersReview = () => {
    const [reviews, setReviews] = useState([]);
    const [index, setIndex] = useState(0);

    // Auto-rotate reviews every 6 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (reviews.length ? (prev + 1) % reviews.length : 0));
        }, 6000);
        return () => clearInterval(timer);
    }, [reviews]);

    // Fetch reviews from backend
    useEffect(() => {
        fetch("https://homigo-server-new.vercel.app/reviews")
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.error("Error fetching reviews:", err));
    }, []);

    if (!reviews.length) {
        return (
            <section className="text-primary py-16 px-4 md:px-8 text-center">
                <PageLoader></PageLoader>;
            </section>
        );
    }

    return (
        <section className="text-primary py-16 px-4 md:px-8">
            <div className="text-center mb-12">
                <div className="flex justify-center items-center gap-2 text-primary text-2xl font-bold">
                    🔥 What Our Customers Say
                </div>
                <h2 className="text-4xl font-bold mt-2">
                    Hear From Our <span className="text-primary">Satisfied</span> Customers
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-secondary">
                    Real feedback from people who booked services through HomeHero.
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
                        {/* Rating Stars */}
                        <div className="flex items-center gap-2 text-primary mb-2">
                            {[...Array(reviews[index].rating)].map((_, i) => (
                                <FaStar key={i} />
                            ))}
                        </div>

                        {/* Comment */}
                        <p className="italic text-gray-700 mb-4">“ {reviews[index].comment} ”</p>

                        {/* Customer Info */}
                        <div className="flex items-center gap-4">
                            <img
                                src={reviews[index].photoURL}
                                alt={reviews[index].userName}
                                className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                            />
                            <div>
                                <p className="font-bold text-primary">{reviews[index].userName}</p>
                                <p className="text-sm text-gray-500">{reviews[index].serviceName}</p>
                            </div>
                        </div>
                    </Motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default CustomersReview;
