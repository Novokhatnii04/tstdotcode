import { FC } from "react";
import { Outlet } from "react-router-dom";

export const Layout: FC = () => {
  return (
    <>
      {/* header */}
      <Outlet />
      {/* footer */}
    </>
  );
};

export default Layout;
