import React from "react";
import { motion as Motion } from "framer-motion";
import { Wrench, Brush, Wind } from "lucide-react";
import { Link } from 'react-router';

const TopRatedServices = () => {
    const services = [
        {
            icon: <Wrench className="w-6 h-6 text-orange-500" />,
            title: "Carpentry Solutions",
            img: "https://images.unsplash.com/photo-1738817628138-b794ed944ed5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3540",
        },
        {
            icon: <Brush className="w-6 h-6 text-orange-500" />,
            title: "Cleaning Solutions",
            img: "https://images.unsplash.com/photo-1686178827149-6d55c72d81df?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2370",
        },
        {
            icon: <Wind className="w-6 h-6 text-orange-500" />,
            title: "Air Condition Solutions",
            img: "https://www.matrixsolutions.tv/wp-content/uploads/2014/11/service-ac.jpg",
        },
        {
            icon: <Wrench className="w-6 h-6 text-orange-500" />,
            title: "Plumbing Solutions",
            img: "https://cdn.prod.website-files.com/623ce1aee93cd069d36b47d6/66ad0012cc6216945339e15b_the-technician-checking-the-heating-system-in-the-2024-04-16-19-04-10-utc.jpg",
        },
        {
            icon: <Brush className="w-6 h-6 text-orange-500" />,
            title: "Painting Solutions",
            img: "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/A724RBEN2AI6PHCTNILJX2YJKM.jpg&w=1440",
        },
        {
            icon: <Brush className="w-6 h-6 text-orange-500" />,
            title: "Electrical Solutions",
            img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1738",
        },
    ];

    return (
        <section className="bg-black text-white py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Text Block */}
                <div>
                    <p className="text-sm font-semibold text-orange-500 mb-3">OUR SERVICES</p>
                    <h2 className="text-4xl font-bold mb-6 leading-snug">
                        We provide your all <br /> required handyman <br /> services into your location
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-10">
                        Volutpat et malesuada maecenas amet. Ultrices volutpat auctor euismod eget pulvinar nulla porttitor.
                        Faucibus faucibus consectetur et tellus magnis. Nunc proin mauris enim duis aliquet fringilla.
                        Vel tellus tellus risus eu lacus volutpat morbi. Cursus tincidunt urna condimentum egestas integer.
                    </p>
                </div>

                {/* Right - Auto Scrolling Cards */}
                <div className="relative w-full overflow-hidden">
                    <Motion.div
                        className="flex gap-6"
                        animate={{ x: ["0%", "-100%"] }}
                        transition={{
                            repeat: Infinity,
                            duration: 20,
                            ease: "linear",
                        }}
                    >
                        {[...services, ...services].map((service, i) => (
                            <div
                                key={i}
                                className="min-w-[250px] relative overflow-hidden rounded-2xl shadow-lg group flex-shrink-0"
                            >
                                <img
                                    src={service.img}
                                    alt={service.title}
                                    className="object-cover w-full h-64 group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 flex items-center justify-between">
                                    <div>
                                        {service.icon}
                                        <p className="text-white text-sm font-semibold mt-1">
                                            {service.title}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Motion.div>
                </div>
            </div>

            {/* View All Button */}
            <div className="text-center mt-16">
                {/* <Link type="button" to='/services' className="flex items-center mx-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition">
                    <span className="mr-2">→</span> View All Services
                </Link> */}
                <Link
                    to="/services"
                    className="items-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition"
                >
                    <span className="mr-2">→</span> View All Services
                </Link>

            </div>
        </section>
    );
};

export default TopRatedServices;


// import React from "react";
// import { motion as Motion } from "framer-motion";
// import { Wrench, Brush, Wind } from "lucide-react";

// const TopRatedServices = () => {
//     const services = [
//         {
//             icon: <Wrench className="w-6 h-6 text-orange-500" />,
//             title: "Carpentry Solutions",
//             img: "https://images.unsplash.com/photo-1616627458530-5d8e0d97469e", // replace with your image
//         },
//         {
//             icon: <Brush className="w-6 h-6 text-orange-500" />,
//             title: "Cleaning Solutions",
//             img: "https://images.unsplash.com/photo-1598515213697-3c8d61a86b1b", // replace with your image
//         },
//         {
//             icon: <Wind className="w-6 h-6 text-orange-500" />,
//             title: "Air Condition Solutions",
//             img: "https://images.unsplash.com/photo-1621905251918-84b1c9c52a68", // replace with your image
//         },
//     ];
//     return (
//         <section className="bg-black text-white py-20">
//             <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
//                 {/* Left Text Block */}
//                 <div>
//                     <p className="text-sm font-semibold text-orange-500 mb-3">OUR SERVICES</p>
//                     <h2 className="text-4xl font-bold mb-6 leading-snug">
//                         We provide your all <br /> required handyman <br /> services into your location
//                     </h2>
//                     <p className="text-gray-400 text-sm leading-relaxed mb-10">
//                         Volutpat et malesuada maecenas amet. Ultrices volutpat auctor euismod eget pulvinar nulla porttitor.
//                         Faucibus faucibus consectetur et tellus magnis. Nunc proin mauris enim duis aliquet fringilla.
//                         Vel tellus tellus risus eu lacus volutpat morbi. Cursus tincidunt urna condimentum egestas integer.
//                     </p>
//                 </div>

//                 {/* Right - Services Cards */}
//                 <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
//                     {services.map((service, i) => (
//                         <Motion.div
//                             key={i}
//                             whileHover={{ scale: 1.03 }}
//                             className="relative overflow-hidden rounded-2xl shadow-lg group"
//                         >
//                             <img
//                                 src={service.img}
//                                 alt={service.title}
//                                 className="object-cover w-full h-64 group-hover:scale-110 transition-transform duration-500"
//                             />
//                             <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 flex items-center justify-between">
//                                 <div>
//                                     {service.icon}
//                                     <p className="text-white text-sm font-semibold mt-1">
//                                         {service.title}
//                                     </p>
//                                 </div>
//                             </div>
//                         </Motion.div>
//                     ))}
//                 </div>
//             </div>

//             {/* View All Button */}
//             <div className="text-center mt-16">
//                 <button className="flex items-center mx-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition">
//                     <span className="mr-2">→</span> View All Services
//                 </button>
//             </div>
//         </section>
//     );
// };

// export default TopRatedServices;