import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useState } from 'react';
import MyServiceRow from '../../components/MyServiceRow/MyServiceRow';
import Swal from "sweetalert2";
// import toast from "react-hot-toast";

const MyServices = () => {
    const { user } = useContext(AuthContext);
    const [myServices, setMyServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:3000/my-services?email=${user.email}`)
            .then(res => res.json())
            .then(services => {
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
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/services/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your service has been deleted.",
                                icon: "success"
                            });
                            setMyServices(myServices.filter(service => service._id !== id));
                        }
                    })
                    .catch(err => console.error("Error deleting service:", err));
            }
        });
    };


    if (loading) {
        return <div> Please wait ... Loading...</div>
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>SL No.</th>
                        <th>Service</th>
                        <th>Provider</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row */}
                    {
                        myServices.map((service, index) => (
                            <MyServiceRow
                                key={service._id}
                                index={index + 1}
                                service={service}
                                handleDelete={handleDelete}
                            ></MyServiceRow>
                        ))
                    }
                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th>{myServices.length}</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default MyServices;