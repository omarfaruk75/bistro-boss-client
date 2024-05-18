import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import FoodCard from '../../components/FoodCard/FoodCard';

const OrderTab = ({ items }) => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };
    return (
        <Swiper
            pagination={pagination}
            modules={[Pagination]}
            className="mySwiper"
        >
            <SwiperSlide>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {items.map(item => <FoodCard key={item._id} item={item}></FoodCard>)}
                </div>

            </SwiperSlide>

        </Swiper>

    );
};

export default OrderTab;