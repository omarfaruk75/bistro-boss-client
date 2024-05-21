import { Outlet, useLocation } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";


const Layout = () => {
    const location = useLocation();
    // const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register')
    const noHeaderFooter = /login|register/.test(location.pathname);
    return (
        <div>
            {noHeaderFooter || <Navbar></Navbar>}
            <Outlet></Outlet>
            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Layout;