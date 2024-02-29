import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { onChangeCurrentOrder } from "../../../../../redux/features/orderSlice";
import { OrderInterface } from "../../../interface/order";

const DetailOrderMobile = () => {
  const { currentOrder } = useAppSelector(state => state.orderSlice)
  const dispatch = useAppDispatch();

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

  const resetCurrentOrder = () => {
    if (currentOrder) {
      dispatch(onChangeCurrentOrder({ currentOrder: {} as OrderInterface }));
    }
  }

  const randomIndex = Math.floor(Math.random() * priority.length);
  const randomItem = priority[randomIndex];

  return (
    <div className="flex justify-center flex-col items-center absolute bottom-0 left-0 w-full h-fullHight border border-gray-300 bg-gray-50 rounded-lg">
      <button className={`mb-28 flex bg-green-500`} onClick={() => resetCurrentOrder()}>
        <svg className="text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div className="mb-5 flex justify-between gap-20">
        <p>פרטי הזמנה</p>
        <p className="font-bold">{currentOrder.date && new Date(currentOrder.date).toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\./g, '/')} </p>

      </div>
      <div className="mb-5 flex justify-between gap-20">
        <p>פרטי הזמנה</p>
        <p className="font-bold">{currentOrder.customer} </p>

      </div>

      <div className="mb-5 flex justify-between w-60">
        <p>תאריך אספקה</p>
        <p className="font-bold">{currentOrder.date && new Date(currentOrder.date).toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\./g, '/')} </p>
      </div>

      <div className="mb-5 flex justify-between w-60">
        <p>דחיפות</p>
        <div className="flex">
          <div className="w-4 h-4 mt-1.5 rounded-2xl " style={{ background: randomItem.color }} />
          <p className={`font-bold item-center`} >{randomItem.val}</p>
        </div>
      </div>
      <div className="mb-5 flex justify-between w-60">
        <p className={`font-bold item-center`} >{currentOrder.branch}</p>
        <p>סניף</p>
      </div>
      <div className="mb-5 flex justify-between w-60">
        <p>סוג הזמנה </p>
        <p className={`font-bold item-center`} >{currentOrder.order_type || "אין"} </p>
      </div>
      <div className="mb-5 flex justify-between w-60">
        <p>מקור ההזמנה</p>
        <p className={`font-bold item-center`} >{currentOrder.source}</p>
      </div>
      <div className="mb-5 flex justify-between w-60">
        <p>תאריך יצירה</p>
        <p className={`font-bold item-center`} >    {currentOrder?.created_at ? currentOrder?.created_at.split(" ")[0] : ""}
        </p>
      </div>
      <div className="mb-5 flex justify-between w-60">
        <p>שעת יצירה</p>
        <p className={`font-bold item-center`} >
          {currentOrder.time || "אין"}
        </p>
      </div>
      <div dir="rtl" className="mb-5 flex justify-between w-60">
        <p>הערות</p>
        <p className={`font-bold item-center w-1/3`} >{currentOrder.notes || "אם יש הרבה אז הגובה ישתנה בהתאם"}</p>
      </div>
    </div >
  );
};

export default DetailOrderMobile;