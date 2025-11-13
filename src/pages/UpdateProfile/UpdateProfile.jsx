import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaArrowLeft, FaUserCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthContext';

const UpdateProfile = () => {
    const { user, updateUser, setLoading } = useContext(AuthContext);
    const [name, setName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser({ displayName: name, photoURL: photoURL })
            .then(() => {
                setLoading(false);
                toast.success('Profile updated successfully!');
                navigate("/profile");
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                toast.error(error.message);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-100 dark:bg-base-200 px-6">
            <div className="w-full max-w-lg rounded-2xl shadow-lg bg-white dark:bg-neutral p-8 space-y-6">

                {/* Back Button */}
                <div className="flex items-center justify-between">
                    <Link
                        to="/profile"
                        className="flex items-center gap-2 text-secondary-content dark:text-base-content hover:text-primary transition-colors font-medium"
                    >
                        <FaArrowLeft /> Back to Profile
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center space-y-3">
                    <FaUserCircle className="text-5xl text-primary mx-auto" />
                    <h2 className="text-xl md:text-2xl font-bold text-secondary-content dark:text-white">
                        Update Your Profile
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Change your display name or profile picture below.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-secondary-content dark:text-white mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border border-gray-300 bg-base-100 text-secondary-content  rounded-md focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300"
                            required
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block text-sm font-medium text-secondary-content dark:text-white mb-1">
                            Profile Image URL
                        </label>
                        <input
                            type="text"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            placeholder="https://example.com/your-photo.jpg"
                            className="w-full px-4 py-2 border border-gray-300 bg-base-100 dark:bg-base-200 text-secondary-content rounded-md focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300"
                        />
                    </div>

                    {/* Preview */}
                    {photoURL && (
                        <div className="flex justify-center">
                            <img
                                src={photoURL}
                                alt="Preview"
                                className="w-28 h-28 rounded-full object-cover border-4 border-primary mt-3 shadow-md"
                            />
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 hover:bg-primary/80 hover:scale-[1.02] shadow-md"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
