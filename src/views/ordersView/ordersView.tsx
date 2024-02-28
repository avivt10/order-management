import { useEffect, useState } from "react";
import style from "./ordersView.module.css"
import axios from "axios";
import { OrderInterface } from "./interface/order";

const OrderView = () => {
    const [selectedOrder, setSelectedOrder] = useState<OrderInterface>();
    const [list, setList] = useState<OrderInterface[]>()

    useEffect(() => {
        fetch();
    }, [])

    const fetch = async () => {
        try {
            const { data: { orders } } = await axios.get("http://localhost:3000/api/getOrdersList");
            setList(orders);
        } catch (err) {
            console.log(err)
        }
    }

    const handleOrderClick = (id: number) => {
        const getOrder: OrderInterface | undefined = list?.find((item: OrderInterface) => item.id === id);
        setSelectedOrder(getOrder)
    };


    return (
        <>
            {/* Orders for Desktop */}
            <table className="mt-20">
                <thead className="bg-gray-50">
                    <tr>
                        <th></th>
                        <th>מחיר</th>
                        <th>סטטוס</th>
                        <th>סניף</th>
                        <th>תאריך</th>
                        <th>הזמנה</th>
                        <th><input type="checkbox" className={`${style.checkboxStyle}`} /></th>
                    </tr>
                </thead>
                <tbody>
                    {list?.map((item, i) => (
                        <tr key={i} className={`${style.trBodyStyle}`}>
                            <td>
                                <button onClick={() => handleOrderClick(item.id)}>
                                    <svg className={`h-10 w-8 ${style.iconClickTable}`} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <polyline points="15 6 9 12 15 18" />
                                    </svg>
                                </button>
                            </td>
                            <td>1000</td>
                            <td>{item.status}</td>
                            <td>{item.branch}</td>
                            <td>{item.date && new Date(item.date).toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\./g, '/')}</td>
                            <td>
                                <div className="flex-col">
                                    <p className="font-bold">{item.customer}</p>
                                    <p>{item.id}</p>
                                </div>
                            </td>
                            <td>
                                <input type="checkbox" className={`${style.checkboxStyle}`} />
                            </td>
                        </tr>
                    ))}
                </tbody>
                {/* Display details of the order */}

                {
                    selectedOrder &&    
                    <div className="flex-1 ml-4">
                        {/* Display details of the selected order here */}
                        <p>תאריך: {selectedOrder?.date}</p>
                        <p>דחיפות: גבוהה</p>
                        <p>סניף: {selectedOrder?.branch}</p>
                        <p>סוג הזמנה: {selectedOrder?.order_type}</p>
                        <p>מקור הזמנה: {selectedOrder?.source}</p>
                        <p>תאריך יצירה: {selectedOrder?.created_at}</p>
                        <p>שעת יצירה: {selectedOrder?.time}</p>
                        <p>הערות: {selectedOrder?.notes}</p>
                        {/* <p>תאריך: {selectedOrder.date && new Date(selectedOrder.date).toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\./g, '/')}</p> */}
                        {/* ... other details */}
                    </div>
                }
            </table>
            {/* Orders for Mobile */}
            <div className={`${style.wrapperOrdersMobile}`}>
                <div className={`${style.containerOrdersMobile} flex flex-col`}>
                    <div className={`${style.containerOrders} flex flex-col h-auto`}>
                        {
                            list?.map((item, i) => (
                                <div key={i} className=" border border-gray-300 mb-3">
                                    {/* header */}
                                    <div className="flex justify-between p-2">
                                        <p className={`ml-10 ${style.styleTextGray}`}>₪ 10132

                                        </p>
                                        <p>{item.status}</p>
                                    </div>
                                    {/* content */}
                                    <div className="flex justify-between items-center	p-2">
                                        <svg className={`h-10 w-8 ${style.iconClickTable}`} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <polyline points="15 6 9 12 15 18" />
                                        </svg>
                                        <p className="align-baseline">{item.customer}</p>
                                    </div>
                                    {/* footer */}
                                    <div className="flex justify-end gap-12 p-2">
                                        <p className={`${style.styleTextGray}`}>{item.date && new Date(item.date).toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\./g, '/')}</p>
                                        <p className={`${style.styleTextGray}`}>{item.id}#:מקט</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderView;