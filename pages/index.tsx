import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { fetchSearchSuggest, increment } from "@/store/modules/home";

import wrapper from "@/store/index";
import { Button } from "antd";
import TopSwiper from "@/components/top-swiper";
import {
  getAllProduct,
  getHomeInfo,
  getHotproduct_v2,
  IProduct,
} from "@/service/home";
import TabCategory from "@/components/tab-category";
import Recommend from "@/components/recommend";
import SectionTitle from "@/components/section-title";

import styles from "./index.module.scss";
import type { GetServerSideProps } from "next";
import type { FC } from "react";
import type { IAppDispatch, IAppRootState } from "@/store/index";
import type {
  IBanner,
  ICategory,
  IRecommend,
  IHotProduct,
} from "@/service/home";
import GridView from "@/components/grid-view";
import DigitalPanel from "@/components/digital-panel";

interface IProps {
  banners: IBanner[];
  categorys: ICategory[];
  recommends: IRecommend[];
  digitalData: any;
  hotProducts: IHotProduct[];
  allProducts: IProduct[];
}
const Home: FC<IProps> = (props) => {
  const {
    banners = [],
    categorys = [],
    recommends = [],
    digitalData = {},
    hotProducts = [],
    allProducts = [],
  } = props;

  // 1.从redux读取状态
  const { counter } = useSelector((rootState: IAppRootState) => {
    return {
      counter: rootState.home.counter,
    };
  });
  // 2.使用dispatch来触发action
  const dispatch: IAppDispatch = useDispatch();
  function addCounter() {
    // 触发 increment的action
    dispatch(increment(2));
  }
  return (
    <>
      <Head>
        <title>云音乐商城</title>
      </Head>
      <div className={styles.home}>
        <TopSwiper banners={banners}></TopSwiper>
        <TabCategory categorys={categorys}></TabCategory>
        <Recommend recommends={recommends}></Recommend>
        {/* 中间的内容->版心 */}
        <div className={classNames("wrapper", styles.content)}>
          <SectionTitle title="编辑推荐"></SectionTitle>
          <GridView products={hotProducts}></GridView>
          {/* 数据面板组件 */}
          <DigitalPanel itemData={digitalData}></DigitalPanel>
          <SectionTitle title="热门商品"></SectionTitle>
          <GridView products={allProducts}></GridView>
        </div>
      </div>
    </>
  );
};

export default Home;
Home.displayName = "Home";
// 每次访问首页的时候都会执行
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // 1.在这里发起网络请求拿到搜索建议的数据
//   const res = await getSearchSuggest();
//   console.log(res.data);
//   return {
//     props: {},
//   };
// };

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    return async (context) => {
      // 1.触发一个异步的action来发起网络请求, 拿到搜索建议并存到redex中
      await store.dispatch(fetchSearchSuggest());
      // 2.发起网络请求获取首页的数据( 轮播图 分类  推荐... )
      const res = await getHomeInfo();
      // 3.发起网络请求拿到首页 编辑推荐的商品
      const resHot = await getHotproduct_v2();
      // 4.发起网络请求拿到首页 热门的商品
      const resAll = await getAllProduct();

      return {
        props: {
          banners: res.data.banners || [],
          categorys: res.data.categorys || [],
          recommends: res.data.recommends || [],
          digitalData: res.data.digitalData || [],

          // 编辑推荐的商品
          hotProducts: resHot.data.hotProduct || [],
          // 热门的商品
          allProducts: resAll.data.allProduct || [],
        },
      };
    };
  });
