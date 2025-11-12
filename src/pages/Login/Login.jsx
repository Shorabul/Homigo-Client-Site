import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setLoading, logIn, setUser, googleAuth, user } = useContext(AuthContext);
    const [passShow, setPassShow] = useState(false);
    const [email, setEmail] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // useEffect(() => {
    //     if (user) {
    //         navigate('/');
    //     }
    // }, [user, navigate]);

    // useEffect(() => {
    //     if (user) {
    //         navigate('/', { replace: true });
    //     }
    // }, [user, navigate]);

    useEffect(() => {
        if (user) {
            if (!location.state?.from) {
                navigate('/', { replace: true });
            }
        }
    }, [user, navigate, location.state]);



    const handleLogin = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        setEmail(email);
        const password = e.target.password.value;

        logIn(email, password)
            .then((userCredential) => {
                setLoading(false);
                const user = userCredential.user;
                setUser(user);
                // navigate(`${location.state ?
                //     location.state : '/'}`);

                // navigate(location.state?.from?.pathname || '/');

                const redirectPath = location.state?.from?.pathname || '/';
                navigate(redirectPath, { replace: true });

                toast.success(`Welcome Back ${user.displayName || 'User'}`);
            }).catch((error) => {
                console.log(error);
                console.log(error.code);
                console.log(error.message);
                switch (error.code) {
                    case "auth/user-not-found":
                        setPasswordError("No account found with this email.");
                        break;
                    case "auth/wrong-password":
                        setPasswordError("Incorrect password. Please try again.");
                        break;
                    case "auth/too-many-requests":
                        setPasswordError("Too many failed attempts. Try again later.");
                        break;
                    case "auth/user-disabled":
                        setPasswordError("Your account has been disabled.");
                        break;
                    default:
                        setPasswordError("Login failed. Please try again.");
                }
            });
    }


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
                const redirectPath = location.state?.from?.pathname || '/';
                navigate(redirectPath, { replace: true });
                toast.success(`Welcome Back ${user.displayName || 'User'}`);
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
                toast.error(message);
            });
    };
    return (
        <div className="flex h-[700px] w-full">

            <div className="w-full flex flex-col items-center justify-center">

                <form
                    onSubmit={handleLogin}
                    className="md:w-96 w-80 flex flex-col 
                    items-center justify-center">
                    <h2 className="text-4xl text-gray-900 
                    font-medium">Log In</h2>
                    <p className="text-sm text-gray-500/90 
                    mt-3">Welcome back! Please log in to continue
                    </p>

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

                    <div className="flex items-center gap-4 w-full 
                    my-5">
                        <div className="w-full h-px 
                        bg-gray-300/90"></div>
                        <p className="w-full text-nowrap text-sm
                         text-gray-500/90">or log in with email
                        </p>
                        <div className="w-full h-px 
                        bg-gray-300/90">

                        </div>
                    </div>

                    <div
                        className="flex items-center w-full h-12
                    bg-transparent border border-gray-300/60 
                    rounded-full overflow-hidden pl-6 gap-2 mt-6">
                        <input
                            onChange={(e) => { setEmail(e.target.value) }} value={email}
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


                    <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
                        <div className="flex items-center gap-2">
                            <input className="h-5" type="checkbox" id="checkbox" />
                            <label className="text-sm" htmlFor="checkbox">Remember me</label>
                        </div>
                        <a className="text-sm underline" href="#">Forgot password?</a>
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
                        Login
                    </button>
                    <p className="text-gray-500/90 text-sm mt-4">Don’t have an account?
                        <Link to='/auth/register' className="text-indigo-400 hover:underline">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;