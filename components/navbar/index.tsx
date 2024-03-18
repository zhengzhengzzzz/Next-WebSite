import { memo, ReactElement } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styles from "./index.module.scss";
import classNames from "classnames";
import Link from "next/link";
import Search from "../search";

import type { FC } from "react";
import { IAppRootState } from "@/store/index";

export interface IProps {
  children?: ReactElement;
  // ...
}
const NavBar: FC<IProps> = memo(function (props) {
  const { children } = props;

  // 从 redux 读取数据
  const { navbar, counter } = useSelector((rootState: IAppRootState) => {
    return {
      navbar: rootState.home.navbar,
      counter: rootState.home.counter,
    };
  }, shallowEqual);

  return (
    <div className={styles.navbar}>
      <div className={classNames("wrapper", styles.content)}>
        <div className={styles["content-left"]}>
          <Link href="/" className={styles.logo}></Link>
          <h1 className={styles.title}>云音乐商城 - 音乐购有趣</h1>
        </div>
        <div className={styles["content-right"]}>
          {/* <div className={styles["right-search"]}>search</div> */}
          <Search searchData={navbar}></Search>
          {/* 购物车 */}
          <div className={styles["right-cart"]}>
            <Link href="/" className={styles.cart}>
              <span className={styles.count}>{counter}</span>
            </Link>
          </div>
          <div className={styles["right-login"]}>登录</div>
        </div>
      </div>
    </div>
  );
});
export default NavBar;
NavBar.displayName = "NavBar"; // 方便以后调试用的
