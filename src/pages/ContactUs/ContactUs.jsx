import React from 'react';
import { motion as Motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const ContactUs = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here (e.g., EmailJS or Formspree)
        toast.success("Message sent! We'll get back to you shortly.");
        e.target.reset();
    };

    const contactInfo = [
        {
            icon: <FiPhone className="w-6 h-6" />,
            title: "Phone",
            details: "+1 (555) 000-0000",
            subText: "Mon-Fri from 8am to 6pm"
        },
        {
            icon: <FiMail className="w-6 h-6" />,
            title: "Email",
            details: "support@homigo.com",
            subText: "Online support 24/7"
        },
        {
            icon: <FiMapPin className="w-6 h-6" />,
            title: "Office",
            details: "123 Service Lane",
            subText: "New York, NY 10001"
        },
        {
            icon: <FiClock className="w-6 h-6" />,
            title: "Working Hours",
            details: "9:00 AM - 9:00 PM",
            subText: "Available Weekends"
        }
    ];

    return (
        <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-base-100">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <Motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 font-bold tracking-wide uppercase text-sm"
                    >
                        Contact Us
                    </Motion.h2>
                    <Motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-2 text-4xl font-extrabold text-base-content sm:text-5xl"
                    >
                        Get in touch with <span className="text-red-500">Homigo</span>
                    </Motion.h1>
                    <p className="mt-4 text-xl text-base-content/70 max-w-2xl mx-auto">
                        Have questions about a service or need help with a booking? Our team is here to help you 24/7.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Info Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {contactInfo.map((item, idx) => (
                            <Motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-6 bg-base-200 rounded-2xl border border-base-300 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                                <p className="text-base-content font-medium">{item.details}</p>
                                <p className="text-sm text-base-content/60">{item.subText}</p>
                            </Motion.div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <Motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-base-200 p-8 rounded-3xl shadow-xl border border-base-300"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label text-xs font-bold uppercase opacity-70">Full Name</label>
                                    <input type="text" placeholder="John Doe" className="input input-bordered focus:border-red-500 outline-none w-full bg-base-100" required />
                                </div>
                                <div className="form-control">
                                    <label className="label text-xs font-bold uppercase opacity-70">Email Address</label>
                                    <input type="email" placeholder="john@example.com" className="input input-bordered focus:border-red-500 outline-none w-full bg-base-100" required />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label text-xs font-bold uppercase opacity-70">Subject</label>
                                <select className="select select-bordered focus:border-red-500 w-full bg-base-100">
                                    <option>General Inquiry</option>
                                    <option>Booking Issue</option>
                                    <option>Become a Provider</option>
                                    <option>Refund Request</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label text-xs font-bold uppercase opacity-70">Message</label>
                                <textarea className="textarea textarea-bordered focus:border-red-500 h-32 bg-base-100 block" placeholder="How can we help you?" required></textarea>
                            </div>

                            <button type="submit" className="btn bg-red-500 hover:bg-red-600 border-none text-white w-full group">
                                Send Message
                                <FiSend className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </Motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;