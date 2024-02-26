import AddOrder from "./components/addOrder";
import Date from "./components/date/date";
import Search from "./components/search";
import "./navBar.css"
const NavBar = () => {

  return (
    <nav>
      <div className="flex">
        <div className="left-items">
          <AddOrder />
        </div>
        <div className="right-items flex gap-28">
          <Search />
          <Date />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
