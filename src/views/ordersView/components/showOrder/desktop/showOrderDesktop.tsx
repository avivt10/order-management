import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { OrderInterface } from "../../../interface/order";
import { onChangeCurrentOrder, onRemoveCurrentOrder, setIsActiveFalse } from "../../../../../redux/features/orderSlice";
import DetailOrderDesktop from "../../detailOrder/detailOrderDesktop/detailOrderDesktop";
import axios from "axios";
import { getServerUrl } from "../../../../../utils/functions/getServerUrl";
interface headerProps {
  fetch: () => Promise<void>;
}

const ShowOrderDesktop = ({fetch,} : headerProps) => {
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


  const deleteOrder = async(id: number) => {
    try{
        await axios.delete(`${getServerUrl()}/api/orders/deleteOrder`,{ data: { id } })
        alert("Order deleted successfully");
        fetch()
        dispatch(setIsActiveFalse());
        dispatch(onRemoveCurrentOrder());
    }catch(err){
      alert(err)
    }
  }
  return (
    <div className="md:block">
      <div className={`w-full mt-28 flex`}>
        <div className="flex flex-col w-1/5">
          {
            // side list orders
            listOrders?.map((item, i) => (
              <div key={i} className={`relative border cursor-pointer border-gray-300 bg-gray-50 p-2 mb-5 hover:border-green-700`}>
                <div className="flex justify-center gap-5 items-center" onClick={() => handleOrderClick(item.id)}>
                  <input type="checkbox" className="items-start" />
                  <div className="flex flex-col">
                    <p className="font-bold">{item.customer}</p>
                    <p className="text-sm">{item.id}#</p>
                  </div>
                  <button className={`${selectedDeleteOrderMap[item.id] ? "" : "hidden"} absolute left-1` } onClick={() => deleteOrder(item.id)}>
                    <svg className="text-green-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
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