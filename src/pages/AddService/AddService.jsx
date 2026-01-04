import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-hot-toast";
import { motion as Motion } from "framer-motion";
import {
    FiPlusCircle,
    FiMapPin,
    FiTrash2,
} from "react-icons/fi";
import { useNavigate } from "react-router";
import { categories } from "../../constants/categories"

const AddService = () => {
    const createdAt = new Date();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        serviceName: "",
        category: "",
        price: "",
        description: "",
        serviceImages: [""], // Start with 1 empty field
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

    // Add image input field
    const handleAddImage = () => {
        if (formData.serviceImages.length >= 5) {
            toast.error("Maximum 5 images allowed");
            return;
        }
        setFormData((prev) => ({
            ...prev,
            serviceImages: [...prev.serviceImages, ""],
        }));
    };

    // Update image URL
    const handleImageChange = (index, value) => {
        const updatedImages = [...formData.serviceImages];
        updatedImages[index] = value;
        setFormData((prev) => ({
            ...prev,
            serviceImages: updatedImages,
        }));
    };

    // Remove image input field
    const handleRemoveImage = (index) => {
        setFormData((prev) => ({
            ...prev,
            serviceImages: prev.serviceImages.filter((_, i) => i !== index),
        }));
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

        // Validate images - filter out empty ones
        const validImages = formData.serviceImages.filter((img) => img.trim() !== "");

        if (validImages.length < 2) {
            toast.error("Please add at least 2 images");
            return;
        }

        const newService = {
            ...formData,
            price: parseFloat(formData.price),
            serviceImages: validImages,
            // Use first image as primary display image
            serviceImageURL: validImages[0],
        };

        try {
            const res = await fetch("https://homigo-server-new.vercel.app/service", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${user.accessToken}`,
                },
                body: JSON.stringify(newService),
            });

            const data = await res.json();
            if (data?.result?.insertedId) {
                toast.success("✅ Service added successfully!");
                setFormData({
                    serviceName: "",
                    category: "",
                    price: "",
                    description: "",
                    serviceImages: ["", ""],
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
                navigate('/');
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
            className="container mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <Motion.div
                className="rounded-xl shadow-sm overflow-hidden"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="p-8 md:p-10 bg-base-100">
                    {/* Header */}
                    <Motion.div
                        className="flex items-center space-x-3 mb-8"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-3xl font-bold text-red-500">
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
                                <label className="block text-sm font-semibold text-base-content mb-2">
                                    Service Name
                                </label>
                                <input
                                    type="text"
                                    name="serviceName"
                                    value={formData.serviceName}
                                    onChange={handleChange}
                                    placeholder="Enter your service name"
                                    className="w-full px-4 py-3 rounded-xl border border-base-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition bg-base-200"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-base-content mb-2">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="appearance-none border border-base-300 bg-base-200 rounded-xl transition duration-200 select outline-red-500 cursor-pointer w-full px-4 h-12"
                                    required
                                >
                                    <option value="" disabled>Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </Motion.div>

                        {/* Price */}
                        <Motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <label className="block text-sm font-semibold text-base-content mb-2">
                                Price ($)
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                                className="w-full px-4 py-3 rounded-xl border border-base-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition bg-base-200"
                                required
                            />
                        </Motion.div>

                        {/* Service Images Section */}
                        <Motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                            className="bg-base-200 rounded-xl p-6 border-2 border-dashed border-base-300"
                        >
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-base-content mb-1">
                                    Service Images
                                </label>
                                <p className="text-xs text-base-content/60">
                                    Minimum 2 images required | Maximum 5 images | Current: {formData.serviceImages.filter(img => img.trim()).length}
                                </p>
                            </div>

                            {/* Image URLs List */}
                            <div className="space-y-3 mb-4">
                                {formData.serviceImages.map((image, index) => (
                                    <Motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex items-center gap-3"
                                    >
                                        <span className="text-sm font-bold text-red-500 min-w-8 text-center">
                                            {index + 1}
                                        </span>
                                        <input
                                            type="url"
                                            value={image}
                                            onChange={(e) => handleImageChange(index, e.target.value)}
                                            placeholder={`Image URL ${index + 1}`}
                                            className="flex-1 px-4 py-3 rounded-lg border border-base-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition bg-base-100"
                                        />
                                        {formData.serviceImages.length > 1 && (
                                            <Motion.button
                                                type="button"
                                                onClick={() => handleRemoveImage(index)}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="p-2.5 rounded-lg bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition"
                                            >
                                                <FiTrash2 size={18} />
                                            </Motion.button>
                                        )}
                                    </Motion.div>
                                ))}
                            </div>

                            {/* Add Image Button */}
                            {formData.serviceImages.length < 5 && (
                                <Motion.button
                                    type="button"
                                    onClick={handleAddImage}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600 transition border-2 border-dashed border-red-300"
                                >
                                    <FiPlusCircle size={18} /> Add Another Image
                                </Motion.button>
                            )}

                            {formData.serviceImages.length >= 5 && (
                                <p className="text-sm text-base-content/60 text-center py-3">
                                    Maximum 5 images reached
                                </p>
                            )}
                        </Motion.div>

                        {/* Description */}
                        <Motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <label className="block text-sm font-semibold text-base-content mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Describe your service..."
                                className="w-full px-4 py-3 rounded-xl border border-base-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition bg-base-200"
                                required
                            />
                        </Motion.div>

                        {/* Availability */}
                        <Motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65 }}
                        >
                            <label className="block text-sm font-semibold text-base-content mb-3">
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
                                        className="flex items-center gap-2 p-2 px-3 rounded-lg hover:bg-red-100 cursor-pointer transition border border-base-300 bg-base-200"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.availability.includes(day)}
                                            onChange={() => handleAvailabilityChange(day)}
                                            className="accent-red-500"
                                        />
                                        <span className="text-sm font-medium">{day}</span>
                                    </label>
                                ))}
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
                                <label className="block text-sm font-semibold text-base-content mb-2">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="w-full px-4 py-3 rounded-xl border border-base-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition bg-base-200"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-base-content mb-2">
                                    District
                                </label>
                                <input
                                    type="text"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    placeholder="District"
                                    className="w-full px-4 py-3 rounded-xl border border-base-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition bg-base-200"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-base-content mb-2">
                                    ZIP
                                </label>
                                <input
                                    type="text"
                                    name="zip"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    placeholder="ZIP Code"
                                    className="w-full px-4 py-3 rounded-xl border border-base-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition bg-base-200"
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
                                className="cursor-pointer inline-flex items-center justify-center gap-2 brand-color-bg hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-transform"
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
