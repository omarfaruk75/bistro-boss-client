import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaBook, FaDollarSign, FaList, FaUsers } from "react-icons/fa";


const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            console.log(res.data);
            return res.data;
        }
    })
    console.log(stats);
    return (
        <div>
            <h2 className="text-3xl">
                <span>Hi Welcome :</span>
                {user?.displayName ? user.displayName : 'Back'}
            </h2>
            <div className="stats shadow gap-4">

                <div className="stat flex flex-row justify-center  items-center bg-gradient-to-r from-cyan-500 to-blue-500">
                    <div className="stat-figure  text-white  ">
                        <FaDollarSign className="text-5xl" />
                    </div>
                    <div className="text-center">
                        <div className="stat-value text-4xl font-black  text-white ">${stats.revenue}</div>
                        <div className="stat-title  text-white text-xl font-medium">Revenues</div>

                    </div>
                </div>
                <div className="stat flex flex-row justify-center  items-center bg-gradient-to-r from-cyan-500 to-blue-500">
                    <div className="stat-figure  text-white  ">
                        <FaBook className="text-5xl" />
                    </div>
                    <div className="text-center">
                        <div className="stat-value text-4xl font-black  text-white ">{stats.menuItems}</div>
                        <div className="stat-title  text-white text-xl font-medium">Menu Items</div>

                    </div>
                </div>
                <div className="stat flex flex-row justify-center  items-center bg-gradient-to-r from-cyan-500 to-blue-500">
                    <div className="stat-figure  text-white  ">
                        <FaUsers className="text-5xl" />
                    </div>
                    <div className="text-center">
                        <div className="stat-value text-4xl font-black  text-white ">{stats.users}</div>
                        <div className="stat-title  text-white text-xl font-medium">Users</div>

                    </div>
                </div>
                <div className="stat flex flex-row justify-center  items-center bg-gradient-to-r from-cyan-500 to-blue-500">
                    <div className="stat-figure  text-white  ">
                        <FaList className="text-5xl" />
                    </div>
                    <div className="text-center">
                        <div className="stat-value text-4xl font-black  text-white ">{stats.orders}</div>
                        <div className="stat-title  text-white text-xl font-medium">Orders</div>

                    </div>
                </div>




            </div>
        </div>
    );
};

export default AdminHome;