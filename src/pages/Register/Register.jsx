import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Register = () => {
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    const [passShow, setPassShow] = useState(false);
    const [rePassShow, setRePassShow] = useState(false);
    const {
        setLoading,
        createUser,
        setUser,
        updateUser,
        googleAuth,
    } = useContext(AuthContext);

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photoURL.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isLongEnough = password.length >= 6;
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        } else if (!hasUppercase) {
            setPasswordError("Password must include at least one uppercase letter.");
            return;
        } else if (!hasLowercase) {
            setPasswordError("Password must include at least one lowercase letter.");
            return;
        } else if (!hasSpecialChar) {
            setPasswordError("Password must include at least one special character.");
            return;
        } else if (!isLongEnough) {
            setPasswordError("Password must be at least 6 characters long.");
            return;
        } else {
            setPasswordError("");
        }
        createUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setLoading(false);
                        setUser(user);

                        fetch("http://localhost:3000/users", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                name: name,
                                email: user.email,
                                photoURL: photo,
                                createdAt: user.metadata.creationTime,
                            }),
                        });

                        navigate('/');
                        alert('Signup successful');
                    })
                    .catch((error) => {
                        console.error(error);
                        alert(error.message || 'Failed to update user profile.');
                    });
            })
            .catch((error) => {
                setLoading(false);
                console.error(error.code, error.message);

                const errorMessages = {
                    'auth/email-already-in-use':
                        'This email is already registered. Try logging in instead.',
                    'auth/invalid-email':
                        'The email address is not valid. Please check and try again.',
                    'auth/operation-not-allowed':
                        'Email/password accounts are not enabled. Contact support.',
                    'auth/weak-password':
                        'Password is too weak. Use at least 6 characters.',
                    'auth/network-request-failed':
                        'Network error. Please check your connection and try again.',
                    'auth/internal-error':
                        'An internal error occurred. Please try again later.',
                };

                const message =
                    errorMessages[error.code] || error.message || 'Signup failed. Please try again.';
                alert(message);
            });

    };

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
                            // setUser(loggedInUser)
                        }
                    }
                }
                fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        createdAt: user.metadata.creationTime,
                    }),
                });
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
        <div className="w-full h-full">
            <div className="w-full flex flex-col items-center 
            justify-center">

                <form
                    onSubmit={handleRegister}
                    className="md:w-96 w-80 flex flex-col 
                    items-center justify-center">

                    <h2 className="text-4xl text-gray-900 
                    font-medium">Register</h2>

                    <p className="text-sm text-gray-500/90 
                    mt-3">Create new account</p>

                    {/* google */}
                    <button
                        onClick={handleAuthGoogle}
                        type="button"
                        className="w-full mt-8 bg-gray-500/10 
                        flex items-center justify-center h-12 
                        rounded-full">

                        <FcGoogle size={24} />

                        <span>Google</span>

                    </button>

                    <div
                        className="flex items-center gap-4 
                        w-full my-5">

                        <div
                            className="w-full h-px bg-gray-300/90">
                        </div>

                        <p className="w-full text-nowrap text-sm
                        text-gray-500/90">
                            or sign up with email
                        </p>

                        <div
                            className="w-full h-px
                            bg-gray-300/90">
                        </div>
                    </div>

                    <div
                        className="flex items-center w-full h-12
                    bg-transparent border border-gray-300/60 
                    rounded-full overflow-hidden pl-6 gap-2">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="bg-transparent 
                            text-gray-500/80
                        placeholder-gray-500/80 
                        outline-none text-sm w-full 
                        h-full" required />
                    </div>

                    <div
                        className="flex items-center w-full h-12
                    bg-transparent border border-gray-300/60 
                    rounded-full overflow-hidden pl-6 gap-2 mt-6">
                        <input
                            type="url"
                            name="photoURL"
                            placeholder="Photo URL"
                            className="bg-transparent 
                            text-gray-500/80
                        placeholder-gray-500/80 
                        outline-none text-sm w-full 
                        h-full" required />
                    </div>

                    <div
                        className="flex items-center w-full h-12
                    bg-transparent border border-gray-300/60 
                    rounded-full overflow-hidden pl-6 gap-2 mt-6">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="bg-transparent 
                            text-gray-500/80
                        placeholder-gray-500/80 
                        outline-none text-sm w-full 
                        h-full" required />
                    </div>

                    <div
                        className="flex 
                    items-center 
                    mt-6 w-full 
                    bg-transparent border
                    border-gray-300/60 
                    h-12 rounded-full 
                    overflow-hidden pl-6 gap-2 
                    relative">

                        <input
                            type={passShow ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            className="bg-transparent
                        text-gray-500/80
                        placeholder-gray-500/80
                        outline-none text-sm w-full 
                        h-full" required
                        />
                        <span
                            onClick={() => setPassShow(!passShow)}
                            className="absolute
                            right-5 cursor-pointer 
                            transition-all duration-200 
                            ease-in-out"
                        >
                            {passShow ? (
                                <FaEye
                                    className="transform scale-100 
                                opacity-100 transition-all 
                                duration-200 ease-in-out" />
                            ) : (
                                <FaEyeSlash
                                    className="transform scale-90 
                                opacity-80 transition-all 
                                duration-200 ease-in-out" />
                            )}
                        </span>
                    </div>

                    <div
                        className="flex 
                    items-center 
                    mt-6 w-full 
                    bg-transparent border
                    border-gray-300/60 
                    h-12 rounded-full 
                    overflow-hidden pl-6 gap-2 
                    relative">

                        <input
                            type={rePassShow ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="bg-transparent
                        text-gray-500/80
                        placeholder-gray-500/80
                        outline-none text-sm w-full 
                        h-full" required
                        />
                        <span
                            onClick={() => setRePassShow(!rePassShow)}
                            className="absolute
                            right-5 cursor-pointer 
                            transition-all duration-200 
                            ease-in-out"
                        >
                            {rePassShow ? (
                                <FaEye
                                    className="transform scale-100 
                                opacity-100 transition-all 
                                duration-200 ease-in-out" />
                            ) : (
                                <FaEyeSlash
                                    className="transform scale-90 
                                opacity-80 transition-all 
                                duration-200 ease-in-out" />
                            )}
                        </span>
                    </div>

                    {/* show error */}
                    {passwordError &&
                        <p className='text-red-500'>
                            *{passwordError}</p>
                    }

                    <button
                        type="submit"
                        className="mt-8 w-full h-11 rounded-full
                         text-white bg-linear-to-r from-primary
                          to-secondary hover:opacity-90 
                          transition-opacity">
                        Register
                    </button>
                    <p
                        className="text-gray-500/90 text-sm 
                    mt-4">Already have an account?
                        <Link
                            to='/auth/login'
                            className="text-indigo-400 
                        hover:underline">Log In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;