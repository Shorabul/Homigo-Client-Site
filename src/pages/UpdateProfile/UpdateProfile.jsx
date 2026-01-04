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
        <div className="flex justify-center items-center min-h-screen px-6">
            <div className="w-full max-w-lg rounded-2xl shadow-lg bg-base-300 dark:bg-neutral p-8 space-y-6">

                {/* Back Button */}
                <div className="flex items-center justify-between">
                    <Link
                        to="/profile"
                        className="flex items-center gap-2 text-red-500 hover:text-red-500 transition-colors font-medium"
                    >
                        <FaArrowLeft /> Back to Profile
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center space-y-3">
                    <FaUserCircle className="text-5xl text-red-500 mx-auto" />
                    <h2 className="text-xl md:text-2xl font-bold text-red-500">
                        Update Your <span className='text-base-content'>Profile</span>
                    </h2>
                    <p className="base-content text-sm">
                        Change your display name or profile picture below.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5 text-base-contant">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border border-neutral-content bg-base-200 text-base-content/50  rounded-md focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300"
                            required
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Profile Image URL
                        </label>
                        <input
                            type="text"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            placeholder="https://example.com/your-photo.jpg"
                            className="w-full px-4 py-2 border border-neutral-content bg-base-200 text-base-content/50 rounded-md focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300"
                        />
                    </div>

                    {/* Preview */}
                    {photoURL && (
                        <div className="flex justify-center">
                            <img
                                src={photoURL}
                                alt="Preview"
                                className="w-28 h-28 rounded-full object-cover border-4 border-red-500 mt-3 shadow-md"
                            />
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 hover:bg-red-500/80 hover:scale-[1.02] shadow-md"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
