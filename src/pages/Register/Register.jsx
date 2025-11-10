import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const {
        setLoading,
        createUser,
        setUser,
        updateUser,
        googleAuth,
        user
    } = useContext(AuthContext);
    const handleAuthGoogle = () => {
        setLoading(true);
        googleAuth()
            .then((result) => {
                setLoading(false);
                const user = result.user;
                if (!user.email) {

                    if (user.providerData) {

                        const googleProvider = user
                            .providerData.find(p => p.providerId === 'google.com');
                        if (googleProvider && googleProvider.email) {
                            user.email = googleProvider.email;
                            console.log(user.email);
                            // setUser(loggedInUser)
                        }
                    }
                }
                setUser(user);
                navigate(location.state ? location.state : '/');
                alert("Signup successful");
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);

                const errorMessages = {
                    'auth/account-exists-with-different-credential':
                        'An account already exists with the same email but different sign-in credentials.',
                    'auth/auth-domain-config-required':
                        'Authentication domain configuration is missing.',
                    'auth/cancelled-popup-request':
                        'Popup request was cancelled. Please try again.',
                    'auth/operation-not-allowed':
                        'Google sign-in is not enabled. Please contact support.',
                    'auth/popup-blocked':
                        'Popup was blocked by the browser. Please allow popups and try again.',
                    'auth/popup-closed-by-user':
                        'You closed the popup before completing the sign-in.',
                    'auth/unauthorized-domain':
                        'This domain is not authorized for OAuth operations.',
                    'auth/user-disabled':
                        'This user account has been disabled.',
                    'auth/user-not-found':
                        'No user found with these credentials.',
                    'auth/wrong-password':
                        'Incorrect password. Please try again.',
                    'auth/network-request-failed':
                        'Network error. Please check your connection and try again.',
                    'auth/internal-error':
                        'An internal error occurred. Please try again later.',
                };

                const message =
                    errorMessages[error.code] || error.message || 'An unknown error occurred.';
                alert(message);
            });
    };
    return (
        <div className="flex h-[700px] w-full">
            <div className="w-full hidden md:inline-block">
                <img className="h-full" src="https://i.ibb.co/r2cm1B1G/login-signup-page-img.png" alt="leftSideImage" />
            </div>

            <div className="w-full flex flex-col items-center justify-center">

                <form className="md:w-96 w-80 flex flex-col items-center justify-center">
                    <h2 className="text-4xl text-gray-900 font-medium">Register</h2>
                    <p className="text-sm text-gray-500/90 mt-3">Create new account</p>

                    <button
                        onClick={handleAuthGoogle}
                        type="button"
                        className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full">
                        <FcGoogle size={24} />
                        <span>Google</span>
                    </button>

                    <div className="flex items-center gap-4 w-full my-5">
                        <div className="w-full h-px bg-gray-300/90"></div>
                        <p className="w-full text-nowrap text-sm text-gray-500/90">or sign up with email</p>
                        <div className="w-full h-px bg-gray-300/90"></div>
                    </div>

                    <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280" />
                        </svg>
                        <input type="email" placeholder="Email id" className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required />
                    </div>

                    <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280" />
                        </svg>
                        <input type="password" placeholder="Password" className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required />
                    </div>

                    <button type="submit" className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity">
                        Register
                    </button>
                    <p className="text-gray-500/90 text-sm mt-4">Already have an account?
                        <Link to='/auth/login' className="text-indigo-400 hover:underline" href="#">Log In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;