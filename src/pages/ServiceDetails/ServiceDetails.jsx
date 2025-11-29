import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import StarRating from "../../components/StarRating/StarRating";
import { toast } from "react-hot-toast";
import PageLoader from "../PageLoader/PageLoader";
import { motion as Motion } from "framer-motion";
import { getAuth } from "firebase/auth";
import {
    FiMapPin,
    FiDollarSign,
    FiUser,
    FiCalendar,
    FiStar,
} from "react-icons/fi";
import { PiClockClockwiseBold } from "react-icons/pi";

const ServiceDetails = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [bookingDate, setBookingDate] = useState("");
    const { user } = useContext(AuthContext);
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);

    const auth = getAuth();

    useEffect(() => {
        const fetchService = async () => {
            try {
                const token = await auth.currentUser.getIdToken();
                const res = await fetch(`https://homigo-server-new.vercel.app/services/${id}`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch service details");
                }

                const data = await res.json();
                setService(data);
                setLoading(false);
            } catch (err) {
                console.error("Error loading service details:", err);
                toast.error("Unauthorized or failed to load service details");
                setLoading(false);
            }
        };

        if (user) {
            fetchService();
        }
    }, [id, user, auth]);


    const handleBooking = async (e) => {
        e.preventDefault();

        try {
            const token = await auth.currentUser.getIdToken();

            const booking = {
                userEmail: user.email,
                serviceId: service._id,
                bookingDate,
                price: service.price,
            };

            const res = await fetch("https://homigo-server-new.vercel.app/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(booking),
            });

            const data = await res.json();

            if (res.ok && data.insertedId) {
                toast.success("Booking successful!");
                setShowModal(false);
            } else if (data.error) {
                toast.error(data.error);
            } else {
                toast.error("Booking failed. Try again.");
            }
        } catch (err) {
            console.error("Error booking service:", err);
            toast.error("Error booking service.");
        }
    };


    const handleSubmitReview = async (e) => {
        e.preventDefault();
        const comment = e.target.comment.value;

        try {
            const token = await auth.currentUser.getIdToken();

            const review = {
                userName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                rating,
                comment,
                createdAt: new Date(),
            };

            await fetch(`https://homigo-server-new.vercel.app/services/${service._id}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(review),
            });


            const refreshed = await fetch(`https://homigo-server-new.vercel.app/services/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            const updatedService = await refreshed.json();
            setService(updatedService);

            e.target.reset();
            setRating(0);
            toast.success("Review added!");
        } catch (err) {
            console.error("Error submitting review:", err);
            toast.error("Failed to submit review.");
        }
    };

    if (loading) return <PageLoader />;
    if (!service) return <p>No service found</p>;

    return (
        <div>
            <div className="max-w-4xl mx-auto mt-10 p-6 rounded-xl shadow-lg bg-base-300">
                {/* Service Image */}
                <Motion.img
                    src={service.serviceImageURL}
                    alt={service.serviceName}
                    className="w-full h-full object-cover rounded-lg mb-6"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                />

                {/* Service Info */}
                <Motion.h2
                    className="text-3xl font-bold mb-4 text-[#ee3131] flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {service.serviceName}
                </Motion.h2>

                <p className="text-base-content mb-4">{service.description}</p>

                <p className="text-lg font-semibold text-[#ee3131] mb-2 flex items-center gap-2">
                    <FiDollarSign /> Price: ${service.price}
                </p>

                <p className="text-sm mb-2 flex text-base-content/90 items-center gap-2">
                    <FiUser /> Provided by:{" "}
                    <span className="font-semibold">{service.providerName}</span> (
                    {service.providerEmail})
                </p>

                <p className="text-sm text-base-content/90 mb-2 flex items-center gap-2">
                    <FiMapPin /> Location: <span className="font-semibold">{service.city}, {service.district} {service.zip}</span>
                </p>

                <p className="text-sm text-base-content/90 mb-2 flex items-center gap-2">
                    <PiClockClockwiseBold /> Availability: <span className="font-semibold">{service.availability?.join(", ")}</span>
                </p>

                {/* Book Now Button */}
                {/* {user?.email !== service.providerEmail && (
                    <Motion.button
                        onClick={() => setShowModal(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2"
                    >
                        <FiCalendar /> Book Now
                    </Motion.button>
                )} */}
                <Motion.button
                    onClick={() => setShowModal(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={user?.email === service.providerEmail}
                    className={`mt-6 py-2 px-5 lg:px-6 lg:py-3 rounded-md font-medium text-sm md:text-base lg:text-lg transition flex items-center gap-2
        ${user?.email === service.providerEmail
                            ? "bg-base-content/20 text-white cursor-not-allowed"
                            : "brand-color-bg hover:bg-[#ee313180] text-white"
                        }`}
                >
                    <FiCalendar /> Book Now
                </Motion.button>


                {/* Booking Modal */}
                {showModal && (
                    <Motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <Motion.div
                            className="bg-base-300 rounded-lg p-6 w-full max-w-md"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-xl font-bold mb-4 text-[#ee3131]">Book Service</h3>
                            <p className="mb-2">Service: {service.serviceName}</p>
                            <p className="mb-2">Price: ${service.price}</p>
                            <p className="mb-2">Your Email: {user.email}</p>

                            <form onSubmit={handleBooking}>
                                <label className="block mb-2">Booking Date</label>
                                <input
                                    type="date"
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    className="border rounded px-3 py-2 w-full mb-4"
                                    required
                                />

                                <div className="flex justify-end gap-3 text-sm md:text-base lg:text-lg">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-3 py-1.5 md:px-4 md:py-2 bg-base-content/20 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-3 py-1.5 md:px-4 md:py-2 brand-color-bg text-white rounded-md font-medium text-sm md:text-base lg:text-lg"
                                    >
                                        Confirm Booking
                                    </button>
                                </div>
                            </form>
                        </Motion.div>
                    </Motion.div>
                )}

                {/* Reviews Section */}
                <Motion.div
                    className="mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {/* Add Review Form */}
                    <form onSubmit={handleSubmitReview} className="mt-6 space-y-4">
                        <label className="block text-base-content/90">
                            Rating
                            <StarRating onChange={(value) => setRating(value)} />
                        </label>

                        <label className="block text-base-content/90">
                            Comment
                            <textarea
                                name="comment"
                                rows="3"
                                required
                                className="shadow-md border border-neutral-content rounded-md outline-[#ee3131] px-3 py-2 w-full bg-base-200"
                                placeholder="Give Us Your Feedback"
                            />
                        </label>

                        <Motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="brand-color-bg hover:bg-[#ee313180] text-white py-2 px-5 lg:px-6 lg:py-3 font-medium rounded-md flex items-center gap-2"
                        >
                            <FiStar /> Submit Review
                        </Motion.button>
                    </form>
                    <h3 className="text-2xl font-bold mt-4 mb-2 text-[#ee3131] flex items-center gap-2">
                        <FiStar /> Reviews
                    </h3>

                    {service.reviews?.length > 0 ?
                        (
                            service.reviews
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // newest → oldest
                                .map((review, idx) => (
                                    <Motion.div
                                        key={idx}
                                        className="p-4 rounded-lg mb-3 bg-base-200 shadow-lg"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={review.photoURL}
                                                alt={review.userName}
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <span className="font-semibold text-base-content/90">{review.userName}</span>
                                            <span className="text-yellow-500">⭐ {review.rating}</span>
                                        </div>

                                        <p className="mt-2 text-base-content/80">{review.comment}</p>

                                        <small className="text-base-content/60">
                                            {new Date(review.createdAt).toLocaleString()}
                                        </small>
                                    </Motion.div>
                                ))

                        ) : (
                            <p className="text-base-content/60">No reviews yet. Be the first!</p>
                        )}


                </Motion.div>

            </div>

        </div>
    );
};

export default ServiceDetails;