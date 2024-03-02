import axios from "axios";
import React, { useEffect, useState } from "react";
import { setListOrders } from "../../redux/features/listOrdersSlice";
import { onChangeCurrentOrder, setIsActiveTrue } from "../../redux/features/orderSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Header from "./components/header/header";
import { OrderInterface } from "./interface/order";
import style from "./ordersView.module.css";
import ShowOrderDesktop from "./components/showOrder/desktop/showOrderDesktop";
import ShowOrderMobile from "./components/showOrder/mobile/showOrderMobile";
import { getServerUrl } from "../../utils/functions/getServerUrl";

const OrderView = () => {
  const dispatch = useAppDispatch();
  const { isActive } = useAppSelector(state => state.orderSlice);
  const { listOrders } = useAppSelector(state => state.listOrdersSlice);
  const { text } = useAppSelector((state) => state.searchSlice)
  const [filteredOrders, setFilteredOrders] = useState<OrderInterface[]>();
  useEffect(() => {
    filterFunction()
  }, [text])

  const filterFunction = () => {
    if (text !== "") {
      const filtered = text ? listOrders.filter((item) => item.customer.toLowerCase().includes(text.toLowerCase())) : listOrders;
      setFilteredOrders(filtered);
    }
    else {
      setFilteredOrders(listOrders)
    }
  };

  useEffect(() => {
    if (listOrders !== undefined && listOrders.length === 0) {
      fetch();
      setFilteredOrders(listOrders)
    }
    setFilteredOrders(listOrders)
  }, [listOrders]);

  const fetch = async () => {
    try {
      const {data} = await axios.get(`${getServerUrl()}/api/orders/getOrders`);
      dispatch(setListOrders({ listOrders: data.arrayOrders }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleOrderClick = (id: number) => {
    const getOrder: OrderInterface | undefined = listOrders?.find((item: OrderInterface) => item.id === id);
    dispatch(onChangeCurrentOrder({ currentOrder: getOrder as OrderInterface }));
    dispatch(setIsActiveTrue());
  };

  return (
    <React.Fragment>
      <Header fetch={fetch} />
      {/* Orders for Desktop */}
      <div className="hidden md:block">
        {
          !isActive && filteredOrders && filteredOrders.length > 0 &&
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
                {filteredOrders?.map((item, i) => (
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
                    <td>{item.date}</td>
                    <td>{item.branch}
                    </td>
                    <td className={`${item.status === "בוצע" ? 'text-green-600' :
                      item.status === "ממתין לאישור" ? 'text-yellow-500' :
                        item.status === "מאושר" ? 'text-blue-600' :
                          ''
                      }`}>
                      {item.status}
                    </td>
                    <td>
                    ₪1000
                      </td>
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
        }

        {
          !isActive && filteredOrders?.length == 0 &&
          <h1>אין תוצאות</h1>
        }
        {
          isActive && listOrders &&
          <ShowOrderDesktop fetch={fetch} />
        }

        {
          listOrders !== undefined && listOrders.length === 0 &&
          <h1>orders is empty...</h1>
        }
      </div>
      {/* Orders for Mobile */}
      <ShowOrderMobile />
    </React.Fragment>
  );
};

export default OrderView;