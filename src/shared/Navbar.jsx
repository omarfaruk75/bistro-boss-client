import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import useCart from "../Hooks/useCart";
import { FaShoppingCart } from "react-icons/fa";
import useAdmin from "../Hooks/useAdmin";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [cart] = useCart();
    const [isAdmin] = useAdmin();

    const handleLogout = () => {
        logout()
            .then(() => { })
            .catch(error => console.log(error))


    }

    const menuItem = <>

        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'menu'}>Menu</Link ></li>
        <li><Link to={'order/salad'}>Order Food</Link ></li>
        {user && isAdmin && <li><Link to={'/dashboard/adminHome'}>Dashboard</Link ></li>}
        {user && !isAdmin && <li><Link to={'/dashboard/userHome'}>Dashboard</Link ></li>}


        <li> {user ? <><button onClick={handleLogout} className="btn btn-outline btn-sm text-white">Logout</button></> : <><Link to={'/login'}>Login</Link></>} </li>
        <li>
            <Link to="/dashboard/cart">
                <span className="flex flex-row justify-center items-center">
                    <FaShoppingCart />
                    <div className="badge badge-secondary">+{cart.length}</div>
                </span>
            </Link>
        </li>
    </>

    return (
        <div>
            <div className="navbar max-w-screen-xl fixed z-20 bg-opacity-30 bg-black text-white
            ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItem}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Bistro Boss</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {menuItem}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;