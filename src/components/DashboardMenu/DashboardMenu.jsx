import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router";
import { RxCaretUp, RxCaretDown } from "react-icons/rx";

const DashboardMenu = ({ user }) => {
    const [dashboardToggle, setDashboardToggle] = useState(false);
    const menuRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setDashboardToggle(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        user && (
            <div ref={menuRef} className="dropdown relative">
                {/* Trigger */}
                <button
                    onClick={() => setDashboardToggle(!dashboardToggle)}
                    className="cursor-pointer hover:text-primary transition-colors flex items-center"
                >
                    Dashboard {dashboardToggle ? <RxCaretUp /> : <RxCaretDown />}
                </button>

                {/* Dropdown content */}
                <ul
                    className={`dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 absolute right-0 mt-2 z-50 
            ${dashboardToggle ? "block" : "hidden"} group-hover:block`}
                >
                    <li><NavLink to='/profile'>Profile</NavLink></li>
                    <li><NavLink to='/add-service'>Add Service</NavLink></li>
                    <li><NavLink to='/user/services'>My Services</NavLink></li>
                    <li><NavLink to='/user/bookings'>My Bookings</NavLink></li>
                </ul>
            </div>
        )
    );
};

export default DashboardMenu;
