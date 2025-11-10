import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Banner.css'
const Banner = () => {
    return (
        <Swiper
            navigation={true}
            autoplay={true}
            slidesPerView={1}
            // spaceBetween={10}
            // pagination={true}
            pagination={{
                clickable: true,
                dynamicBullets: true
            }}
            // pagination={{
            //     el: '.custom-pagination',
            //     clickable: true
            // }}
            modules={[Navigation, Pagination, Autoplay]}
        >
            <SwiperSlide>
                <img className='w-full h-50' src="https://i.ibb.co/G3FH83P7/electrical-services-img-1.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className='w-full h-50' src="https://i.ibb.co/7xb2g6LC/electrical-services-img-2.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className='w-full h-50' src="https://i.ibb.co/35TfpJk7/electrical-services-img-3.jpg" alt="" />
            </SwiperSlide>
        </Swiper>
    );
};

export default Banner;