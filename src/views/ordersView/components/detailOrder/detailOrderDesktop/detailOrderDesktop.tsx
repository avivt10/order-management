import Search from "../../../../../layout/navBar/components/search";
import { useAppSelector } from "../../../../../redux/hooks";
import style from "./detailOrderDesktop.module.css"

const DetailOrderDesktop = () => {
  const { currentOrder } = useAppSelector(state => state.orderSlice)
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

  //details order desktop
  return (
    <div className="flex flex-col items-start p-4 ml-4 w-4/5 border border-gray-300 bg-gray-50 rounded-lg mr-6">
      {/* header  */}
      <div className="flex flex-row-reverse justify-between">
        <div className="flex gap-10">
          <p className="text-blue-500">{currentOrder?.status}</p>
          <p className={`${style.nameOrder} font-bold text-lg truncate`}>{currentOrder?.customer} </p>
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

      <div className="p-5 flex flex-col ">
        <div className="mb-5 flex justify-between gap-20">
          <p>תאריך אספקה</p>
          <p className="font-bold">{currentOrder?.date && new Date(currentOrder?.date).toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\./g, '/')} </p>
        </div>

        <div className="mb-5 flex justify-between">
          <p>דחיפות</p>
          <div className="flex gap-2">
            <p className={`font-bold item-center`} >{randomItem.val}</p>
            <div className="w-4 h-4 mt-1.5 rounded-2xl " style={{ background: randomItem.color }} />
          </div>
        </div>
        <div className="mb-5 flex justify-between">
          <p>סניף</p>
          <p className={`font-bold item-center`} >{currentOrder?.branch}</p>
        </div>
        <div className="mb-5 flex justify-between">
          <p>סוג הזמנה </p>
          <p className={`font-bold item-center`} >{currentOrder?.order_type || "אין"} </p>
        </div>
        <div className="mb-5 flex justify-between">
          <p>מקור ההזמנה</p>
          <p className={`font-bold item-center`} >{currentOrder?.source}</p>
        </div>
        <div className="mb-5 flex justify-between">
          <p>תאריך יצירה</p>
          <p className={`font-bold item-center`} >    {currentOrder?.created_at ? currentOrder?.created_at.split(" ")[0] : ""}
          </p>
        </div>
        <div className="mb-5 flex justify-between">
          <p>שעת יצירה</p>
          <p className={`font-bold item-center`} >{currentOrder?.time || "אין"}</p>
        </div>
        <div dir="rtl" className="mb-5 flex justify-between">
          <p>הערות</p>
          <p className={`font-bold item-center w-1/3`} >{currentOrder?.notes || "אם יש הרבה אז הגובה ישתנה בהתאם"}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailOrderDesktop;