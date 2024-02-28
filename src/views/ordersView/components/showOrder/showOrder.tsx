import { useState } from "react";
import Search from "../../../../layout/navBar/components/search";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { OrderInterface } from "../../interface/order";
import style from "./showOrder.module.css"
import { onChangeCurrentOrder } from "../../../../redux/features/orderSlice";

const ShowOrder = () => {
    const { currentOrder } = useAppSelector(state => state.orderSlice)
    const dispatch = useAppDispatch()
    const [selectedDeleteOrderMap, setSelectedDeleteOrderMap] = useState<{ [key: number]: boolean }>({});
    const { listOrders } = useAppSelector(state => state.listOrdersSlice)

    const priority = [
        {
            val: "נמוכה",
            color: "green",
        },
        {
            val: "בינונית",
            color: "yellow",
        },
        {
            val: "גבוהה",
            color: "red",
        },
    ]

    const handleOrderClick = (id: number) => {
        const getOrder: OrderInterface | undefined = listOrders?.find((item: OrderInterface) => item.id === id);
        dispatch(onChangeCurrentOrder({ currentOrder: getOrder as OrderInterface }));
        setSelectedDeleteOrderMap({});
        setSelectedDeleteOrderMap(prevState => ({
            ...prevState,
            [id]: !prevState[id] || false,
        }));
    };

    const randomIndex = Math.floor(Math.random() * priority.length);
    const randomItem = priority[randomIndex];
    return (
        <div className={` w-full mt-28 ${style.containerShowOrder}`}>
            {/* Show in Web */}

            {/* column */}
            <div className="flex flex-col w-1/5">
                {
                    listOrders?.map((item, i) => (
                        <div key={i} className={`border cursor-pointer border-gray-300 bg-gray-50 ${style.columnOrder}`}>
                            <div className={`flex justify-center gap-5 items-center ${style.containerOrder}`} onClick={() => handleOrderClick(item.id)}>
                                <button className={`${selectedDeleteOrderMap[item.id] ? style.btnDeleteOrder : "hidden"} absolute right-64`}>
                                    <svg className="text-green-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                                <div className="flex flex-col">
                                    <p className={`font-bold ${style.nameOrder}`}>{item.customer}</p>
                                    <p className={`${style.styleTextGray} text-sm `}>{item.id}#</p>
                                </div>
                                <input type="checkbox" className={`items-start ${style.checkboxStyle}`} />
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* detail */}
            <div className="flex flex-col items-end p-4 ml-4 w-4/5 border border-gray-300 bg-gray-50 rounded-lg mr-6">
                <div className="flex justify-between">
                    <div className="flex gap-10">
                        <p className="text-blue-500">{currentOrder.status}</p>
                        <p className={`${style.nameOrder} font-bold text-lg truncate`}>{currentOrder.customer} </p>
                    </div>
                    <button className="flex gap-3 absolute left-20">
                        הזמנה חוזרת
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </button>
                </div>

                <div className="mb-3 mt-5">
                    <Search />
                </div>
                <div className="p-5">
                    <div className="mb-5 flex justify-between gap-20">
                        <p className="font-bold">{currentOrder.date && new Date(currentOrder.date).toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\./g, '/')} </p>
                        <p>תאריך אספקה</p>
                    </div>

                    <div className="mb-5 flex justify-between">
                        <div className="flex gap-2">
                            <p className={`font-bold item-center`} >{randomItem.val}</p>
                            <div className="w-4 h-4 mt-1.5 rounded-2xl " style={{ background: randomItem.color }} />
                        </div>
                        <p>דחיפות</p>
                    </div>
                    <div className="mb-5 flex justify-between">
                        <p className={`font-bold item-center`} >{currentOrder.branch}</p>
                        <p>סניף</p>
                    </div>
                    <div className="mb-5 flex justify-between">
                        <p className={`font-bold item-center`} >{currentOrder.order_type || "אין"} </p>
                        <p>סוג הזמנה </p>
                    </div>
                    <div className="mb-5 flex justify-between">
                        <p className={`font-bold item-center`} >{currentOrder.source}</p>
                        <p>מקור ההזמנה</p>
                    </div>
                    <div className="mb-5 flex justify-between">
                        <p className={`font-bold item-center`} >{currentOrder.created_at.split(" ")[0]}</p>
                        <p>תאריך יצירה</p>
                    </div>
                    <div className="mb-5 flex justify-between">
                        <p className={`font-bold item-center`} >{currentOrder.time || "אין"}</p><p>שעת יצירה</p>
                    </div>
                    <div dir="rtl" className="mb-5 flex justify-between">
                        <p>הערות</p>
                        <p className={`font-bold item-center w-1/3`} >{currentOrder.notes || "אם יש הרבה אז הגובה ישתנה בהתאם"}</p>
                    </div>
                </div>
            </div>
            {/* Show in Mobile */}
            {/* <div className={`${style.containerShowOrderSm}`}>
                <div className={`flex justify-center gap-5 items-center ${style.containerOrder}`} onClick={() => handleOrderClick(item.id)}>
                            <>
                                <div className="flex justify-between">
                                    <div className="flex gap-10">
                                        <p className="text-blue-500">{currentOrder.status}</p>
                                        <p className={`${style.nameOrder} font-bold text-lg`}>{currentOrder.customer} </p>
                                    </div>
                                    <button className="flex gap-3 absolute left-20">
                                        הזמנה חוזרת
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                        </svg>
                                    </button>
                                </div>
                            </>
   
      
                </div> */}
            {/* </div> */}

        </div>
    );
};
export default ShowOrder;