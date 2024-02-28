import { useEffect, useState } from "react";
import style from "./ordersView.module.css"
import axios from "axios";
import { OrderInterface } from "./interface/order";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { onChangeCurrentOrder } from "../../redux/features/orderSlice";
import ShowOrder from "./components/showOrder/showOrder";
import { setListOrders } from "../../redux/features/listOrdersSlice";
import ScreenOrder from "./components/showOrder/mobile/screenOrder";

const OrderView = () => {
    const dispatch = useAppDispatch()
    const { addOrderBtn } = useAppSelector(state => state.addOrderBtnSlice)
    // const {listOrders} = useAppSelector((state) => state.listOrdersSlice)
    const { currentOrder } = useAppSelector(state => state.orderSlice)
    const [arrayOrders, setArrayOrders] = useState<OrderInterface[]>()
    const { listOrders } = useAppSelector(state => state.listOrdersSlice)
    // const [selectedDeleteOrderMap, setSelectedDeleteOrderMap] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        fetch();
    }, [])

    const fetch = async () => {
        try {
            const { data: { orders } } = await axios.get("http://localhost:3000/api/getOrdersList");
            setArrayOrders(orders);
            dispatch(setListOrders({ listOrders: orders }));
        } catch (err) {
            console.log(err)
        }
    }

    //
    const handleOrderClick = (id: number) => {
        const getOrder: OrderInterface | undefined = listOrders?.find((item: OrderInterface) => item.id === id);
        dispatch(onChangeCurrentOrder({ currentOrder: getOrder as OrderInterface }));
    };

    return (
        <>
            {/* Orders for Desktop */}
            <div className="hidden md:block">
            {
                currentOrder ?
                    <table className={`mt-20 w-full ${style.containerTable}`}>
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
                            {arrayOrders?.map((item, i) => (
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
                    </table>
                    :
                    <ShowOrder />
            }
            </div>

            {/* Orders for Mobile */}
            <div className="block md:hidden">
                <div>
                    <div className={`${style.containerOrdersMobile} flex flex-col`}>
                        <div className={`${style.containerOrders} flex flex-col h-auto`}>
                            {
                                arrayOrders?.map((item, i) => (
                                    <div key={i} className=" border border-gray-300 mb-3" onClick={() => handleOrderClick(item.id)}>
                                        {/* header */}
                                        <div className="flex justify-between p-2">
                                            <p className={`ml-10 ${style.styleTextGray}`}>₪ 10132</p>
                                            <p>{item.status}</p>
                                        </div>

                                        {/* content */}
                                        <div className="flex justify-between items-center p-2">
                                            <svg className={`h-10 w-8 ${style.iconClickTable}`} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <polyline points="15 6 9 12 15 18" />
                                            </svg>
                                            <p className="align-baseline">{item.customer}</p>
                                        </div>

                                        {/* footer */}
                                        <footer className="flex justify-end gap-12 p-2">
                                            <p className={`${style.styleTextGray}`}>{item.date && new Date(item.date).toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\./g, '/')}</p>
                                            <p className={`${style.styleTextGray}`}>{item.id}#:מקט</p>
                                        </footer>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className={`${style.screenOrder}`}>
                        <ScreenOrder/>          
                </div>            
                <div className={`${addOrderBtn ? `${style.containerAddOrderCard}` : "hidden"}`}>
                        aa
                </div>
            </div>

        </>
    );
};

export default OrderView;