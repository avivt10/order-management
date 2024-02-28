import { useAppSelector } from "../../../../../redux/hooks";
import style from "./screenOrder.module.css"
const ScreenOrder = () => {
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
  return (
    <div className={`${style.containerScreenOrder}`}>
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
      </div></div>
  );
};

export default ScreenOrder;