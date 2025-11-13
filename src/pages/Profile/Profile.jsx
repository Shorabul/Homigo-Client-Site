import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router";
import { FaUserEdit, FaUser, FaAt, FaPhoneAlt } from "react-icons/fa";
import { HiCamera } from "react-icons/hi2";
import { IoIosTime } from "react-icons/io";


const Profile = () => {
    const { user } = useContext(AuthContext);
    const [lastLogin, setLastLogin] = useState("");

    useEffect(() => {
        if (user?.metadata?.lastSignInTime) {
            const formattedLogin = new Date(user.metadata.lastSignInTime).toLocaleString();

            setLastLogin(formattedLogin);
        }
    }, [user]);

    return (
        <div className="w-10/12 mx-auto space-y-10 md:space-y-20 animate-fadeIn mt-10">
            {/* Header */}
            <h2 className="text-secondary-content font-bold text-left md:text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-wide animate-slideDown">
                Profiles
            </h2>

            {/* Profile Card */}
            <div className="space-y-4 bg-base-100 p-6 rounded-2xl shadow-lg text-base-content transition-all duration-500 hover:shadow-xl animate-scaleUp">

                {/* Avatar + Badge */}
                <div className="relative mb-5 flex justify-between items-start">
                    <div className="relative group">
                        <img
                            src={user?.photoURL || "https://i.ibb.co/0jTpW8n/default-user.png"}
                            alt={user?.displayName || "User"}
                            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-primary shadow-md object-cover transform transition-transform duration-500 group-hover:scale-105"
                        />
                        <Link
                            to="/update-profile"
                            className="absolute bottom-2 right-2 bg-primary text-primary-content p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            <HiCamera />
                        </Link>
                    </div>
                </div>

                {/* Info Blocks */}
                <div className="space-y-4">
                    {/* Name */}
                    <div className="flex items-center gap-3 bg-base-200 dark:bg-base-300 rounded-md px-5 py-4 shadow transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg animate-fadeInUp">
                        <FaUser className="text-primary size-5 lg:size-7" />
                        <div>
                            <h3 className="text-secondary-content font-semibold">Title / Name</h3>
                            <p>{user?.displayName || "Anonymous User name"}</p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3 bg-base-200 dark:bg-base-300 rounded-md px-5 py-4 shadow transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg animate-fadeInUp delay-100">
                        <FaAt className="text-primary size-5 lg:size-7" />
                        <div>
                            <h3 className="text-secondary-content font-semibold">Email Address</h3>
                            <p>{user?.email || "Anonymous User email"}</p>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3 bg-base-200 dark:bg-base-300 rounded-md px-5 py-4 shadow transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg animate-fadeInUp delay-200">
                        <FaPhoneAlt className="text-primary size-5 lg:size-7" />
                        <div>
                            <h3 className="text-secondary-content font-semibold">Mobile Number</h3>
                            <p>{user?.phoneNumber || "+00000000000"}</p>
                        </div>
                    </div>
                    {/* lastSignInTime */}
                    <div className="flex items-center gap-3 bg-base-200 dark:bg-base-300 rounded-md px-5 py-4 shadow transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg animate-fadeInUp delay-200">
                        <IoIosTime className="text-primary size-5 lg:size-7" />
                        <div>
                            <h3 className="text-secondary-content font-semibold">lastSignInTime</h3>
                            <p>Last Login: {lastLogin}</p>
                        </div>
                    </div>
                </div>

                {/* Update Profile Button */}
                <div className="pt-6 text-center">
                    <Link
                        to="/update-profile"
                        className="inline-flex items-center gap-2 bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 hover:bg-primary/80 hover:scale-[1.05] animate-pulseSlow"
                    >
                        <FaUserEdit className="size-5 lg:size-7" />
                        Update Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
