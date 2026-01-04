import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { motion as Motion } from 'framer-motion';
import { FiPlusCircle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const CreateBlog = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        coverImage: '',
        category: '',
        summary: '',
        content: '',
        tags: '',
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/auth/login');
            return;
        }
    }, [user, navigate]);

    const categories = [
        'Cleaning',
        'Electrical',
        'Plumbing',
        'Maintenance',
        'Tips',
        'Safety',
        'How-to',
        'Other'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.coverImage || !formData.category || !formData.summary || !formData.content) {
            toast.error('Please fill in all required fields');
            return;
        }

        const blog = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            authorName: user?.displayName || 'Anonymous',
            authorEmail: user?.email,
            authorPhoto: user?.photoURL || 'https://via.placeholder.com/150',
            createdAt: new Date(),
        };

        try {
            setLoading(true);
            const res = await fetch('https://homigo-server-new.vercel.app/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${user.accessToken}`,
                },
                body: JSON.stringify(blog),
            });

            const data = await res.json();
            if (res.ok) {
                toast.success('Blog published successfully!');
                navigate('/blog');
            } else {
                toast.error(data.message || 'Failed to publish blog');
            }
        } catch (error) {
            console.error('Error creating blog:', error);
            toast.error('Error publishing blog');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-base-100">
            <div className="container mx-auto px-4 max-w-4xl">
                <Motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl font-bold text-base-content mb-2">Create New Blog</h1>
                    <p className="text-base-content/70">Share your knowledge and insights with our community</p>
                </Motion.div>

                <Motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-base-200 rounded-xl p-8 space-y-6 shadow-lg"
                >
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-base-content mb-2">
                            Blog Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., How to Choose the Right Electrician"
                            className="w-full px-4 py-3 rounded-lg border border-base-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition bg-base-100"
                            required
                        />
                    </div>

                    {/* Cover Image URL */}
                    <div>
                        <label className="block text-sm font-semibold text-base-content mb-2">
                            Cover Image URL *
                        </label>
                        <input
                            type="url"
                            name="coverImage"
                            value={formData.coverImage}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-4 py-3 rounded-lg border border-base-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition bg-base-100"
                            required
                        />
                    </div>

                    {/* Category & Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-base-content mb-2">
                                Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-base-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition bg-base-100"
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-base-content mb-2">
                                Tags (comma-separated)
                            </label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                placeholder="home, safety, tips"
                                className="w-full px-4 py-3 rounded-lg border border-base-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition bg-base-100"
                            />
                        </div>
                    </div>

                    {/* Summary */}
                    <div>
                        <label className="block text-sm font-semibold text-base-content mb-2">
                            Summary (1-2 sentences) *
                        </label>
                        <textarea
                            name="summary"
                            value={formData.summary}
                            onChange={handleChange}
                            placeholder="Brief description of your blog post"
                            rows="3"
                            className="w-full px-4 py-3 rounded-lg border border-base-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition bg-base-100"
                            required
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-semibold text-base-content mb-2">
                            Full Content (HTML supported) *
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Write your blog content here..."
                            rows="12"
                            className="w-full px-4 py-3 rounded-lg border border-base-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition bg-base-100 font-mono text-sm"
                            required
                        />
                        {/* <p className="text-xs text-base-content/60 mt-2">
                            Tip: Use &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt; tags for formatting
                        </p> */}
                    </div>

                    {/* Author Info (Auto-filled) */}
                    <div className="bg-base-300 rounded-lg p-4">
                        <h3 className="font-bold text-base-content mb-3">Author Information (Auto-filled)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <p className="text-base-content/70">Name</p>
                                <p className="font-semibold text-base-content">{user?.displayName || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-base-content/70">Email</p>
                                <p className="font-semibold text-base-content text-xs">{user?.email}</p>
                            </div>
                            <div>
                                <p className="text-base-content/70">Photo</p>
                                <img
                                    src={user?.photoURL || 'https://via.placeholder.com/50'}
                                    alt="Author"
                                    className="w-12 h-12 rounded-full object-cover border border-base-content"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4">
                        <Motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={loading}
                            className="flex-1 py-3 px-6 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            <FiPlusCircle /> {loading ? 'Publishing...' : 'Publish Blog'}
                        </Motion.button>
                        <button
                            type="button"
                            onClick={() => navigate('/blog')}
                            className="py-3 px-6 bg-base-300 hover:bg-base-400 text-base-content font-semibold rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </Motion.form>
            </div>
        </main>
    );
};

export default CreateBlog;