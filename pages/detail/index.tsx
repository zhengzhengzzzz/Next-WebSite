import { memo, ReactElement } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import type { FC } from "react";
import { GetServerSideProps } from "next";
import wrapper from "@/store/index";
import { fetchSearchSuggest } from "@/store/modules/home";
import { getDetailPageInfo, IDetailPageInfo } from "@/service/detail";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import GridView from "@/components/grid-view";

export interface IProps {
  children?: ReactElement;
  detailData?: IDetailPageInfo;
}
const Detail: FC<IProps> = memo(function (props) {
  const { children, detailData } = props;
  const router = useRouter();
  const { id } = router.query; // 拿到 url中查询字符串
  console.log("id=>", id);

  return (
    <div className={styles.detail}>
      <div className={classNames("wrapper", styles.content)}>
        {/* 图片 */}
        <div className={styles.banner}>
          <Link href={"/"}>
            <Image
              className={styles.image}
              src={detailData?.webPic!}
              alt="air"
              fill
            ></Image>
          </Link>
        </div>
        {/* 商品列表 */}
        <GridView products={detailData?.products}></GridView>
      </div>
    </div>
  );
});
export default Detail;
Detail.displayName = "Detail"; // 方便以后调试用的

// ssr
// getServerSideProps 是在服务器端运行
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    return async (context) => {
      // 1.触发一个异步的action来发起网络请求, 拿到搜索建议并存到redex中
      await store.dispatch(fetchSearchSuggest());
      // 2.拿到详情页面的数据
      const { id } = context.query; // 拿到 url中查询字符串
      const res = await getDetailPageInfo(id as string);
      return {
        props: {
          detailData: res.data,
        },
      };
    };
  });
