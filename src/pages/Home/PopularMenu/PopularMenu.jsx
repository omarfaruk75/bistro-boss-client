
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../../shared/MenuItem";
import useMenu from "../../../Hooks/useMenu";
import { Link } from "react-router-dom";

const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');

    return (
        <div>
            <section className="my-12">
                <SectionTitle subHeading={'From Our Menu'} heading={'Popular Items'} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {
                        popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                    }
                </div>
                <Link to={'/order'}><button className="btn btn-outline border-0 border-b-4 text-black">Order Now</button></Link>

            </section>

        </div>
    );
};

export default PopularMenu;