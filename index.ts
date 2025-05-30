import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import type { Options } from "http-proxy-middleware";
import { HttpProxyAgent } from "http-proxy-agent";

interface MiddlewareConfig extends Options {
  agent?: HttpProxyAgent<string>;
}

// 从环境变量中获取目标地址，如果未设置则使用默认值 https://www.baidu.com
const targetUrl = process.env.TARGET_URL || "https://www.baidu.com";
const middlewareConfig: MiddlewareConfig = {
  target: targetUrl,
  changeOrigin: true,
};
// 从环境变量中获取代理地址
const proxyUrl = process.env.PROXY_URL;
if (proxyUrl) {
  middlewareConfig.agent = new HttpProxyAgent(proxyUrl);
}

const app = express();

app.use("/", createProxyMiddleware(middlewareConfig));

app.listen(8000);
