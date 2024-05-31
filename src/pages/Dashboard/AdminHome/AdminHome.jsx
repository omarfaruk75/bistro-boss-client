import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaBook, FaDollarSign, FaList, FaUsers } from "react-icons/fa";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Sector, ResponsiveContainer, Legend } from 'recharts';
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('order-stats');
            return res.data
        }
    })
    console.log(chartData);
    //custom shape for bar chart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    //custom shapefor pie chart pie chart 

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );

    };
    const pieChartData = chartData.map(data => {
        return { name: data.category, value: data.revenue }
    })
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
            <div className="flex flex-row">
                <div className="w-1/2">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>

                </div>
            </div>
        </div>
    );
};

export default AdminHome;