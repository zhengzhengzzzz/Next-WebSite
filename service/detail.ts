import hyRequest from "./index";
import type { IResultData } from "./index";
import type { IProduct } from "./home";

export interface IDetailPageInfo {
  id?: number;
  webPic?: string;
  products?: IProduct[];
}
// 01-获取详细数据的接口
export const getDetailPageInfo = (id: string) => {
  return hyRequest.get<IResultData<IDetailPageInfo>>(
    "/special/getdetail?specialTopicId=" + id
  );
};
