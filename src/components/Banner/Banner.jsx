import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion as Motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "./Banner.css";
import { Link } from "react-router";


const Banner = () => {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/services/banner") // adjust port if needed
            .then((res) => res.json())
            .then((data) => setSlides(data));
    }, []);
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
                    delay: 3000,
                    // disableOnInteraction: false
                }}
                modules={[Pagination, Autoplay]}
                className="w-full h-full"
            >
                {slides.map((slide, i) => (
                    <SwiperSlide key={i}>
                        <div
                            className="relative h-full w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide?.serviceImageURL})` }}
                        >
                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-black/60 z-0"></div>


                            <div className="flex justify-center items-center">
                                {/* Animated vertical line */}
                                <Motion.div
                                    initial={{ scaleX: -0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                                    className="absolute top-1/4 w-1/2 h-3 bg-white origin-top z-10"
                                />

                                {/* Animated horizontal line */}
                                <Motion.div
                                    initial={{ scaleX: -0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                                    className="absolute bottom-1/4 w-1/2 h-3 bg-primary origin-left z-10"
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
                                    <p className="text-white font-semibold uppercase tracking-wider mb-2">
                                        Hello
                                    </p>
                                    <h1 className="slide-title font-extrabold leading-tight mb-4">
                                        {slide?.serviceName}
                                    </h1>
                                    <p className="text-sm md:text-base mb-8 opacity-90">
                                        {slide?.description}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <Link to='/services' className="slide-btn bg-primary text-white rounded-md text-xs md:text-sm font-semibold transition-all duration-300 shadow-lg py-2 px-3 md:px-6 md:py-3">
                                            OUR SERVICES
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
