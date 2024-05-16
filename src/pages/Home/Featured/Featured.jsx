import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featureImage from "../../../assets/home/featured.jpg"
import './Featured.css'


const Featured = () => {
    return (
        <div>
            <section className="featured-item bg-fixed text-white my-20 py-8">
                <SectionTitle subHeading={'Check It Out'} heading={'Featured Item'} />
                <div className="md:grid grid-cols-2 gap-x-10 justify-center bg-slate-500 bg-opacity-40 items-center pb-20 pt-12 px-36">
                    <div className="">
                        <img src={featureImage} alt="" />
                    </div>
                    <div className="space-y-4">
                        <p>Aug20, 2029</p>
                        <p className="uppercase">Where I Can Get Some</p>
                        <p>Holisticly strategize vertical action items without uwithout ivize installed base  strategize vertical action items without uwithout ivize installed base manufactured products rather than intermandated benefits. Credibly redefine equity invested quality vectors vis-a-vis low-risk high-yield benefits.
                            .</p>
                        <button className="btn btn-outline border-0 border-b-4 text-white">Order Now</button>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Featured;