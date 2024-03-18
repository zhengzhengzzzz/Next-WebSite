import hyRequest from "./index";
import type { IResultData } from "./index";

export interface ISearchSuggest {
  id: string;
  defaultKey: string;
  configKey: any[];
}

export interface IBanner {
  id: number;
  picStr?: string;
  backendPicStr?: string;
}
export interface ICategory {
  cid: number;
  picStr?: string;
  title?: string;
  tabIndex?: number;
  targetUrl?: string;
  count?: number;
  desc?: string;
  type?: number;
}
export interface IRecommend {
  id: number;
  picStr?: string;
  title?: string;
}
export interface IHomeInfo {
  banners?: IBanner[];
  categorys?: ICategory[];
  recommends?: IRecommend[];
  digitalData?: any;
}
export interface IProduct {
  id: number;
  type?: number;
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  originalCost?: number;
  couponLabelDesc?: string;
  coverUrl?: string;
}
export interface IHotProduct {
  id: number;
  products?: IProduct;
}
export interface IHotproductV2 {
  count?: number;
  hasMore?: boolean;
  hotProduct?: IHotProduct[];
}
export interface IAllProdcut {
  count?: number;
  allProduct?: IProduct[];
}
// 01-获取搜索建议的接口
export const getSearchSuggest = () => {
  return hyRequest.get<IResultData<ISearchSuggest>>("/searchSuggest/get");
};

// 02-获取首页的数据( 轮播图 / 分类 .... )
export const getHomeInfo = () => {
  return hyRequest.get<IResultData<IHomeInfo>>("/home/info");
};

// 03-编辑推荐的商品 hotproduct_v2
export const getHotproduct_v2 = () => {
  return hyRequest.get<IResultData<IHotproductV2>>("/hotproduct_v2/gets");
};

// 04-编辑推荐的商品 allProduct/gets
export const getAllProduct = () => {
  return hyRequest.get<IResultData<IAllProdcut>>("/allProduct/gets");
};
