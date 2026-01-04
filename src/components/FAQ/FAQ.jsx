import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const FAQ = () => {
    const [expandedIndex, setExpandedIndex] = useState(0);

    const faqData = [
        {
            question: "How do I book a service on Homigo?",
            answer: "To book a service, first browse our available services on the Services page. Once you find a service you like, click on it to view details. Then click the 'Book Now' button, select your preferred date, and confirm your booking. You'll receive a confirmation message via toast notification."
        },
        {
            question: "Are all service providers verified?",
            answer: "Yes, all service providers on Homigo are verified professionals. They undergo a thorough vetting process including background checks and skill verification to ensure quality service delivery and customer safety."
        },
        {
            question: "What if I need to cancel my booking?",
            answer: "You can cancel your booking for free up to 24 hours before the scheduled service time. Simply go to 'My Bookings' in your dashboard, find the booking you want to cancel, and click the delete button. Cancellations made within 24 hours of service may incur a fee."
        },
        {
            question: "How is payment processed?",
            answer: "Payment is processed securely through our encrypted payment gateway. We use industry-standard SSL encryption to protect your financial information. Payment is collected at the time of booking confirmation."
        },
        {
            question: "Can I leave a review without booking a service?",
            answer: "No, you can only leave a review for services you have booked. This ensures authentic feedback from actual customers who have experienced the service. Reviews help other customers make informed decisions."
        },
        {
            question: "How do I become a service provider on Homigo?",
            answer: "To become a service provider, create an account and complete your profile with relevant details. Then navigate to 'Add Service' and fill in your service information including name, category, price, location, and availability. Your profile will be reviewed and approved within 24-48 hours."
        },
        {
            question: "What should I do if I'm not satisfied with a service?",
            answer: "If you're unsatisfied with a service, please contact our customer support team immediately with details about your experience. We'll investigate the issue and work with the provider to resolve it. In case of severe issues, we offer a refund or credit option."
        },
        {
            question: "Is my personal information safe?",
            answer: "Yes, your privacy and security are our top priorities. We use encrypted connections, secure databases, and comply with data protection regulations. Your personal and payment information is never shared with third parties without your consent."
        },
        {
            question: "How do I update my profile?",
            answer: "You can update your profile by going to Dashboard > Profile. Here you can change your name, email, phone number, profile picture, and other personal details. Click 'Save' to confirm any changes."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and digital payment methods. During checkout, you'll see all available payment options for your region."
        }
    ];

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? -1 : index);
    };

    return (
        <section className="py-12 md:py-20 bg-base-100">
            <div className="container mx-auto px-4">
                {/* Header */}
                <Motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-snug text-base-content">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                        Find answers to common questions about booking services, payments, cancellations, and more.
                    </p>
                </Motion.div>

                {/* FAQ Accordion */}
                <div className="space-y-3">
                    {faqData.map((item, index) => (
                        <Motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <div className="bg-base-200 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                                {/* Question Button */}
                                <button
                                    onClick={() => toggleExpand(index)}
                                    className="w-full px-6 py-4 md:py-5 flex items-center justify-between hover:bg-base-300 transition-colors text-left"
                                >
                                    <h3 className="text-base md:text-lg font-semibold text-base-content pr-4">
                                        {item.question}
                                    </h3>
                                    <Motion.div
                                        animate={{
                                            rotate: expandedIndex === index ? 180 : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-shrink-0"
                                    >
                                        <FiChevronDown className="text-red-500" size={24} />
                                    </Motion.div>
                                </button>

                                {/* Answer - Expandable */}
                                <Motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: expandedIndex === index ? "auto" : 0,
                                        opacity: expandedIndex === index ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 py-4 bg-base-100 border-t border-base-300">
                                        <p className="text-base-content/80 leading-relaxed text-sm md:text-base">
                                            {item.answer}
                                        </p>
                                    </div>
                                </Motion.div>
                            </div>
                        </Motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 bg-red-500/10 border-2 border-red-500 rounded-xl p-8 text-center"
                >
                    <h3 className="text-2xl font-bold text-base-content mb-3">
                        Still have questions?
                    </h3>
                    <p className="text-base-content/70 mb-6">
                        Can't find the answer you're looking for? Please contact our customer support team.
                    </p>
                    <a
                        href="mailto:support@homigo.com"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Contact Support
                    </a>
                </Motion.div>
            </div>
        </section>
    );
};

export default FAQ;