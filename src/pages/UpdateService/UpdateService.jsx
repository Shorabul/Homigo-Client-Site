import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { motion as Motion } from "framer-motion";
import {
    FiPlusCircle,
    FiMapPin,
    FiPhone,
    FiImage,
} from "react-icons/fi";
import { GrUpdate } from "react-icons/gr";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { categories } from "../../constants/categories";

const UpdateService = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const { user } = useContext(AuthContext);
    const [availability, setAvailability] = useState([]);
    useEffect(() => {
        if (service) {
            setAvailability(service.availability || []);
        }
    }, [service]);
    const handleAvailabilityChange = (day) => {
        setAvailability((prev) =>
            prev.includes(day)
                ? prev.filter((d) => d !== day) // remove if already selected
                : [...prev, day]                // add if not selected
        );
    };


    useEffect(() => {
        fetch(`https://homigo-server-new.vercel.app/services/${id}`, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.
                    accessToken}`
            },
        })
            .then(res => res.json())
            .then(data => setService(data));
    }, [id, user.accessToken]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedService = {
            serviceName: form.serviceName.value,
            category: form.category.value,
            price: form.price.value,
            description: form.description.value,
            serviceImageURL: form.serviceImageURL.value,
            zip: form.zip.value,
            city: form.city.value,
            district: form.district.value,
        };

        fetch(`https://homigo-server-new.vercel.app/services/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedService),
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire("Updated!", "Service updated successfully.", "success");
                    navigate("/user/services"); // back to MyServices
                }
            });
    };

    if (!service) return <div className="w-full h-[50%] flex justify-center items-center "><span className="loading loading-spinner text-red-500"></span></div>
        ;

    return (<>
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
                <div className="p-8 md:p-10">
                    {/* Header */}
                    <Motion.div
                        className="flex items-center space-x-3 mb-8"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {/* <div className="bg-[#ee313120] text-red-500 p-3 rounded-full">
                            <GrUpdate size={24} />
                        </div> */}
                        <h2 className="text-3xl font-bold text-red-500">Update Service</h2>
                    </Motion.div>

                    {/* Form */}
                    <form onSubmit={handleUpdate} className="space-y-8">
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
                                    defaultValue={service.serviceName}
                                    placeholder="Enter your service name"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500focus:border-red-500 transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-base-content mb-2">
                                    Category
                                </label>
                                {/* <input
                                    type="text"
                                    name="category"
                                    value={service.category}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500focus:border-red-500 transition"
                                    readOnly
                                /> */}
                                <select
                                    name="category"
                                    defaultValue={service.category}
                                    className="appearance-none border border-neutral-content bg-base-300 rounded-md transition duration-200 select outline-[#ee313180] cursor-pointer"
                                    required
                                >
                                    <option value="" disabled>Select a category</option>

                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>

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
                                <label className="block text-sm font-semibold text-base-content mb-2">
                                    Price ($)
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    defaultValue={service.price}
                                    placeholder="Enter price"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500focus:border-red-500 transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-base-content mb-2 flex items-center gap-2">
                                    <FiImage /> Image URL
                                </label>
                                <input
                                    type="url"
                                    name="serviceImageURL"
                                    defaultValue={service.serviceImageURL}
                                    placeholder="Paste image URL"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500focus:border-red-500 transition"
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
                                <label className="block text-sm font-semibold text-base-content mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    defaultValue={service.description}
                                    rows={4}
                                    placeholder="Describe your service..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500focus:border-red-500 transition"
                                    required
                                />
                            </div>

                            <div>
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
                                            className="flex items-center gap-2 bg-base-300 p-2 rounded-lg hover:bg-[#ee313120] cursor-pointer transition"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={availability.includes(day)}
                                                onChange={() => handleAvailabilityChange(day)}
                                                className="accent-red-500"
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
                                <label className="block text-sm font-semibold text-base-content mb-2 flex items-center gap-2">
                                    <FiMapPin /> City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    defaultValue={service.city}
                                    placeholder="City"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500focus:border-red-500 transition"
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
                                    defaultValue={service.district}
                                    placeholder="District"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500focus:border-red-500 transition"
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
                                    defaultValue={service.zip}
                                    placeholder="ZIP Code"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500focus:border-red-500 transition"
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
                                className="inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-#ee313180]
                                text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-transform"
                            >
                                <GrUpdate /> Update Service
                            </Motion.button>
                        </Motion.div>
                    </form>
                </div>
            </Motion.div>
        </Motion.div>
    </>
    );
};

export default UpdateService;
