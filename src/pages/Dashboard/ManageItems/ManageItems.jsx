
import { FaEdit, FaTrash } from "react-icons/fa";
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom"


const ManageItems = () => {
    const [menu, loading, refetch] = useMenu();
    const axiosSecure = useAxiosSecure();
    const handleUpdateItem = item => {
        console.log(item);
    }
    const handleDeleteitem = item => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                console.log(res.data);

                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name} has been deleted.`,
                        icon: "success"
                    });
                    refetch();
                }

            }
        });
    }

    return (
        <div>
            <SectionTitle heading={'Manage All Items'} subHeading={'Hurry Up'}></SectionTitle>
            <div>
                <div>
                    <div className="flex felx-row justify-evenly">
                        <h2 className="text-2xl">All Users</h2>
                        <h2 className="text-2xl">Total Users</h2>
                    </div>
                    <div>

                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                {/* head */}
                                <thead>
                                    <tr>

                                        <th>#</th>
                                        <th>Image</th>
                                        <th>Item Name</th>
                                        <th>Price</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        menu.map((item, index) => <tr key={item._id}>
                                            <th>{index + 1}</th>
                                            <td><div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div></td>
                                            <td>{item.name}</td>
                                            <td className="text-right">${item.price}</td>
                                            <td> <Link to={`/dashboard/updateItems/${item._id}`} onClick={() => handleUpdateItem(item)} className="btn bg-orange-500 btn-lg text-white text-2xl"><FaEdit /></Link></td>
                                            <td> <button onClick={() => handleDeleteitem(item)} className="btn bg-green-600 text-2xl btn-lg text-white"><FaTrash /></button></td>
                                        </tr>)
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
};

export default ManageItems;