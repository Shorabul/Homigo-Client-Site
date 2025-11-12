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
                path: '/profile',
                element: (<PrivateRoute>
                    <Profile></Profile>
                </PrivateRoute>)
            },
            {
                path: '/add-service',
                element: (<PrivateRoute>
                    <AddService></AddService>
                </PrivateRoute>)
            },
            {
                path: '/user/services',
                element: (<PrivateRoute>
                    <MyServices></MyServices>
                </PrivateRoute>)
            },
            {
                path: '/user/bookings',
                element: (<PrivateRoute>
                    <MyBookings></MyBookings>
                </PrivateRoute>)
            },
            {
                path: '/serviceDetails/:id',
                element: (<PrivateRoute>
                    <ServiceDetails></ServiceDetails>
                </PrivateRoute>)
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