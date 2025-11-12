import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useState } from 'react';
import Swal from "sweetalert2";
import MyBookingsRow from '../../components/MyBookingsRow/MyBookingsRow';
// import toast from "react-hot-toast";

const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const [myBookings, setMyBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    // console.log(myBookings);
    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:3000/my-bookings?email=${user.email}`)
            .then(res => res.json())
            .then(bookings => {
                setMyBookings(bookings);
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
                fetch(`http://localhost:3000/bookings/${id}`, {
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
                            setMyBookings(myBookings.filter(myBookings => myBookings._id !== id));
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
            <h1 className='text-center'>My Booking</h1>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>SL No.</th>
                        <th>Service</th>
                        <th>Booking Date</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row */}
                    {
                        myBookings.map((booking, index) => (
                            <MyBookingsRow
                                key={booking._id}
                                index={index + 1}
                                booking={booking}
                                handleDelete={handleDelete}
                            ></MyBookingsRow>
                        ))
                    }
                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th>{myBookings.length}</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default MyBookings;