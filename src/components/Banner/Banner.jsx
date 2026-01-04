import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion as Motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "./Banner.css";
import { Link } from "react-router";
import { FaArrowRightLong } from "react-icons/fa6";


const Banner = () => {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch("https://homigo-server-new.vercel.app/services/banner")
            .then((res) => res.json())
            .then((data) => {
                setSlides(data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="relative w-full h-[90vh] bg-base-200 animate-pulse flex justify-center items-center">
                <div className="w-full h-full relative">
                    {/* Background skeleton */}
                    <div className="absolute inset-0 bg-base-300"></div>

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>

                    {/* Content skeleton */}
                    <div className="absolute inset-0 flex flex-col justify-center items-start px-10 gap-4">
                        <div className="h-10 w-2/3 bg-base-100/40 rounded"></div>
                        <div className="h-4 w-1/2 bg-base-100/30 rounded"></div>
                        <div className="h-4 w-1/3 bg-base-100/20 rounded"></div>

                        <div className="mt-6 h-10 w-40 bg-base-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[90vh] overflow-hidden flex justify-center">
            <Swiper
                slidesPerView={1}
                // loop={true}

                pagination={{
                    clickable: true,
                    // dynamicBullets: true
                }}
                autoplay={{
                    delay: 5000,
                    // disableOnInteraction: false
                }}
                modules={[Pagination, Autoplay]}
                className="w-full h-full"
            >
                {slides.map((slide, i) => (
                    <SwiperSlide key={slide._id}>
                        <div
                            className="relative h-full w-full bg-cover"
                            style={{ backgroundImage: `url(${slide?.serviceImageURL})` }}
                        >
                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-black/60 z-0"></div>


                            <div className="flex justify-center items-center">
                                {/* Animated vertical line */}
                                <Motion.div
                                    key={i}
                                    initial={{ scaleX: -0 }}
                                    animate={{ scaleX: 1 }}

                                    transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                                    className="absolute top-0 right-0 w-1/2 h-3 bg-[#ee3131] origin-top z-10"
                                />

                                {/* Animated horizontal line */}
                                <Motion.div
                                    key={slide._id}
                                    initial={{ scaleX: -0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                                    className="absolute left-0 bottom-0 w-1/2 h-3 brand-color-bg origin-left z-10"
                                />
                            </div>


                            {/* Slide content */}
                            <div className="absolute container mx-auto inset-0 z-20 flex justify-center items-center">
                                <Motion.div
                                    initial={{ opacity: 0, x: 60 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                                    className="text-left text-white px-8"
                                >
                                    <h1 className="slide-title font-extrabold leading-tight mb-4">
                                        {slide?.serviceName}
                                    </h1>
                                    <p className="text-sm md:text-base mb-8 opacity-90">
                                        {slide?.description}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <Link to='/services' className="slide-btn brand-color-bg text-white rounded-md text-xs md:text-sm font-semibold transition-all duration-300 shadow-lg py-2 px-3 md:px-6 md:py-3 flex items-center gap-2">
                                            <span>OUR SERVICES</span> <FaArrowRightLong />
                                        </Link>
                                        {/* <button className="flex items-center gap-2 border border-primary text-primary transition-all px-6 py-3 rounded-md text-sm font-semibold">
                                            ▶ Watch Our Story
                                        </button> */}
                                    </div>
                                </Motion.div>

                                <Motion.div>

                                </Motion.div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
