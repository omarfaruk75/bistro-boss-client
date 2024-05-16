
import { FreeMode, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import slide1 from '../../../assets/home/slide1.jpg'
import slide2 from '../../../assets/home/slide2.jpg'
import slide3 from '../../../assets/home/slide3.jpg'
import slide4 from '../../../assets/home/slide4.jpg'
import slide5 from '../../../assets/home/slide5.jpg'
import SectionTitle from "../../../components/SectionTitle/SectionTitle";





const Category = () => {
    return (

        <section className="mt-12">
            <SectionTitle subHeading={"From 11.00am to 10.00pm"} heading={"Order Online"} />
            <Swiper
                loop="true"

                slidesPerView={4}
                spaceBetween={10}
                freeMode={true}

                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper mb-28"
            >
                <SwiperSlide><img src={slide1} alt="" />
                    <h3 className="uppercase text-center text-3xl text-white -mt-16">Salad</h3></SwiperSlide>
                <SwiperSlide><img src={slide2} alt="" /><h3 className="uppercase text-center text-3xl text-white -mt-16">Pizza</h3></SwiperSlide>
                <SwiperSlide><img src={slide3} alt="" /><h3 className="uppercase text-center text-3xl text-white -mt-16">Soup</h3></SwiperSlide>
                <SwiperSlide><img src={slide4} alt="" /><h3 className="uppercase text-center text-3xl text-white -mt-16">Dessert</h3></SwiperSlide>
                <SwiperSlide><img src={slide5} alt="" />
                    <h3 className="uppercase text-center text-3xl text-white -mt-16">Salad</h3></SwiperSlide>
                <SwiperSlide><img src={slide1} alt="" />
                    <h3 className="uppercase text-center text-3xl text-white -mt-16">Salad</h3></SwiperSlide>
                <SwiperSlide><img src={slide2} alt="" /><h3 className="uppercase text-center text-3xl text-white -mt-16">Pizza</h3></SwiperSlide>
                <SwiperSlide><img src={slide2} alt="" /><h3 className="uppercase text-center text-3xl text-white -mt-16">Pizza</h3></SwiperSlide>
                <SwiperSlide><img src={slide4} alt="" /><h3 className="uppercase text-center text-3xl text-white -mt-16">Dessert</h3></SwiperSlide>
            </Swiper>
        </section>

    );
};

export default Category;