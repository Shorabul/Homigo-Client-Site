import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion as Motion } from 'framer-motion';
import { FaCalendar, FaUser, FaTag, FaClock } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import PageLoader from '../PageLoader/PageLoader';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlogs] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                const res = await fetch(`https://homigo-server-new.vercel.app/blogs/${id}`);
                const data = await res.json();
                setBlogs(data);

                // Fetch related blogs (same category)
                const allRes = await fetch('https://homigo-server-new.vercel.app/blogs');
                const allBlogs = await allRes.json();
                const related = allBlogs
                    .filter(b => b.category === data.category && b._id !== id)
                    .slice(0, 3);
                setRelatedBlogs(related);
            } catch (error) {
                console.error('Error fetching blog:', error);
                toast.error('Failed to load blog');
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) return <PageLoader />;
    if (!blog) return <p className="text-center py-12 text-base-content/70">Blog not found</p>;

    const readingTime = Math.ceil(blog.content.split(' ').length / 200);

    return (
        <main className="max-w-5xl mx-auto px-4">

            {/* Header */}
            <Motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10"
            >
                <Link
                    to="/blogs"
                    className="text-red-500 hover:text-red-600 font-medium inline-flex items-center gap-1 mb-6"
                >
                    ← Back to Blogs
                </Link>

                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-base-content mb-6">
                    {blog.title}
                </h1>

                <div className="flex flex-wrap gap-6 text-sm text-base-content/70">
                    <div className="flex items-center gap-2">
                        <FaUser size={16} />
                        <span>{blog.authorName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaCalendar size={16} />
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaClock size={16} />
                        <span>{readingTime} min read</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                        {blog.category}
                    </span>
                </div>
            </Motion.div>

            {/* Cover Image */}
            <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="mt-10 rounded-2xl overflow-hidden shadow-lg"
            >
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-[420px] object-cover"
                />
            </Motion.div>

            {/* Content Section */}
            <section className="py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <Motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2"
                    >
                        {/* Summary */}
                        <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-6 rounded-xl mb-10 shadow-sm">
                            <p className="text-lg font-semibold text-base-content">
                                {blog.summary}
                            </p>
                        </div>

                        {/* Full Content */}
                        <div className="prose prose-lg max-w-none text-base-content leading-relaxed">
                            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        </div>

                        {/* Tags */}
                        {blog.tags?.length > 0 && (
                            <div className="mt-10 pt-8 border-t border-base-300">
                                <h3 className="text-lg font-bold mb-4">Tags</h3>
                                <div className="flex flex-wrap gap-3">
                                    {blog.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 rounded-full bg-base-200 text-base-content text-sm flex items-center gap-2"
                                        >
                                            <FaTag size={12} />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Motion.div>

                    {/* Sidebar */}
                    <Motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="bg-base-200 rounded-2xl p-8 shadow-md sticky top-24">
                            <h3 className="text-xl font-bold mb-6">About the Author</h3>

                            <div className="text-center">
                                <img
                                    src={blog.authorPhoto}
                                    alt={blog.authorName}
                                    className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-red-500 object-cover"
                                />
                                <h4 className="font-bold text-lg">{blog.authorName}</h4>
                                <p className="text-sm text-base-content/70 mb-4">{blog.authorEmail}</p>
                                <p className="text-sm text-base-content/80 leading-relaxed">
                                    Expert contributor sharing insights and tips for home services.
                                </p>
                            </div>
                        </div>
                    </Motion.div>

                </div>
            </section>

            {/* Related Blogs */}
            {relatedBlogs.length > 0 && (
                <section className="py-20 bg-base-200 rounded-2xl mt-10">
                    <div className="px-4">
                        <Motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold mb-12 text-center"
                        >
                            Related Articles
                        </Motion.h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedBlogs.map((relatedBlog, idx) => (
                                <Motion.div
                                    key={relatedBlog._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-base-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                                >
                                    <div className="h-44 overflow-hidden">
                                        <img
                                            src={relatedBlog.coverImage}
                                            alt={relatedBlog.title}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <h4 className="font-bold text-lg mb-2 line-clamp-2">
                                            {relatedBlog.title}
                                        </h4>
                                        <p className="text-sm text-base-content/70 mb-4 line-clamp-2">
                                            {relatedBlog.summary}
                                        </p>
                                        <Link
                                            to={`/blog/${relatedBlog._id}`}
                                            className="inline-flex items-center gap-2 text-red-500 font-semibold hover:text-red-600"
                                        >
                                            Read <FiArrowRight size={14} />
                                        </Link>
                                    </div>
                                </Motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );

};

export default BlogDetails;