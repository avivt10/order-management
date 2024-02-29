import axios from "axios";
import { useEffect, useState } from "react";
import { setListOrders } from "../../redux/features/listOrdersSlice";
import { onChangeCurrentOrder, setIsActiveTrue } from "../../redux/features/orderSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Header from "./components/header/header";
import { OrderInterface } from "./interface/order";
import style from "./ordersView.module.css";
import ShowOrderDesktop from "./components/showOrder/desktop/showOrderDesktop";
import ShowOrderMobile from "./components/showOrder/mobile/showOrderMobile";

const OrderView = () => {
  const [arrayOrders, setArrayOrders] = useState<OrderInterface[]>();
  const dispatch = useAppDispatch();
  const { isActive } = useAppSelector(state => state.orderSlice);
  const { listOrders } = useAppSelector(state => state.listOrdersSlice);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const { data: { orders } } = await axios.get("http://localhost:3000/api/getOrdersList");
      setArrayOrders(orders);
      dispatch(setListOrders({ listOrders: orders }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleOrderClick = (id: number) => {
    const getOrder = listOrders?.find((item) => item.id === id);
    if(getOrder){
      dispatch(onChangeCurrentOrder({ currentOrder: getOrder }));
      dispatch(setIsActiveTrue())
    }
  };

  return (
    <>
    <Header />
      {/* Orders for Desktop */}
      <div className="hidden md:block">
        {
          !isActive ?
            <table className={`mt-20 w-full ${style.containerTable}`}>
              <thead className="bg-gray-50">
                <tr>
                  <th><input type="checkbox" className={`${style.checkboxStyle}`} /></th>
                  <th>הזמנה</th>
                  <th>תאריך</th>
                  <th>סניף</th>
                  <th>סטטוס</th>
                  <th>מחיר</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {arrayOrders?.map((item, i) => (
                  <tr key={i} className={`${style.trBodyStyle}`}>
                    <td>
                      <input type="checkbox" className={`${style.checkboxStyle}`} />
                    </td>
                    <td>
                      <div className="flex-col">
                        <p className="font-bold">{item.customer}</p>
                        <p>{item.id}</p>
                      </div>
                    </td>
                    <td>{item.date && new Date(item.date).toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\./g, '/')}</td>
                    <td>{item.branch}</td>
                    <td>{item.status}</td>
                    <td>1000</td>
                    <td>
                      <button onClick={() => handleOrderClick(item.id)}>
                        <svg className={`h-10 w-8 ${style.iconClickTable}`} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round">
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <polyline points="15 6 9 12 15 18" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            :
            <ShowOrderDesktop/>
        }
      </div>
        {/* Orders for Mobile */}
        <ShowOrderMobile/>
    </>
  );
};

export default OrderView;