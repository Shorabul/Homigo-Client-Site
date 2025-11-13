import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-hot-toast";
import { motion as Motion } from "framer-motion";
import {
    FiPlusCircle,
    FiMapPin,
    FiPhone,
    FiImage,
} from "react-icons/fi";

const AddService = () => {
    const createdAt = new Date();
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        serviceName: "",
        category: "",
        price: "",
        description: "",
        serviceImageURL: "",
        providerName: "",
        providerEmail: "",
        city: "",
        zip: "",
        district: "",
        phone: "",
        availability: [],
        createdAt,
        ratings: 0,
        reviews: [],
    });

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                providerName: user.displayName || "",
                providerEmail: user.email || "",
                phone: user.phoneNumber || "",
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvailabilityChange = (day) => {
        setFormData((prev) => ({
            ...prev,
            availability: prev.availability.includes(day)
                ? prev.availability.filter((d) => d !== day)
                : [...prev.availability, day],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newService = {
            ...formData,
            price: parseFloat(formData.price),
        };

        try {
            const res = await fetch("http://localhost:3000/service", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${user.accessToken}`,
                },
                body: JSON.stringify(newService),
            });

            const data = await res.json();
            console.log(data);
            if (data?.result?.insertedId) {
                toast.success("✅ Service added successfully!");
                setFormData({
                    serviceName: "",
                    category: "",
                    price: "",
                    description: "",
                    serviceImageURL: "",
                    providerName: user?.displayName || "",
                    providerEmail: user?.email || "",
                    city: "",
                    zip: "",
                    district: "",
                    phone: user?.phoneNumber || "",
                    availability: [],
                    createdAt,
                    ratings: 0,
                    reviews: [],
                });
            } else {
                toast.error("❌ Failed to add service");
            }
        } catch (error) {
            toast.error("Something went wrong!");
            console.error("Error adding service:", error);
        }
    };

    return (
        <Motion.div
            className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-12 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <Motion.div
                className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="p-8 md:p-10">
                    {/* Header */}
                    <Motion.div
                        className="flex items-center space-x-3 mb-8"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="bg-primary/10 text-primary p-3 rounded-full">
                            <FiPlusCircle size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-primary">
                            Add New Service
                        </h2>
                    </Motion.div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Service Name & Category */}
                        <Motion.div
                            className="grid md:grid-cols-2 gap-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div>
                                <label className="block text-sm font-semibold text-secondary-content  mb-2">
                                    Service Name
                                </label>
                                <input
                                    type="text"
                                    name="serviceName"
                                    value={formData.serviceName}
                                    onChange={handleChange}
                                    placeholder="Enter your service name"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-secondary-content mb-2">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    placeholder="e.g. Home Repair, Cleaning"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    required
                                />
                            </div>
                        </Motion.div>

                        {/* Price & Image URL */}
                        <Motion.div
                            className="grid md:grid-cols-2 gap-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div>
                                <label className="block text-sm font-semibold text-secondary-content mb-2">
                                    Price ($)
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="Enter price"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-secondary-content mb-2 flex items-center gap-2">
                                    <FiImage /> Image URL
                                </label>
                                <input
                                    type="url"
                                    name="serviceImageURL"
                                    value={formData.serviceImageURL}
                                    onChange={handleChange}
                                    placeholder="Paste image URL"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    required
                                />
                            </div>
                        </Motion.div>

                        {/* Description & Availability */}
                        <Motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div>
                                <label className="block text-sm font-semibold text-secondary-content mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Describe your service..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-secondary-content mb-3">
                                    Availability
                                </label>
                                <div className="flex flex-wrap items-center gap-2">
                                    {[
                                        "Monday",
                                        "Tuesday",
                                        "Wednesday",
                                        "Thursday",
                                        "Friday",
                                        "Saturday",
                                        "Sunday",
                                    ].map((day) => (
                                        <label
                                            key={day}
                                            className="flex items-center gap-2 bg-base-100 p-2 rounded-lg hover:bg-primary/10 cursor-pointer transition"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formData.availability.includes(day)}
                                                onChange={() => handleAvailabilityChange(day)}
                                                className="accent-primary"
                                            />
                                            <span className="text-sm">{day}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </Motion.div>

                        {/* Location */}
                        <Motion.div
                            className="grid md:grid-cols-3 gap-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <div>
                                <label className="block text-sm font-semibold text-secondary-content  mb-2 flex items-center gap-2">
                                    <FiMapPin /> City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-secondary-content mb-2">
                                    District
                                </label>
                                <input
                                    type="text"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    placeholder="District"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-secondary-content  mb-2">
                                    ZIP
                                </label>
                                <input
                                    type="text"
                                    name="zip"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    placeholder="ZIP Code"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    required
                                />
                            </div>
                        </Motion.div>

                        {/* Submit */}
                        <Motion.div
                            className="text-center pt-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <Motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/80 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-transform"
                            >
                                <FiPlusCircle /> Add Service
                            </Motion.button>
                        </Motion.div>
                    </form>
                </div>
            </Motion.div>
        </Motion.div>

    );
};

export default AddService;