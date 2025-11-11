import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useState } from 'react';

const MyServices = () => {
    const { user } = useContext(AuthContext);
    const [myServices, setMyServices] = useState([]);
    const [loading, setLoading] = useState(true)

    console.log(myServices);
    useEffect(() => {
        fetch(`http://localhost:3000/user/services?email=${user.email}`)
            .then(res => res.json())
            .then(services => {
                setMyServices(services)
                setLoading(false)
            });
    }, [user]);
    if (loading) {
        return <div> Please wait ... Loading...</div>
    }
    return (
        <div>
            data
        </div>
    );
};

export default MyServices;