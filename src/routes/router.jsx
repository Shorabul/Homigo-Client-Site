import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login/Login";
import Services from "../pages/Services/Services";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import MyServices from "../pages/MyServices/MyServices";
import MyBookings from "../pages/MyBookings/MyBookings";
import Profile from "../pages/Profile/Profile";
import AddService from "../pages/AddService/AddService";
import PrivateRoute from "./PrivateRoute";
import UpdateService from "../pages/UpdateService/UpdateService";
import Error from "../pages/Error/Error";
import UpdateProfile from "../pages/UpdateProfile/UpdateProfile";
import About from "../pages/About/About";
import AuthGate from "../layout/AuthGate";
import DashboardLayout from "../layout/DashboardLayout";
import Overview from "../pages/Overview/Overview";
import CreateBlog from "../pages/CreateBlog/CreateBlog";
import Blog from "../pages/Blog/Blog";
import BlogDetails from "../pages/BlogDetails/BlogDetails";
import ContactUs from "../pages/ContactUs/ContactUs";

export const router = createBrowserRouter([
    {
        path: '/',
        element: (<AuthGate>
            <MainLayout></MainLayout>
        </AuthGate>),
        errorElement: <Error></Error>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/services',
                element: <Services></Services>,
            },
            {
                path: '/about',
                element: <About></About>,
            },
            {
                path: '/serviceDetails/:id',
                element: <ServiceDetails></ServiceDetails>
            },
            {
                path: '/blogs',
                element: <Blog></Blog>
            },
            {
                path: '/blog/:id',
                element: <BlogDetails></BlogDetails>
            },
            {
                path: '/contact-us',
                element: <ContactUs></ContactUs>
            }

        ]
    },
    {
        path: '/dashboard',
        element: (<PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>),
        children: [
            {
                path: '/dashboard/overview',
                element: (<PrivateRoute>
                    <Overview></Overview>
                </PrivateRoute>)
            },
            {
                path: '/dashboard/profile',
                element: (<PrivateRoute>
                    <Profile></Profile>
                </PrivateRoute>)
            },
            {
                path: '/dashboard/user/bookings',
                element: (<PrivateRoute>
                    <MyBookings></MyBookings>
                </PrivateRoute>)
            },
            {
                path: '/dashboard/update-service/:id',
                element: (<PrivateRoute>
                    <UpdateService></UpdateService>
                </PrivateRoute>)
            },
            {
                path: '/dashboard/add-service',
                element: (<PrivateRoute>
                    <AddService></AddService>
                </PrivateRoute>)
            },
            {
                path: '/dashboard/user/services',
                element: (<PrivateRoute>
                    <MyServices></MyServices>
                </PrivateRoute>)
            },
            {
                path: '/dashboard/create-blog',
                element: (<PrivateRoute>
                    <CreateBlog></CreateBlog>
                </PrivateRoute>)
            },
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout></AuthLayout>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/auth/login',
                element: <Login></Login>
            },
            {
                path: '/auth/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '/update-profile',
        element: <PrivateRoute>
            <UpdateProfile></UpdateProfile>
        </PrivateRoute>
    }
]);