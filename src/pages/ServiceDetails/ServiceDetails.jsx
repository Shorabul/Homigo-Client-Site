import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import StarRating from "../../components/StarRating/StarRating";
import { toast } from "react-hot-toast";
import PageLoader from "../PageLoader/PageLoader";
import { motion as Motion } from "framer-motion";
import {
    FiMapPin,
    FiDollarSign,
    FiUser,
    FiCalendar,
    FiStar,
    FiChevronLeft,
    FiChevronRight,
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
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await fetch(`https://homigo-server-new.vercel.app/service/${id}`);

                if (!res.ok) {
                    throw new Error("Failed to fetch service");
                }

                const data = await res.json();
                setService(data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load service details");
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);

    const handleBooking = async (e) => {
        e.preventDefault();

        // AUTH GUARD
        if (!user) {
            toast.error("Please login to book this service");
            navigate("/auth/login", {
                state: { from: location.pathname }
            });
            return;
        }

        try {

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
                    authorization: `Bearer ${user.accessToken}`,
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

    const checkUser = () => {
        if (!user) {
            toast.error("Please login to book this service");
            navigate("/auth/login", {
                state: { from: location.pathname }
            });
            return;
        }
        return setShowModal(true);

    }



    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("Please login to book this service");
            navigate("/auth/login", {
                state: { from: location.pathname }
            });
            return;
        }
        const comment = e.target.comment.value;

        try {


            const review = {
                userName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                rating,
                comment,
                createdAt: new Date(),
            };

            await fetch(`https://homigo-server-new.vercel.app/service/${service._id}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${user.accessToken}`,
                },
                body: JSON.stringify(review),
            });


            const refreshed = await fetch(`https://homigo-server-new.vercel.app/service/${id}`, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`,
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
    if (!service) return <p className="text-center py-12 text-base-content/70">No service found</p>;

    // Get images from serviceImages array or use serviceImageURL as fallback
    const images = service.serviceImages && service.serviceImages.length > 0
        ? service.serviceImages
        : [service.serviceImageURL];

    const currentImage = images[selectedImageIndex] || images[0];

    const handlePrevImage = () => {
        setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <main className="min-h-screen bg-base-100 py-8 md:py-12">
            <div className="container mx-auto px-4">
                {/* Service Header */}
                <Motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-2">
                        {service.serviceName}
                    </h1>
                    <div className="flex items-center gap-4 text-sm md:text-base">
                        <span className="badge badge-error">${service.price}</span>
                        <span className="text-base-content/70">by {service.providerName}</span>
                    </div>
                </Motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Image & Info Section */}
                    <div className="lg:col-span-2">
                        {/* Service Image Gallery */}
                        <Motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="bg-base-200 rounded-xl overflow-hidden shadow-lg mb-6"
                        >
                            {/* Main Image */}
                            <div className="relative w-full h-96 overflow-hidden group">
                                <Motion.img
                                    key={selectedImageIndex}
                                    src={currentImage}
                                    alt={service.serviceName}
                                    className="w-full h-full object-cover"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Navigation Arrows */}
                                {images.length > 1 && (
                                    <>
                                        <Motion.button
                                            onClick={handlePrevImage}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <FiChevronLeft size={24} />
                                        </Motion.button>
                                        <Motion.button
                                            onClick={handleNextImage}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <FiChevronRight size={24} />
                                        </Motion.button>
                                    </>
                                )}

                                {/* Image Counter */}
                                {images.length > 1 && (
                                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        {selectedImageIndex + 1} / {images.length}
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Images */}
                            {images.length > 1 && (
                                <div className="p-4 bg-base-100 border-t border-base-300">
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                        {images.map((image, index) => (
                                            <Motion.button
                                                key={index}
                                                onClick={() => setSelectedImageIndex(index)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`relative rounded-lg overflow-hidden border-2 transition-all h-24 sm:h-28 ${selectedImageIndex === index
                                                    ? "border-red-500 ring-2 ring-red-500"
                                                    : "border-base-300 hover:border-red-300"
                                                    }`}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.src = "https://via.placeholder.com/100?text=Image";
                                                    }}
                                                />
                                                {selectedImageIndex === index && (
                                                    <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                                                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                                            <FiStar className="text-white fill-white" size={14} />
                                                        </div>
                                                    </div>
                                                )}
                                            </Motion.button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Motion.div>

                        {/* Description */}
                        <Motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-base-200 rounded-xl p-6 mb-6"
                        >
                            <h2 className="text-2xl font-bold text-base-content mb-3">About This Service</h2>
                            <p className="text-base-content/80 leading-relaxed">{service.description}</p>
                        </Motion.div>

                        {/* Service Details Grid */}
                        <Motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-base-200 rounded-xl p-6"
                        >
                            <div className="flex items-start gap-3">
                                <FiMapPin className="text-red-500 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <p className="font-semibold text-sm text-base-content/70">Location</p>
                                    <p className="text-base-content font-medium">{service.city}, {service.district} {service.zip}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <PiClockClockwiseBold className="text-red-500 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <p className="font-semibold text-sm text-base-content/70">Availability</p>
                                    <p className="text-base-content font-medium">{service.availability?.join(", ")}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <FiUser className="text-red-500 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <p className="font-semibold text-sm text-base-content/70">Provider</p>
                                    <p className="text-base-content font-medium">{service.providerName}</p>
                                    <p className="text-xs text-base-content/60">{service.providerEmail}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <FiDollarSign className="text-red-500 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <p className="font-semibold text-sm text-base-content/70">Price</p>
                                    <p className="text-2xl font-bold text-red-500">${service.price}</p>
                                </div>
                            </div>
                        </Motion.div>
                    </div>

                    {/* Booking Card */}
                    <Motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="sticky top-36 h-fit bg-base-200 rounded-xl p-6 shadow-lg"
                    >
                        <h3 className="text-xl font-bold text-base-content mb-4">Booking Details</h3>

                        <div className="space-y-3 mb-6 pb-6 border-b border-base-300">
                            <div className="flex justify-between items-center">
                                <span className="text-base-content/70">Service Price:</span>
                                <span className="font-bold text-lg">${service.price}</span>
                            </div>
                        </div>

                        <Motion.button
                            onClick={checkUser}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={user?.email === service?.providerEmail}
                            className={`w-full py-3 rounded-lg font-semibold text-base flex items-center justify-center gap-2 transition-all ${user?.email === service?.providerEmail
                                ? "bg-base-300 text-base-content/50 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                                }`}
                        >
                            <FiCalendar size={20} /> Book Now
                        </Motion.button>

                        {user?.email === service?.providerEmail && (
                            <p className="text-xs text-base-content/60 text-center mt-3">You cannot book your own service</p>
                        )}
                    </Motion.div>
                </div>

                {/* Booking Modal */}
                {showModal && user && (
                    <Motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <Motion.div
                            className="bg-base-100 rounded-xl p-6 w-full max-w-md shadow-2xl"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-2xl font-bold mb-6 text-base-content">Confirm Booking</h3>

                            <div className="space-y-4 mb-6 pb-6 border-b border-base-300">
                                <div>
                                    <p className="text-sm text-base-content/70 mb-1">Service</p>
                                    <p className="font-semibold text-base-content">{service.serviceName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-base-content/70 mb-1">Price</p>
                                    <p className="font-bold text-red-500 text-lg">${service.price}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-base-content/70 mb-1">Your Email</p>
                                    <p className="text-base-content">{user.email}</p>
                                </div>
                            </div>

                            <form onSubmit={handleBooking} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-base-content mb-2">
                                        Booking Date
                                    </label>
                                    <input
                                        type="date"
                                        value={bookingDate}
                                        onChange={(e) => setBookingDate(e.target.value)}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="btn btn-outline flex-1"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn bg-red-500 text-white flex-1"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </form>
                        </Motion.div>
                    </Motion.div>
                )}

                {/* Reviews Section */}
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12"
                >
                    <h2 className="text-3xl font-bold text-base-content mb-8 flex items-center gap-3">
                        <FiStar className="text-red-500" size={28} /> Customer Reviews
                    </h2>

                    {/* Add Review Form */}
                    <Motion.form
                        onSubmit={handleSubmitReview}
                        className="bg-base-200 rounded-xl p-6 mb-8"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h3 className="text-xl font-bold text-base-content mb-4">Share Your Review</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-base-content mb-2">
                                    Rating
                                </label>
                                <StarRating onChange={(value) => setRating(value)} />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-base-content mb-2">
                                    Your Comment
                                </label>
                                <textarea
                                    name="comment"
                                    rows="4"
                                    required
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Share your experience with this service..."
                                />
                            </div>

                            <Motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn bg-red-500 text-white w-full flex items-center justify-center gap-2"
                            >
                                <FiStar size={18} /> Submit Review
                            </Motion.button>
                        </div>
                    </Motion.form>

                    {/* Reviews List */}
                    {service.reviews?.length > 0 ? (
                        <div className="space-y-4">
                            {service.reviews
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                .map((review, idx) => (
                                    <Motion.div
                                        key={idx}
                                        className="bg-base-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={review.photoURL}
                                                    alt={review.userName}
                                                    className="w-10 h-10 rounded-full object-cover border-2 border-red-500"
                                                />
                                                <div>
                                                    <p className="font-bold text-base-content">{review.userName}</p>
                                                    <p className="text-xs text-base-content/60">
                                                        {new Date(review.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <FiStar
                                                        key={i}
                                                        className={`${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-base-300'
                                                            }`}
                                                        size={16}
                                                    />
                                                ))}
                                                <span className="ml-1 font-semibold text-base-content">{review.rating}</span>
                                            </div>
                                        </div>
                                        <p className="text-base-content/80 leading-relaxed">{review.comment}</p>
                                    </Motion.div>
                                ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-base-200 rounded-xl">
                            <FiStar className="mx-auto mb-3 text-base-content/40" size={40} />
                            <p className="text-base-content/60">No reviews yet. Be the first to review!</p>
                        </div>
                    )}
                </Motion.div>
            </div>
        </main>
    );
};

export default ServiceDetails;