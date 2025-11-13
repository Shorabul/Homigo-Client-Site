import React from 'react';
import { Link } from 'react-router';
import { motion as Motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { PiXLogoBold } from 'react-icons/pi';

const Footer = () => {
    const iconVariants = {
        hover: { scale: 1.2, rotate: 5 },
        tap: { scale: 0.9 },
    };

    return (
        <div className="text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32">
            <div className="flex flex-wrap justify-between gap-12 md:gap-6">
                {/* Logo + Description */}
                <div className="max-w-80">
                    <Link to="/">
                        <img
                            src="https://i.ibb.co/Y4pSn57k/Homigo-logo.png"
                            alt="Homigo Logo"
                            className="w-24 h-24"
                        />
                    </Link>
                    <p className="text-sm mt-2 text-gray-600">
                        Homigo connects you with trusted professionals for cleaning, repairs, and home services.
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4 mt-4 text-primary">
                        <Motion.a
                            href="#"
                            whileHover="hover"
                            whileTap="tap"
                            variants={iconVariants}
                            className="hover:text-red-600"
                        >
                            <FaInstagram size={24} />
                        </Motion.a>
                        <Motion.a
                            href="#"
                            whileHover="hover"
                            whileTap="tap"
                            variants={iconVariants}
                            className="hover:text-red-600"
                        >
                            <FaFacebookF size={24} />
                        </Motion.a>
                        <Motion.a
                            href="#"
                            whileHover="hover"
                            whileTap="tap"
                            variants={iconVariants}
                            className="hover:text-red-600"
                        >
                            <PiXLogoBold size={24} />
                        </Motion.a>
                        <Motion.a
                            href="#"
                            whileHover="hover"
                            whileTap="tap"
                            variants={iconVariants}
                            className="hover:text-red-600"
                        >
                            <FaLinkedinIn size={24} />
                        </Motion.a>
                    </div>
                </div>

                {/* Company Links */}
                <div>
                    <p className="text-lg text-gray-800">COMPANY</p>
                    <ul className="mt-3 flex flex-col gap-2 text-sm">
                        <li><a href="#">About</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Press</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Partners</a></li>
                    </ul>
                </div>

                {/* Support Links */}
                <div>
                    <p className="text-lg text-gray-800">SUPPORT</p>
                    <ul className="mt-3 flex flex-col gap-2 text-sm">
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Safety Information</a></li>
                        <li><a href="#">Cancellation Options</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Accessibility</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="max-w-80">
                    <p className="text-lg text-gray-800">STAY UPDATED</p>
                    <p className="mt-3 text-sm text-gray-600">
                        Subscribe to our newsletter for inspiration and special offers.
                    </p>
                    <div className="flex items-center mt-4">
                        <input
                            type="text"
                            className="bg-white text-black rounded-l border border-gray-300  h-9 px-3 outline-none"
                            placeholder="Your email"
                        />
                        <button className="flex items-center justify-center bg-primary h-9 w-9 aspect-square rounded-r">
                            <svg
                                className="w-4 h-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 12H5m14 0-4 4m4-4-4-4"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <hr className="border-gray-300 mt-8" />
            <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5 text-sm text-gray-600 ">
                <p>
                    © {new Date().getFullYear()} <a href="https://prebuiltui.com">PrebuiltUI</a>. All rights reserved.
                </p>
                <ul className="flex items-center gap-4">
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Sitemap</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;
