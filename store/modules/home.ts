import { getSearchSuggest } from "@/service/home";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { ISearchSuggest } from "@/service/home";
// home 模块的state的类型
export interface IHomeInitialState {
  counter: number;
  navbar: ISearchSuggest;
}

const homeSlice = createSlice({
  name: "home",
  initialState: {
    counter: 10,
    navbar: {},
  } as IHomeInitialState,
  reducers: {
    increment(state, { type, payload }) {
      console.log("increment=>", type, payload); // increment=> home/increment 2
      state.counter += payload;
    },
  },
  extraReducers: (builder) => {
    // Hydrate的操作, 保证服务端端和客户端数据的一致性
    builder
      .addCase(HYDRATE, (state, action: any) => {
        // state -> initialState
        // action.payload -> rootState
        return {
          ...state,
          ...action.payload.home,
        };
      })
      .addCase(fetchSearchSuggest.fulfilled, (state, { payload }) => {
        state.navbar = payload;
      });
  },
});
// 异步的action
export const fetchSearchSuggest = createAsyncThunk(
  "fetchSearchSuggest",
  async () => {
    // 发起网络请求,拿到搜索建议的数据
    const res = await getSearchSuggest();
    return res.data;
  }
);

// 同步的action
export const { increment } = homeSlice.actions;
export default homeSlice.reducer;
