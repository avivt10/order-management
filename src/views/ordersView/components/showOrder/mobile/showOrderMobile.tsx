import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import DetailOrderMobile from "../../detailOrder/detailOrderMobile/detailOrderMobile";
import { OrderInterface } from "../../../interface/order";
import { onChangeCurrentOrder } from "../../../../../redux/features/orderSlice";

const ShowOrderMobile = () => {
  const { currentOrder } = useAppSelector(state => state.orderSlice)
  const { listOrders } = useAppSelector((state) => state.listOrdersSlice)
  const dispatch = useAppDispatch()

  const handleOrderClick = (id: number) => {
    const getOrder: OrderInterface | undefined = listOrders?.find((item: OrderInterface) => item.id === id);
    dispatch(onChangeCurrentOrder({ currentOrder: getOrder as OrderInterface }));
  };
  return (
    <div className="block md:hidden lg:hidden">
      {
        listOrders.length > 0 ?
          listOrders?.map((item, i) => (
            <div key={i} className="border border-gray-300 mb-3">
              {/* header */}
              <div className="flex justify-between p-2">
                <p className={`${item.status === "בוצע" ? 'text-green-600' :
                  item.status === "ממתין לאישור" ? 'text-yellow-500' :
                    item.status === "מאושר" ? 'text-blue-600' :
                      ''
                  }`}>
                  {item.status}
                </p>
                <p className="ml-10 text-gray-500">₪1000</p>
              </div>

              {/* content */}
              <div className="flex justify-between items-center p-2">
                <p className="align-baseline font-bold">{item.customer}</p>
                <svg className="h-10 w-8" onClick={() => handleOrderClick(item.id)} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
              </div>

              {/* footer */}
              <footer className="flex gap-12 p-2">
                <p>מקט: #{item.id}</p>
                <p>{item.date}</p>
              </footer>
            </div>
          ))
          :
          <h1> orders is empty... </h1>
      }
      {
        currentOrder.branch_id !== 0 &&
        <DetailOrderMobile />
      }
    </div>
  );
};

export default ShowOrderMobile;