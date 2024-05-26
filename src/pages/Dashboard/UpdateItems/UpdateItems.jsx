import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useAxiosPublic } from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import { useLoaderData, useNavigation } from "react-router-dom";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const UpdateItems = () => {
    const item = useLoaderData();
    const navigate = useNavigation();
    console.log(item);
    const { name, category, image, price, _id, recipe } = item;
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        //image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            //now send the menu item data to the server with the image url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                image: res.data.data.display_url
            }
            //
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
            if (menuRes.data.modifiedCount > 0) {
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is updated to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                });

            }
        }
        console.log('with image url', res.data);


    };
    return (
        <div>
            <SectionTitle heading={'Update Item'} subHeading={"Refresh Info"}></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Recepie Name*</span>
                        </div>
                        <input type="text" placeholder="Recepie Name" defaultValue={name} {...register("name", { required: true })} className="input input-bordered w-full " />

                    </label>

                    <div className="flex flex-row justify-between items-center gap-6">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>
                            <select defaultValue={category} {...register("category", { required: true })} className="select select-bordered w-full">
                                <option disabled value="category">Select a Category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>

                            </select>

                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input type="text" placeholder="price of Item" defaultValue={price} {...register("price", { required: true })} className="input input-bordered w-full " />

                        </label>
                    </div>
                    <div>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Recipe Details</span>
                            </div>
                            <textarea className="textarea textarea-bordered" defaultValue={recipe} {...register("recipe", { required: true })} placeholder="Bio"></textarea>

                        </label>
                    </div>
                    <div>
                        <input type="file"  {...register("image", { required: true })} className="file-input file-input-bordered file-input-secondary w-full max-w-xs" />
                    </div>

                    <button className="btn text-white bg-secondary">Update An Item<FaUtensils /></button>
                </form>
            </div >
        </div>
    );
};

export default UpdateItems;