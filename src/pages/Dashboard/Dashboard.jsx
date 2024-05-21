import { NavLink, Outlet } from "react-router-dom"
import { FaAd, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart } from "react-icons/fa";
import useCart from "../../Hooks/useCart";

const Dashboard = () => {
    const [cart] = useCart();
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    <li><NavLink to={'/dashboard/cart'}><FaShoppingCart />My Cart  {cart.length}</NavLink></li>
                    <li><NavLink to={'/dashboard/userHome'}><FaHome />User Home</NavLink></li>
                    <li><NavLink to={'/dashboard/reservation'}><FaCalendar />Reservation</NavLink></li>
                    <li><NavLink to={'/dashboard/review'}><FaAd />Review</NavLink></li>
                    <li><NavLink to={'/dashboard/booking'}><FaList />My Bookings</NavLink></li>
                    <div className="divider"></div>
                    <li><NavLink to={'/'}><FaShoppingCart />Home</NavLink></li>
                    <li><NavLink to={'/menu'}><FaSearch />Menu</NavLink></li>

                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;