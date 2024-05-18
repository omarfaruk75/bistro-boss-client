import useMenu from "../../../Hooks/useMenu";
import Cover from "../../../shared/Cover/Cover";
import MenuItem from "../../../shared/MenuItem";
import { Link } from "react-router-dom";



const MenuCategory = ({ items, title, image }) => {
    const [menu] = useMenu();
    return (

        <div>
            <div>

                {title && <Cover img={image} menuTitle={title} ></Cover>}
                <div className="grid md:grid-cols-2 gap-10">
                    {
                        items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)

                    }
                </div>
            </div>
            <Link to={`/order/${title}`}><button className="btn btn-outline border-0 border-b-4 text-black">Order Now</button></Link>


        </div>
    );
};

export default MenuCategory;