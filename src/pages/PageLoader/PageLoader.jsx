import { motion as Motion } from "framer-motion";

const PageLoader = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <Motion.img
            src="https://i.ibb.co/5h8s3J5M/homigo-logo.png"
            alt="Homigo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-24 h-24"
        />
        {/*spinner */}
        {/* <span className="loading loading-spinner text-orange-500 ml-4"></span> */}
    </div>
);

export default PageLoader;