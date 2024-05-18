
import { Helmet } from "react-helmet";
import orderCoverImage from "../../assets/shop/banner2.jpg"
import Cover from "../../shared/Cover/Cover";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../../Hooks/useMenu";
import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom"

const Order = () => {
    const categories = ['salad', 'soup', 'dessert', 'pizza', 'drinks'];
    const { category } = useParams();
    console.log(category);
    const initialIndex = categories.indexOf(category.toLowerCase());
    const [tabIndex, setTabIndex] = useState(initialIndex);
    console.log(tabIndex);
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const drinks = menu.filter(item => item.category === 'drinks')


    return (
        <div>
            <Helmet>
                <title>Bistro Boss || Order Food</title>
            </Helmet>
            <Cover img={orderCoverImage} menuTitle={'Order Food'} subtitle={'welcome to our Food items to visit'}></Cover>
            <div className="my-12">
                <Tabs className="text-center" defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)} >
                    <TabList>

                        <Tab>Salad</Tab>
                        <Tab>Soups</Tab>
                        <Tab>Desserts</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>Drinks</Tab>
                    </TabList>
                    <TabPanel>
                        <OrderTab items={salad}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={soup}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={dessert}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={pizza}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={drinks}></OrderTab>
                    </TabPanel>

                </Tabs>
            </div>
        </div>
    );
};

export default Order;