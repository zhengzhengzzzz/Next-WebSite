import { memo, ReactElement } from "react";
import type { FC } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import wrapper from "@/store/index";
import { fetchSearchSuggest } from "@/store/modules/home";
import { getProductSearchData } from "@/service/search";
import { IProduct } from "@/service/home";
import GridView from "@/components/grid-view";
import classNames from "classnames";
export interface IProps {
  children?: ReactElement;
  products?: IProduct[];
}
const Search: FC<IProps> = memo(function (props) {
  const { children, products } = props;
  const router = useRouter();
  const { q } = router.query;
  return (
    <div className="search">
      <div className={classNames("wrapper")}>
        <GridView products={products}></GridView>
      </div>
    </div>
  );
});
export default Search;
Search.displayName = "Search"; // 方便以后调试用的

// ssr
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    return async (context) => {
      // 1.触发一个异步的action来发起网络请求, 拿到搜索建议并存到redex中
      await store.dispatch(fetchSearchSuggest());
      // 2.拿到 搜索页面的数据
      const { q } = context.query; // 拿到 url中查询字符串
      // const res = await getDetailPageInfo(id as string);
      const res = await getProductSearchData({
        limit: 60,
        offset: 0,
        key: q as string,
      });
      return {
        props: {
          products: res.products,
        },
      };
    };
  });
