import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import PageLoader from "../pages/PageLoader/PageLoader";


const AuthGate = ({ children }) => {
    const { loading } = useAuth();
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        let timer;

        if (loading) {
            setShowLoader(true);
        } else {
            timer = setTimeout(() => setShowLoader(false), 500);
        }

        return () => clearTimeout(timer);
    }, [loading]);

    if (showLoader) return <PageLoader />;
    return children;
};

export default AuthGate;
