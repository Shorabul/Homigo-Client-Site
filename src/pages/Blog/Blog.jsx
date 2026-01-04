import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion as Motion } from 'framer-motion';
import { FaSearch, FaCalendar, FaUser, FaTag } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState(['All']);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const res = await fetch('https://homigo-server-new.vercel.app/blogs');
                const data = await res.json();
                setBlogs(data);

                // Extract unique categories
                const uniqueCategories = ['All', ...new Set(data.map(blog => blog.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                toast.error('Failed to load blogs');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.summary.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <main className="min-h-screen bg-base-100">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-red-500 to-red-600 text-white py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <Motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Homigo Blog
                        </h1>
                        <p className="text-lg md:text-xl text-red-50">
                            Tips, guides, and insights for finding and managing home services
                        </p>
                    </Motion.div>
                </div>
            </section>

            {/* Search & Filter */}
            <section className="py-8 bg-base-200 border-b border-base-300">
                <div className="container mx-auto px-4">
                    {/* Search Bar */}
                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="relative max-w-2xl mx-auto">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" size={20} />
                            <input
                                type="text"
                                placeholder="Search blogs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-lg border border-base-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition bg-base-100"
                            />
                        </div>
                    </Motion.div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((category, idx) => (
                            <Motion.button
                                key={idx}
                                onClick={() => setSelectedCategory(category)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-4 py-2 rounded-full font-semibold transition-all ${selectedCategory === category
                                    ? 'bg-red-500 text-white shadow-lg'
                                    : 'bg-base-300 text-base-content hover:bg-base-100'
                                    }`}
                            >
                                {category}
                            </Motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-base-content/70">Loading blogs...</p>
                        </div>
                    ) : filteredBlogs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredBlogs.map((blog, idx) => (
                                <Motion.div
                                    key={blog._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-base-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col group"
                                >
                                    {/* Cover Image */}
                                    <div className="relative h-48 overflow-hidden bg-base-300">
                                        <img
                                            src={blog.coverImage}
                                            alt={blog.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                            {blog.category}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-base-content mb-3 line-clamp-2">
                                            {blog.title}
                                        </h3>

                                        {/* Summary */}
                                        <p className="text-base-content/70 text-sm mb-4 line-clamp-2 flex-grow">
                                            {blog.summary}
                                        </p>

                                        {/* Meta Info */}
                                        <div className="space-y-3 mb-4 pb-4 border-b border-base-300">
                                            <div className="flex items-center gap-3 text-xs text-base-content/60">
                                                <FaUser size={14} />
                                                <span>{blog.authorName}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-base-content/60">
                                                <FaCalendar size={14} />
                                                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        {blog.tags && blog.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {blog.tags.slice(0, 2).map((tag, i) => (
                                                    <span key={i} className="badge badge-sm badge-outline">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Read More Button */}
                                        <Link
                                            to={`/blog/${blog._id}`}
                                            className="inline-flex items-center gap-2 text-red-500 font-semibold hover:text-red-600 transition-colors"
                                        >
                                            Read More <FiArrowRight size={16} />
                                        </Link>
                                    </div>
                                </Motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-base-content/70 text-lg">No blogs found matching your search</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default Blog;