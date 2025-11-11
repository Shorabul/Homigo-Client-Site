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

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/services',
                element: <Services></Services>,
                loader: () => fetch('http://localhost:3000/services'),
            },
            {
                path: '/user/Services',
                element: <MyServices></MyServices>
            },
            {
                path: '/user/bookings',
                element: <MyBookings></MyBookings>
            },
            {
                path: '/profile',
                element: <Profile></Profile>
            },
            {
                path: '/ServiceDetails',
                element: <ServiceDetails></ServiceDetails>
            },

        ]
    }
    , {
        path: '/auth',
        element: <AuthLayout></AuthLayout>,
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
    }
]);