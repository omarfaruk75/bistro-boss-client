

const MenuItem = ({ item }) => {
    const { image, price, recipe, name } = item;
    return (
        <div>
            <div className="flex space-x-4">
                <img style={{ borderRadius: '0 200px 200px 200px' }} className="w-28" src={image} alt="" />
                <div >
                    <h3 className="uppercase">{name}---------------</h3>
                    <p>{recipe}</p>

                </div>
                <p className="text-yello-600">{price}</p>
            </div>
        </div>
    );
};

export default MenuItem;