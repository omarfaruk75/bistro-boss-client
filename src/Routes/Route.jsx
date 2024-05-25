import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Error404 from "../pages/ErrorPage/Error404";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Secret from "../components/Secret/Secret";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../pages/Dashboard/Dashboard";
import Cart from "../pages/Dashboard/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        errorElement: <Error404></Error404>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/menu',
                element: <Menu></Menu>
            },
            {
                path: 'order/:category',
                element: <Order></Order>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: '/secret',
                element: <PrivateRoutes><Secret></Secret></PrivateRoutes>
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoutes> <Dashboard></Dashboard></PrivateRoutes>,
        children: [
            {
                path: "cart",
                element: <PrivateRoutes><Cart></Cart></PrivateRoutes>
            },
            //admin routes
            {
                path: 'users',
                element: <AllUsers></AllUsers>
            }
        ]
    }
])

export default router;
