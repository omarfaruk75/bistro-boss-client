import { Helmet } from "react-helmet";
import Cover from "../../../shared/Cover/Cover";
import menuImage from "../../../assets/menu/banner3.jpg"
import dessertImage from "../../../assets/menu/dessert-bg.jpeg"
import pizzaImage from "../../../assets/menu/pizza-bg.jpg"
import saladImage from "../../../assets/menu/salad-bg.jpg"
import soupImage from "../../../assets/menu/soup-bg.jpg"
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import MenuCategory from "../MenuCategory/MenuCategory";


const Menu = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')
    return (
        <div>
            <Helmet>
                <title>Bistro Boss || Menu</title>
            </Helmet>
            <Cover img={menuImage} menuTitle={'Our Menu'} subtitle={'welcome to our menu items to visit'}></Cover>
            <SectionTitle subHeading={"Don't Miss"} heading={"Today's Offer"} image={dessertImage}></SectionTitle>

            {/* Offered Section */}
            <MenuCategory items={offered}></MenuCategory>

            {/* Dessert Section */}

            <MenuCategory
                items={dessert}
                title="Dessert"
                image={dessertImage}

            ></MenuCategory>
            <MenuCategory
                items={pizza}
                title="Pizza"
                image={pizzaImage}

            ></MenuCategory>
            <MenuCategory
                items={salad}
                title="Salad"
                image={saladImage}

            ></MenuCategory>
            <MenuCategory
                items={soup}
                title="Soup"
                image={soupImage}

            ></MenuCategory>
        </div>
    );
};

export default Menu;