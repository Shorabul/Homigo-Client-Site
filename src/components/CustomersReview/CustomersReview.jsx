import React, { useEffect, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import PageLoader from '../../pages/PageLoader/PageLoader';
import { HiOutlineLightBulb } from "react-icons/hi";
const CustomersReview = () => {
    const [reviews, setReviews] = useState([]);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (reviews.length ? (prev + 1) % reviews.length : 0));
        }, 6000);
        return () => clearInterval(timer);
    }, [reviews]);

    useEffect(() => {
        fetch("https://homigo-server-new.vercel.app/reviews")
            .then(res => res.json())
            .then(data => {
                setReviews(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching reviews:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <section className="text-[#ee3131] py-16 text-center">
                <span className="loading loading-spinner loading-xltext-[#ee3131]"></span>
                <p className="ml-3 text-[#ee3131] font-medium">Loading Reviews...</p>
            </section>
        );
    }
    if (!reviews.length) {
        return (
            <section className="py-16 px-4 text-center">
                <div className="max-w-md mx-auto bg-base-300 p-8 rounded-xl shadow">
                    <HiOutlineLightBulb size={50} className="mx-auto text-[#ee3131]" />
                    <h2 className="text-xl font-semibold mt-4">No Customer Reviews Found</h2>
                    <p className="text-base-content/70 mt-2">
                        Be the first to leave a review about our services!
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="text-[#ee3131] py-16 px-4 md:px-8">
            <div className="text-center mb-12">
                <p
                    className="text-sm sm:text-base md:text-lg font-semibold text-[#ee3131] mb-3 inline-table border-b-2 pb-0.5"
                >
                    <span className="flex items-center">
                        <HiOutlineLightBulb className="size-4 sm:size-5 md:size-6" />
                        <span>What Our Customers Say</span>
                    </span>
                </p>
                <h2
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-snug text-base-content"
                >
                    Hear From Our <span className="text-[#ee3131]">Satisfied</span> Customers
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-base-content">
                    Real feedback from people who booked services through Homgio.
                </p>
            </div>

            <div className="flex justify-center ">
                <AnimatePresence mode="wait">
                    <Motion.div
                        key={index}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="text-base-content/90 bg-base-300 rounded-xl shadow-lg p-6 max-w-xl w-full"
                    >
                        {/* Rating Stars */}
                        <div className="flex items-center gap-2 text-[#ee3131] mb-2">
                            {[...Array(reviews[index].rating)].map((_, i) => (
                                <FaStar key={i} />
                            ))}
                        </div>

                        {/* Comment */}
                        <p className="italic text-base-content/80 text-xs md:text-sm lg:text-base leading-relaxed mb-4">“ {reviews[index].comment} ”</p>

                        {/* Customer Info */}
                        <div className="flex items-center gap-4">
                            <img
                                src={reviews[index].photoURL}
                                alt={reviews[index].userName}
                                className="w-12 h-12 rounded-full object-cover border-2 border-[#ee3131]"
                            />
                            <div className='text-[#ee3131] text-xs md:text-sm lg:text-base'>
                                <p className="font-bold text-text-base-content">{reviews[index].userName}</p>
                                <p className="font-semibold text-base-content">{reviews[index].serviceName}</p>
                            </div>
                        </div>
                    </Motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default CustomersReview;
