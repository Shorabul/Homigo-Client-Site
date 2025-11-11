import React from 'react';
import Banner from '../../components/Banner/Banner';
import TopRatedServices from '../../components/TopRatedServices/TopRatedServices';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import CustomersReview from '../../components/CustomersReview/CustomersReview';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TopRatedServices></TopRatedServices>
            <WhyChooseUs></WhyChooseUs>
            <CustomersReview></CustomersReview>
        </div>
    );
};

export default Home;