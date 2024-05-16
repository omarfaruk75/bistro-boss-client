import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../../shared/MenuItem";


const PopularMenu = () => {
    const [menu, setMenu] = useState([])
    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                const popularItem = data.filter(item => item.category === 'popular')
                setMenu(popularItem)
            })
    }, [])
    return (
        <div>
            <section className="my-12">
                <SectionTitle subHeading={'From Our Menu'} heading={'Popular Items'} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {
                        menu.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                    }
                </div>
            </section>

        </div>
    );
};

export default PopularMenu;