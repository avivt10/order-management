import { useEffect, useState } from "react";
import style from "./addOrder.module.css"
import { useAppDispatch } from "../../../../redux/hooks";
import { setModeBtn } from "../../../../redux/features/addOrderBtnSlice";

const AddOrder = () => {
    const [isOpen,setIsOpen] = useState(false);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setModeBtn(isOpen))
    }, [isOpen])
    
    return (
        <div>
        <div className={`${style.containerOrder}`}>
            <button className={`${style.btnStyle} text-white font-bold py-2 px-4 rounded`} onClick={()=> setIsOpen(!isOpen)}>
                <p className={`${style.fontAddOrderStyle}`}>    הוספת הזמנה  +  </p>
            </button>
        </div>
        </div>
    );
};

export default AddOrder;