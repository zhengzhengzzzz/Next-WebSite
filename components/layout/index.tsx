import { memo, ReactElement } from "react";
import type { FC } from "react";
import Footer from "../footer";
import NavBar from "../navbar";
export interface IProps {
  children?: ReactElement;
  // ...
}
const Layout: FC<IProps> = memo(function (props) {
  const { children } = props;
  return (
    <div className="layout">
      {/* Navbar */}
      <NavBar></NavBar>
      {/* 页面的内容: page */}
      {children}
      {/* footer */}
      <Footer></Footer>
    </div>
  );
});
export default Layout;
Layout.displayName = "Layout"; // 方便以后调试用的
