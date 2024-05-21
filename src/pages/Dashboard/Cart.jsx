import { FaTrash } from "react-icons/fa";
import useCart from "../../Hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const Cart = () => {
    const [cart, refetch] = useCart();
    const axiosSecure = useAxiosSecure();
    const totalPrice = cart.reduce((accumulateValue, currentValue) =>
        accumulateValue + currentValue.price, 0)


    const handleDeleteCart = id => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });

    }
    return (
        <div>
            <div className="flex justify-around items-center">
                <h2 className="text-4xl">Items: {cart.length}</h2>
                <h2 className="text-4xl">Total Price: {totalPrice}</h2>
                <button className="btn btn-primary">Pay</button>

            </div>
            <div>
                <div className="overflow-x-auto ml-12">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="uppercase">
                                <th>#</th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                cart.map((item, index) => <tr key={item._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        {item.name}

                                    </td>
                                    <td>{item.price}</td>
                                    <th>
                                        <button onClick={() => handleDeleteCart(item._id)} className="btn btn-ghost btn-lg"><FaTrash /></button>
                                    </th>
                                </tr>)
                            }


                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cart;