import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import style from "./showOrderDesktop.module.css"
import { OrderInterface } from "../../../interface/order";
import { onChangeCurrentOrder } from "../../../../../redux/features/orderSlice";
import DetailOrderDesktop from "../../detailOrder/detailOrderDesktop/detailOrderDesktop";

const ShowOrderDesktop = () => {
  const [selectedDeleteOrderMap, setSelectedDeleteOrderMap] = useState<{ [key: number]: boolean }>({});
  const dispatch = useAppDispatch()
  const { listOrders } = useAppSelector(state => state.listOrdersSlice)

  const handleOrderClick = (id: number) => {
    const getOrder: OrderInterface | undefined = listOrders?.find((item: OrderInterface) => item.id === id);
    dispatch(onChangeCurrentOrder({ currentOrder: getOrder as OrderInterface }));
    setSelectedDeleteOrderMap({});
    setSelectedDeleteOrderMap(prevState => ({
      ...prevState,
      [id]: !prevState[id] || false,
    }));
  };

  return (
    <div className="md:block">
      <div className={`w-full mt-28 flex`}>
        <div className="flex flex-col w-1/5">
          {
            // side list orders
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
        <DetailOrderDesktop />
      </div>
    </div>
  );
};

export default ShowOrderDesktop;