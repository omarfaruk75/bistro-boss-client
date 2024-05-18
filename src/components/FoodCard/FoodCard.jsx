

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const FoodCard = ({ item }) => {
    const { price, recipe, image, name } = item;

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={image} alt="Shoes" /></figure>
                <p className="absolute right-4 top-2 font-semibold">Price: {price}</p>
                <div className="card-body flex flex-col items-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>

                    <div className="card-actions justify-center">
                        <button className="btn btn-outline bg-slate-100 border-orange-400 border-0 border-b-4 text-black">Add To Cart</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FoodCard;