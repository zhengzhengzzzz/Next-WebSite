import { memo, ReactElement } from "react";
import { Col, Row } from "antd";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import type { FC } from "react";
import type { IRecommend } from "@/service/home";

import styles from "./index.module.scss";

export interface IProps {
  children?: ReactElement;
  recommends?: IRecommend[];
}
const Recommend: FC<IProps> = memo(function (props) {
  const { children, recommends = [] } = props;
  return (
    <div className={styles.recommend}>
      <div className={classNames("wrapper", styles.content)}>
        <Row>
          {recommends.map((recommend) => {
            return (
              <Col key={recommend.id} span={12}>
                <Link
                  href={"/detail?id=" + recommend.id}
                  className={styles["recommend-item"]}
                >
                  <Image
                    className={styles.image}
                    src={recommend.picStr!}
                    alt="recommend"
                    width={542}
                    height={300}
                  ></Image>
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
});
export default Recommend;
Recommend.displayName = "Recommend"; // 方便以后调试用的
