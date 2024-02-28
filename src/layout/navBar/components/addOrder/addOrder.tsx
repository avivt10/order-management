import style from "./addOrder.module.css"

const AddOrder = () => {
    return (
        <div className={`${style.containerOrder}`}>
            <button className={`${style.btnStyle} text-white font-bold py-2 px-4 rounded`}>
                <p className={`${style.fontAddOrderStyle}`}>    הוספת הזמנה  +  </p>
            </button>
        </div>
    );
};

export default AddOrder;