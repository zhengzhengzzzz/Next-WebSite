import hyRequest from "./index";

export interface ISearchProductResult {
  code: number;
  more: boolean;
  products?: any[];
}

export interface ISearchParam {
  limit: number;
  offset: number;
  key: string;
}

// 获取搜索数据
export const getProductSearchData = (data: ISearchParam) => {
  return hyRequest.post<ISearchProductResult>(
    `/store/api/product/search`,
    data,
    {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  );
};
