import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form"
import { useAxiosPublic } from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddItems = () => {
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
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);


    };
    return (
        <div>
            <SectionTitle heading={'Add an Item'} subHeading={"What's New"}></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Recepie Name*</span>
                        </div>
                        <input type="text" placeholder="Recepie Name" {...register("name", { required: true })} className="input input-bordered w-full " />

                    </label>

                    <div className="flex flex-row justify-between items-center gap-6">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>
                            <select defaultValue="default" {...register("category", { required: true })} className="select select-bordered w-full">
                                <option disabled value="default">Select a Category</option>
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
                            <input type="text" placeholder="price of Item" {...register("price", { required: true })} className="input input-bordered w-full " />

                        </label>
                    </div>
                    <div>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Recipe Details</span>
                            </div>
                            <textarea className="textarea textarea-bordered" {...register("recipe", { required: true })} placeholder="Bio"></textarea>

                        </label>
                    </div>
                    <div>
                        <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered file-input-secondary w-full max-w-xs" />
                    </div>

                    <button className="btn text-white bg-secondary">Add Item<FaUtensils /></button>
                </form>
            </div >

        </div >
    );
};

export default AddItems;