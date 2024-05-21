import { useNavigate, useLocation } from "react-router-dom"

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";




const FoodCard = ({ item }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { price, recipe, image, name, _id } = item;
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = () => {

        if (user && user.email) {
            //Send cart item to the database

            const cartItem = {
                menuID: _id,
                email: user?.email,
                name, image, price
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} added to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetch cart to update the cart items count
                        refetch();
                    }
                })

        } else {
            Swal.fire({
                title: "Please Login to the Cart?",
                text: "Yor are not Login",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                    // Swal.fire({
                    //     title: "Deleted!",
                    //     text: "Your file has been deleted.",
                    //     icon: "success"
                    // });
                }
            });
        }

    }

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={image} alt="Shoes" /></figure>
                <p className="absolute right-4 top-2 font-semibold">Price: {price}</p>
                <div className="card-body flex flex-col items-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>

                    <div className="card-actions justify-center">
                        <button
                            onClick={handleAddToCart} className="btn btn-outline bg-slate-100 border-orange-400 border-0 border-b-4 text-black">Add To Cart</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FoodCard;