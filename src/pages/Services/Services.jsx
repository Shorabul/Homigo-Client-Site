import React, { useEffect, useState } from 'react';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import { motion as Motion } from "framer-motion";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";

const Services = () => {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("https://homigo-server-new.vercel.app/services")
            .then((res) => res.json())
            .then((data) => {
                setServices(data);
                setFilteredServices(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading services:", err);
                setLoading(false);
            });
    }, []);


    const categories = ["All", ...new Set(services.map(s => s.category || "Other"))];


    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        if (category === "All") {
            setFilteredServices(services);
        } else {
            setFilteredServices(services.filter(s => s.category === category));
        }
    };

    const handleSortByPrice = () => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newOrder);

        const sorted = [...filteredServices].sort((a, b) => {
            const priceA = Number(a.price);
            const priceB = Number(b.price);
            return newOrder === "asc" ? priceA - priceB : priceB - priceA;
        });

        setFilteredServices(sorted);
    };


    return (
        <>
            {
                loading ? <div className="flex justify-center items-center h-64">

                    <span className="loading loading-spinner text-[#ee3131]"></span>

                    <p className="ml-3 text-[#ee3131] font-medium">Loading Services...</p>
                </div> : <div>
                    {/* Hero Section */}
                    <div className="relative h-56 sm:h-66 md:h-76 lg:h-86 xl:h-96 w-full opacity-90">
                        <img src="https://images.unsplash.com/photo-1520372561567-bac27b0e5fa1?q=80&w=2784&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="example" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60">
                        </div>
                        <div className="absolute text-white top-1/3 left-1/5 font-bold">
                            <Motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl'
                            >
                                Our Services
                            </Motion.p>

                            <Motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                className='text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'
                            >
                                All By Category
                            </Motion.p>
                            <Motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                className='text-xs sm:text-sm md:text-base mt-3 opacity-90'
                            >
                                Choose the service you need from our curated list.
                            </Motion.p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="container mx-auto mt-10 px-4 flex flex-wrap gap-4 items-center">
                        {/* Category Select */}
                        {/* <div className="hidden md:flex justify-center items-center gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryFilter(cat)}
                            className={`px-4 py-2 rounded-lg border transition duration-200
                                ${selectedCategory === cat
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white text-gray-700 border-gray-300 hover:border-primary"}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div> */}

                        <div className="">
                            <select
                                id="category"
                                value={selectedCategory}
                                onChange={(e) => handleCategoryFilter(e.target.value)}
                                className="select select-error cursor-pointer appearance-none border border-neutral-content bg-base-300 rounded-md transition-all duration-200"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            {/* <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                        ▼
                    </span> */}
                        </div>


                        {/* Sort Button */}
                        <div className="ml-auto">
                            <button
                                onClick={handleSortByPrice}
                                className="cursor-pointer px-4 py-2 rounded-md brand-color-bg text-white transition"
                            >
                                Sort by Price {sortOrder === "asc" ? "↑" : sortOrder === "desc" ? "↓" : ""}
                            </button>
                        </div>
                    </div>
                    {/* Services List */}
                    <div className="container mx-auto mt-10 px-4">
                        {/* <h1 className="text-4xl font-bold text-center text-primary mb-10">
                    Our Services
                </h1> */}

                        {filteredServices.length === 0 ? (
                            <p className="text-center text-base-content">No services found.</p>
                        ) : (
                            <Motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                            >
                                {filteredServices.map((service) => (
                                    <ServiceCard key={service._id} service={service} />
                                ))}
                            </Motion.div>
                        )}
                    </div>
                </div>
            }
        </>
    );
};

export default Services;