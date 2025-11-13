import React, { useEffect, useState } from 'react';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import { motion as Motion } from "framer-motion";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";

const Services = () => {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState(null);

    useEffect(() => {
        fetch("https://homigo-server-new.vercel.app/services")
            .then((res) => res.json())
            .then((data) => {
                setServices(data);
                setFilteredServices(data);
            })
            .catch((err) => console.error("Error loading services:", err));
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
        <div className='mt-10'>
            {/* Hero Section */}
            <div className="relative h-56 sm:h-66 md:h-76 lg:h-86 xl:h-96 w-full">
                <img src="https://i.ibb.co/G3FH83P7/electrical-services-img-1.jpg" alt="example" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute text-white top-1/3 left-1/5 font-bold">
                    <p className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl'>Our Services</p>
                    <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'>All By Category</p>
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

                <div className="relative">
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => handleCategoryFilter(e.target.value)}
                        className="appearance-none border border-gray-300 bg-white rounded-lg px-4 py-2 pr-10 text-gray-700
               focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary hover:border-primary transition duration-200"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                        ▼
                    </span>
                </div>


                {/* Sort Button */}
                <div className="ml-auto">
                    <button
                        onClick={handleSortByPrice}
                        className="px-4 py-2 rounded-lg bg-primary text-white transition"
                    >
                        Sort by Price {sortOrder === "asc" ? "↑" : sortOrder === "desc" ? "↓" : ""}
                    </button>
                </div>
            </div>
            {/* Services List */}
            <div className="container mx-auto mt-10 px-4">
                <h1 className="text-4xl font-bold text-center text-primary mb-10">
                    Our Services
                </h1>

                {filteredServices.length === 0 ? (
                    <p className="text-center text-gray-500">No services found.</p>
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
    );
};

export default Services;