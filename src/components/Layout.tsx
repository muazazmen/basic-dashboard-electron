/** @format */

import type { ReactNode } from "react";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
  onLogout: () => void;
};

const Layout = ({ children, onLogout }: LayoutProps) => {
  return (
    <div>
      <Header onLogout={onLogout} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
