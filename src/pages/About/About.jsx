import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router';
import { FaCheckCircle, FaUsers, FaLightbulb, FaAward } from 'react-icons/fa';
import { FiArrowRight, FiTarget, FiShield } from 'react-icons/fi';

const About = () => {
    const values = [
        {
            icon: FiTarget,
            title: "Trust & Integrity",
            description: "We believe in building trust through transparency and honest dealings with both customers and service providers."
        },
        {
            icon: FaUsers,
            title: "Community First",
            description: "Our platform empowers local professionals and strengthens communities by connecting neighbors with trusted services."
        },
        {
            icon: FaLightbulb,
            title: "Innovation",
            description: "We continuously innovate to make booking services easier, safer, and more convenient for everyone."
        },
        {
            icon: FaAward,
            title: "Quality",
            description: "Quality is non-negotiable. We maintain high standards through verification and customer feedback."
        }
    ];

    const teamMembers = [
        {
            name: "Sarah Johnson",
            role: "Founder & CEO",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
            description: "Visionary leader with 10+ years in service industry"
        },
        {
            name: "Mike Chen",
            role: "CTO",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
            description: "Tech innovator passionate about platform development"
        },
        {
            name: "Emma Davis",
            role: "Head of Operations",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
            description: "Expert in business operations and customer relations"
        },
        {
            name: "Alex Rodriguez",
            role: "Community Manager",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
            description: "Dedicated to building strong community connections"
        }
    ];

    const stats = [
        { number: "500+", label: "Verified Professionals" },
        { number: "10k+", label: "Happy Customers" },
        { number: "50k+", label: "Services Completed" },
        { number: "4.8★", label: "Average Rating" }
    ];

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
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            About Homigo
                        </h1>
                        <p className="text-lg md:text-xl text-red-50">
                            Connecting communities with trusted local service professionals. We believe in making quality home services accessible, affordable, and reliable for everyone.
                        </p>
                    </Motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 md:py-24 bg-base-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Image */}
                        <Motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="rounded-2xl overflow-hidden shadow-xl"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=500&fit=crop"
                                alt="Team working together"
                                className="w-full h-full object-cover"
                            />
                        </Motion.div>

                        {/* Content */}
                        <Motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div>
                                <h2 className="text-4xl font-bold text-base-content mb-4">Our Mission</h2>
                                <p className="text-lg text-base-content/80 leading-relaxed">
                                    To revolutionize the way households find and book trusted service providers. We empower local professionals to grow their businesses while giving customers peace of mind knowing they're working with verified, highly-rated experts.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-base-content mb-3">Our Vision</h3>
                                <p className="text-lg text-base-content/80 leading-relaxed">
                                    A world where quality home services are just a click away. We envision communities where trust is built through transparency, verified professionals thrive, and households enjoy seamless, reliable service experiences.
                                </p>
                            </div>

                            <Link
                                to="/services"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Explore Services <FiArrowRight />
                            </Link>
                        </Motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 md:py-20 bg-base-200">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
                        {stats.map((stat, idx) => (
                            <Motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-center"
                            >
                                <p className="text-3xl md:text-4xl font-bold text-red-500 mb-2">{stat.number}</p>
                                <p className="text-base-content/70 font-medium">{stat.label}</p>
                            </Motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 md:py-24 bg-base-100">
                <div className="container mx-auto px-4">
                    <Motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-base-content mb-4">Our Values</h2>
                        <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                            These core values guide everything we do at Homigo
                        </p>
                    </Motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, idx) => {
                            const Icon = value.icon;
                            return (
                                <Motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-base-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex justify-center mb-4">
                                        <div className="p-4 bg-red-100 rounded-full">
                                            <Icon className="text-red-500 text-3xl" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-base-content mb-3">{value.title}</h3>
                                    <p className="text-base-content/70 text-sm">{value.description}</p>
                                </Motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 md:py-24 bg-base-200">
                <div className="container mx-auto px-4">
                    <Motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-base-content mb-4">Meet Our Team</h2>
                        <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                            Passionate professionals dedicated to connecting communities
                        </p>
                    </Motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, idx) => (
                            <Motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-base-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-base-content mb-1">{member.name}</h3>
                                    <p className="text-red-500 font-semibold mb-3">{member.role}</p>
                                    <p className="text-sm text-base-content/70">{member.description}</p>
                                </div>
                            </Motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 md:py-24 bg-base-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <Motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-4xl font-bold text-base-content">
                                Why Choose Homigo?
                            </h2>

                            <div className="space-y-4">
                                {[
                                    "Verified & Vetted Professionals",
                                    "Transparent Pricing & No Hidden Fees",
                                    "Real Customer Reviews & Ratings",
                                    "Easy Booking & Flexible Scheduling",
                                    "Secure Payment Processing",
                                    "24/7 Customer Support"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <FaCheckCircle className="text-red-500 flex-shrink-0 text-lg" />
                                        <span className="text-base-content font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </Motion.div>

                        {/* Image */}
                        <Motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="rounded-2xl overflow-hidden shadow-xl"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=500&fit=crop"
                                alt="Happy customers"
                                className="w-full h-full object-cover"
                            />
                        </Motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-gradient-to-r from-red-500 to-red-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
                        <p className="text-lg text-red-50 mb-8 max-w-2xl mx-auto">
                            Join thousands of satisfied customers who have found trusted service providers through Homigo.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/services"
                                className="px-8 py-3 bg-white text-red-500 font-semibold rounded-lg hover:bg-red-50 transition-colors"
                            >
                                Browse Services
                            </Link>
                            <Link
                                to="/contact"
                                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </Motion.div>
                </div>
            </section>
        </main>
    );
};

export default About;