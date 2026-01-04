import React, { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import ServiceCard, { ServiceCardSkeleton } from '../../components/ServiceCard/ServiceCard';
import { FaSearch, FaFilter } from 'react-icons/fa';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [sortBy, setSortBy] = useState('newest');
    const itemsPerPage = 12;

    useEffect(() => {
        setLoading(true);
        fetch("https://homigo-server-new.vercel.app/services")
            .then((res) => res.json())
            .then((data) => {
                setServices(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading services:", err);
                setLoading(false);
            });
    }, []);


    const filteredServices = services.filter(service => {
        const matchesSearch = service.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
        const matchesPrice = service.price >= priceRange[0] && service.price <= priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
    });

    const sortedServices = [...filteredServices].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return (b.rating || 0) - (a.rating || 0);
            default:
                return 0;
        }
    });

    const paginatedServices = sortedServices.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(sortedServices.length / itemsPerPage);

    return (
        <main className="min-h-screen bg-base-100 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <Motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl font-bold mb-2">Our Services</h1>
                    <p className="text-base-content/70">Find the perfect service provider for your needs</p>
                </Motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Filters */}
                    <Motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-base-200 p-6 rounded-xl sticky top-20">
                            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <FaFilter /> Filters
                            </h2>

                            {/* Search */}
                            <div className="mb-6">
                                <label className="font-semibold text-sm mb-2 block">Search</label>
                                <input
                                    type="text"
                                    placeholder="Service name..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            {/* Category */}
                            <div className="mb-6">
                                <label className="font-semibold text-sm mb-2 block">Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => {
                                        setSelectedCategory(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="select select-bordered w-full"
                                >
                                    <option value="all">All</option>
                                    {services
                                        .map(s => s.category)
                                        .filter(Boolean)
                                        .filter((v, i, a) => a.indexOf(v) === i)
                                        .map(cat => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <label className="font-semibold text-sm mb-2 block">Price Range</label>
                                <div className="flex gap-2 mb-3">
                                    <input
                                        type="number"
                                        min="0"
                                        value={priceRange[0]}
                                        onChange={(e) => {
                                            setPriceRange([parseInt(e.target.value), priceRange[1]]);
                                            setCurrentPage(1);
                                        }}
                                        className="input input-bordered input-sm w-1/2"
                                    />
                                    <input
                                        type="number"
                                        max="1000"
                                        value={priceRange[1]}
                                        onChange={(e) => {
                                            setPriceRange([priceRange[0], parseInt(e.target.value)]);
                                            setCurrentPage(1);
                                        }}
                                        className="input input-bordered input-sm w-1/2"
                                    />
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="500"
                                    value={priceRange[1]}
                                    onChange={(e) => {
                                        setPriceRange([priceRange[0], parseInt(e.target.value)]);
                                        setCurrentPage(1);
                                    }}
                                    className="range range-sm w-full"
                                />
                            </div>

                            {/* Sort */}
                            <div className="mb-6">
                                <label className="font-semibold text-sm mb-2 block">Sort By</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="select select-bordered w-full"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Highest Rating</option>
                                </select>
                            </div>

                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('all');
                                    setPriceRange([0, 500]);
                                    setSortBy('newest');
                                    setCurrentPage(1);
                                }}
                                className="btn btn-outline btn-error btn-block"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </Motion.div>

                    {/* Services Grid */}
                    <div className="lg:col-span-3">
                        {/* Results Info */}
                        <div className="mb-6 flex justify-between items-center">
                            <p className="text-base-content/70">
                                Showing {paginatedServices.length === 0 ? '0' : (currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, sortedServices.length)} of {sortedServices.length} results
                            </p>
                        </div>

                        {/* Services Grid */}
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => <ServiceCardSkeleton key={i} />)}
                            </div>
                        ) : paginatedServices.length > 0 ? (
                            <Motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                            >
                                {paginatedServices.map((service) => (
                                    <ServiceCard key={service._id} service={service} />
                                ))}
                            </Motion.div>
                        ) : (
                            <div className="text-center py-12 bg-base-200 rounded-xl">
                                <p className="text-lg text-base-content/70">No services found matching your criteria</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2 flex-wrap">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`btn btn-sm ${currentPage === i + 1
                                            ? 'btn-error'
                                            : 'btn-ghost'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Services;