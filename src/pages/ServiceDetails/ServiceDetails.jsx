import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

const ServiceDetails = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [bookingDate, setBookingDate] = useState("");
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:3000/services/${id}`)
            .then(res => res.json())
            .then(data => setService(data))
            .catch(err => console.error("Error loading service details:", err));
    }, [id]);

    const handleBooking = (e) => {
        e.preventDefault();

        const booking = {
            userEmail: user.email,   // comes from Auth
            serviceId: service._id,
            bookingDate,
            price: service.price,
        };

        fetch("http://localhost:3000/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(booking),
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert("Booking successful!"); // replace with toast
                    setShowModal(false);
                }
            })
            .catch(err => console.error("Error booking service:", err));
    };

    if (!service) {
        return <p className="text-center mt-10">Loading service details...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
            <img
                src={service.serviceImageURL}
                alt={service.serviceName}
                className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h2 className="text-3xl font-bold mb-4">{service.serviceName}</h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <p className="text-lg font-semibold text-orange-600 mb-2">
                Price: ${service.price}
            </p>
            <p className="text-sm text-gray-500">
                Provided by: {service.providerName} ({service.providerEmail})
            </p>

            {/* Book Now Button */}
            {
                user?.email !== service.providerEmail ? <button
                    onClick={() => setShowModal(true)}
                    className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                    Book Now
                </button> : ""

            }
            {/* Booking Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Book Service</h3>
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

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-orange-500 text-white rounded"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceDetails;
