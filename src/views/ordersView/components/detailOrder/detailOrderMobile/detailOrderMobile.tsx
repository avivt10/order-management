import { onRemoveCurrentOrder } from "../../../../../redux/features/orderSlice";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";

const DetailOrderMobile = () => {
  const { currentOrder } = useAppSelector(state => state.orderSlice)
  const dispatch = useAppDispatch();

  const resetCurrentOrder = () => {
    dispatch(onRemoveCurrentOrder())
  }

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

  const randomIndex = Math.floor(Math.random() * priority.length);
  const randomItem = priority[randomIndex];

  return (
    <div className="flex justify-center flex-col p-8 absolute bottom-0 left-0 w-full h-fullHight border border-gray-300 bg-gray-50 rounded-lg">
      <button className={`flex text-zinc-500`} onClick={() => resetCurrentOrder()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>
      <header className="h-10 mb-10">
        <p className="font-bold text-right mt-5 text-3xl">{currentOrder.customer}</p>
      </header>

      <div className="mb-2 flex justify-between p-2">
        <p>פרטי הזמנה</p>
        <p className="font-bold">{currentOrder.date} </p>
      </div>

      <div className="mb-2 flex justify-between p-2">
        <p>סטטוס</p>
        <p className="font-bold">{currentOrder.status} </p>
      </div>

      <div className="mb-2 flex justify-between p-2">
        <p>תאריך אספקה</p>
        <p className="font-bold">{currentOrder.date} </p>
      </div>

      <div className="mb-2 flex justify-between p-2">
        <p>דחיפות</p>
        <div className="flex  gap-1">
          <div className="w-4 h-4 mt-1.5 rounded-2xl " style={{ background: randomItem.color }} />
          <p className="font-bold item-center" >{randomItem.val}</p>
        </div>
      </div>
      <div className="mb-2 flex justify-between p-2">
        <p>סניף</p>
        <p className="font-bold item-center" >{currentOrder.branch}</p>
      </div>
      <div className="mb-2 flex justify-between p-2">
        <p>סוג הזמנה </p>
        <p className={`font-bold item-center`} >{currentOrder.order_type || "אין"} </p>
      </div>
      <div className="mb-2 flex justify-between p-2">
        <p>מקור ההזמנה</p>
        <p className={`font-bold item-center`} >{currentOrder.source}</p>
      </div>
      <div className="mb-2 flex justify-between p-2">
        <p>תאריך יצירה</p>
        <p className="font-bold item-center">    {currentOrder?.created_at ? currentOrder?.created_at.split(" ")[0] : ""}
        </p>
      </div>
      <div className="mb-2 flex justify-between p-2">
        <p>שעת יצירה</p>
        <p className="font-bold item-center">
          {currentOrder.time || "אין"}
        </p>
      </div>
      <div className="mb-2 flex justify-between p-2">
        <p>הערות</p>
        <p className="font-bold item-center">{currentOrder.notes || "אם יש הרבה אז הגובה ישתנה בהתאם"}</p>
      </div>
    </div>
  );
};

export default DetailOrderMobile;