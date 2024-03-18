import { memo, ReactElement, useState } from "react";
import classNames from "classnames";
import type { FC } from "react";
import styles from "./index.module.scss";
import type { ISearchSuggest } from "@/service/home";
import { useRouter } from "next/router";
// 属性的类型声明
export interface IProps {
  children?: ReactElement;
  searchData?: ISearchSuggest;
}
const Search: FC<IProps> = memo(function (props) {
  const { children, searchData } = props;

  const router = useRouter();

  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState("蓝牙耳机");

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      // console.log(event.target);
      // console.log("按了 回车键");
      const inputTarget = event.target as HTMLInputElement; // input 元素对象
      // console.log(inputTarget.value);
      goToSearchPage(inputTarget.value);
      setInputFocus(false);
    }
  }
  function handleInputFocus(isFocus: boolean) {
    // console.log("isFocus=>", isFocus);
    setInputFocus(isFocus);
  }

  function handleItemClick(name: string) {
    console.log(name);
    setPlaceholder(name);
    goToSearchPage(name);
  }

  function goToSearchPage(name: string) {
    router.push({
      pathname: "/search",
      query: {
        q: name,
      },
    });
  }
  return (
    <div className={styles.search}>
      {/* 搜索输入框 */}
      <div className={styles["search-bg"]}>
        <input
          className={styles.input}
          type="text"
          placeholder={placeholder}
          onFocus={() => handleInputFocus(true)}
          onBlur={() => handleInputFocus(false)}
          onKeyDown={(e) => handleKeyDown(e as any)}
        />
      </div>

      {/* 下拉的面板 */}
      <div
        className={classNames(
          styles["search-panel"],
          inputFocus ? styles.show : styles.hide
        )}
      >
        <div className={styles.shadow}></div>
        <h2>热门搜索</h2>
        <ul>
          {searchData?.configKey &&
            searchData?.configKey.map((item, index) => {
              return (
                <li
                  key={item[index + 1]}
                  onMouseDown={() => handleItemClick(item[index + 1])}
                >
                  {item[index + 1]}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
});
export default Search;
Search.displayName = "Search"; // 方便以后调试用的
