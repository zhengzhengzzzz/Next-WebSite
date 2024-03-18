// 全局样式
import "normalize.css";
import "antd/dist/reset.css";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import wrapper from "@/store/index";
import Layout from "@/components/layout";
import type { AppProps } from "next/app";

export default function App({ Component, ...rest }: AppProps) {
  // Redux 接入的 App
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}
