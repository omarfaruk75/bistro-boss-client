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
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoutes from "./AdminRoutes";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItems from "../pages/Dashboard/UpdateItems/UpdateItems";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../pages/Dashboard/UserHome/UserHome";


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
            //normal user route
            {
                path: "cart",
                element: <Cart></Cart>
            },
            {
                path: 'users',
                element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
            },
            {
                path: 'payment',
                element: <Payment />
            },

            {
                path: 'userHome',
                element: <UserHome />
            }
            ,
            {
                path: 'paymentHistory',
                element: <PaymentHistory />
            },


            //admin only routes


            {
                path: 'adminHome',
                element: <AdminRoutes><AdminHome /></AdminRoutes>
            },
            {
                path: 'addItems',
                element: <AdminRoutes><AddItems></AddItems></AdminRoutes>
            },
            {
                path: 'manageItems',
                element: <AdminRoutes><ManageItems></ManageItems></AdminRoutes>
            },
            {
                path: 'updateItems/:id',
                element: <AdminRoutes><UpdateItems></UpdateItems></AdminRoutes>,
                loader: ({ params }) => fetch(`https://bistro-boss-server-iota-fawn.vercel.app/menu/${params.id}`)
            }
        ]
    }
])

export default router;
