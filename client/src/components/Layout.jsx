import { SidebarOne } from "./SideBar";
import UserSection from "./UserSection";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-red-40 flex w-full h-screen">
        <SidebarOne />
        <div className="w-full">
          <UserSection />
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
