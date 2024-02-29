import HeaderFilters from './headerFilters/headerFilters';

const Header = () => {
  return (
    <>
      <div className='hidden md:block'>
        <div className={'flex justify-between'}>
          <HeaderFilters />
          {/* add new order */}
          <div className='w-1/2'>
          <button className='bg-green-400 hover:bg-green-700 text-white font-semibold py-2.5 px-4 float-end'>
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
    </>
  );
};

export default Header;