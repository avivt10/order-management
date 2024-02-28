import OrderView from "../views/ordersView/ordersView";
import NavBar from "./navBar/navBar";

const Layout = () => {
  return (
    <div className="flex flex-col">
      <NavBar />
      <>
      <OrderView />
      </>
    </div>
  );
};

export default Layout;
