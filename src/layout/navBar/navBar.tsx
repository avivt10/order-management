import AddOrder from "./components/addOrder";
import Date from "./components/date/date";
import Filter from "./components/filter/filter";
import Search from "./components/search";
import style from "./navBar.module.css"
const NavBar = () => {

  return (
    <div>
      <nav>
        {/* NavBar for Desktop */}
        <div className={`flex justify-between `}>
          <div className="left-items">
            <AddOrder />
          </div>
          <div className="right-items flex gap-2">
            <Search />
            <Date />
          </div>
        </div>
        <div>
          <Filter />
        </div>
      </nav>
      {/* NavBar for Mobile */}
      <nav className={`${style.navBarMobileContainer}`}>
        <div className={`${style.navBarMobile} flex justify-between`}>
          <button className={`font-bold py-2 px-4 rounded ${style.btnNavBar}`}>ליקוט</button>
          <button className={`font-bold py-2 px-4 rounded ${style.btnNavBar}`}>ספקים</button>
          <button className={`font-bold py-2 px-4 rounded ${style.btnNavBar}`}>כל ההזמנות</button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
