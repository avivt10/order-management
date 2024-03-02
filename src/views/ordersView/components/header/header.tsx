import { useState } from 'react';
import HeaderFilters from './headerFilters/headerFilters';
import axios from 'axios';
import "./header.css"
import { getServerUrl } from '../../../../utils/functions/getServerUrl';
interface headerProps{
  fetch: () => Promise<void>;
}

const Header = ({fetch} : headerProps)  => {
  const [openModal, setOpenModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [typeOrder, setTypeOrder] = useState("");

  const createOrder = async () => {
    const data = {
      customerName: customerName,
      branchName: branchName,
      typeOrder: typeOrder
    }
    try {
      await axios.post(`${getServerUrl()}/api/orders/createOrder`, { data })
      fetch()
      alert("הזמנה נוספה בהצלחה")
      setOpenModal(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className='hidden md:block'>
        <div className={'flex justify-between'}>
          <HeaderFilters />
          {/* add new order */}
          <div className='w-1/2'>
            <button className='bg-green-400 hover:bg-green-700 text-white font-semibold py-2.5 px-4 float-end' onClick={() => setOpenModal(true)}>
              הוספת הזמנה +
            </button>
          </div>
        </div>
      </div>
      <div className='flex justify-between md:hidden'>
        <button className='font-bold py-2 px-4 rounded'>ליקוט</button>
        <button className='font-bold py-2 px-4 rounded'>ספקים</button>
        <button className='font-bold py-2 px-4 rounded'>כל ההזמנות</button>
      </div>
      {
        openModal &&
        <section>
          <div className="py-16 absolute w-full">
            <div className="mx-auto px-6 max-w-6xl text-gray-500">
              <div className="mt-12 grid gap-3">
              <div className="hidden md:flex cursor-pointer items-center justify-center text-3xl text-white caret-transparent" onClick={() => setOpenModal(false)}>
                  <svg height="40px" width="40px" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><path fill="black" d="M 19 15 C 17.977 15 16.951875 15.390875 16.171875 16.171875 C 14.609875 17.733875 14.609875 20.266125 16.171875 21.828125 L 30.34375 36 L 16.171875 50.171875 C 14.609875 51.733875 14.609875 54.266125 16.171875 55.828125 C 16.951875 56.608125 17.977 57 19 57 C 20.023 57 21.048125 56.609125 21.828125 55.828125 L 36 41.65625 L 50.171875 55.828125 C 51.731875 57.390125 54.267125 57.390125 55.828125 55.828125 C 57.391125 54.265125 57.391125 51.734875 55.828125 50.171875 L 41.65625 36 L 55.828125 21.828125 C 57.390125 20.266125 57.390125 17.733875 55.828125 16.171875 C 54.268125 14.610875 51.731875 14.609875 50.171875 16.171875 L 36 30.34375 L 21.828125 16.171875 C 21.048125 15.391875 20.023 15 19 15 z"></path></svg>
                </div>
                <div className="relative z-10 group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 hidden md:block">
                  <h4 className="title">הוספת הזמנה</h4>
                  <div aria-hidden="true" className="inset-0 absolute aspect-video border rounded-full -translate-y-1 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-green-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
                  <div className="relative ">
                    <div className="mt-6 rounded-b-[--card-border-radius]">
                      <div className="mt-6 mb-6  gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">שם לקוח</label>
                          <div className="mt-2 mb-2">
                            <input onChange={(e) => setCustomerName(e.target.value)} type="text" name="name" id="name" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">סוג הזמנה</label>
                          <div className="mt-2 mb-2" >
                            <input onChange={(e) => setTypeOrder(e.target.value)} type="text" name="type" id="type" autoComplete="type-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label htmlFor="branch" className="block text-sm font-medium leading-6 text-gray-900">סניף</label>
                          <div className="mt-2 mb-2">
                            <input onChange={(e) => setBranchName(e.target.value)} type="text" name="branch" id="branch" autoComplete="branch-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                          </div>
                        </div>
                        <div className="flex gap-3 -mb-8  py-4 border-t border-gray-200 dark:border-gray-800" onClick={() => createOrder()}>
                          <a href="#" className="pr-5 pl-5 group rounded-xl disabled:border :select-none [&>:not(.sr-only)]:relative :disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled: dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark::disabled:!text-white text-gray-950  hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
                            <span>הוספה</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </>
  );
};

export default Header;