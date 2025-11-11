import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useState } from 'react';
import MyServiceRow from '../../components/MyServiceRow/MyServiceRow';

const MyServices = () => {
    const { user } = useContext(AuthContext);
    const [myServices, setMyServices] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:3000/my-services?email=${user.email}`)
            .then(res => res.json())
            .then(services => {
                setMyServices(services);
                setLoading(false);
            });
    }, [user]);
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
                            <MyServiceRow key={service._id} index={index + 1} service={service}></MyServiceRow>
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