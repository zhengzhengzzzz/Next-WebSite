import { memo, ReactElement } from "react";
import styles from "./index.module.scss";
import type { FC } from "react";
export interface IProps {
  children?: ReactElement;
  title?: string;
}
const SectionTitle: FC<IProps> = memo(function (props) {
  const { children, title } = props;
  return <div className={styles["section-title"]}>{title}</div>;
});
export default SectionTitle;
SectionTitle.displayName = "SectionTitle"; // 方便以后调试用的
