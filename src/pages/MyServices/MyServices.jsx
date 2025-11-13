import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import MyServiceRow from "../../components/MyServiceRow/MyServiceRow";
import Swal from "sweetalert2";
import { motion as Motion } from "framer-motion";
import PageLoader from "../PageLoader/PageLoader";

const MyServices = () => {
    const { user } = useContext(AuthContext);
    const [myServices, setMyServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`https://homigo-server-new.vercel.app/my-services?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.
                    accessToken}`
            }
        })
            .then((res) => res.json())
            .then((services) => {
                setMyServices(services);
                setLoading(false);
            });
    }, [user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2563eb", // brand primary
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://homigo-server-new.vercel.app/services/${id}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${user.
                            accessToken}`,
                    }
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your service has been deleted.",
                                icon: "success",
                            });
                            setMyServices(myServices.filter((service) => service._id !== id));
                        }
                    })
                    .catch((err) => console.error("Error deleting service:", err));
            }
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <PageLoader></PageLoader>
            </div>
        );
    }

    return (
        <Motion.div
            className="overflow-x-auto max-w-5xl mx-auto mt-10 p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-center text-3xl font-bold text-primary mb-6">
                My Services
            </h1>
            <table className="table table-zebra w-full">
                {/* head */}
                <thead className="bg-primary text-white">
                    <tr>
                        <th>SL No.</th>
                        <th>Service</th>
                        <th>Provider</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {myServices.map((service, index) => (
                        <MyServiceRow
                            key={service._id}
                            index={index + 1}
                            service={service}
                            handleDelete={handleDelete}
                        />
                    ))}
                </tbody>
                <tfoot className="">
                    <tr>
                        <th>Total</th>
                        <th>{myServices.length}</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </Motion.div>
    );
};

export default MyServices;
