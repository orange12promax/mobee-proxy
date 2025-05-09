import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { HttpProxyAgent } from "http-proxy-agent";
const app = express();

app.use('/', createProxyMiddleware({
    target: 'https://github.githubassets.com',
    changeOrigin: true,
    agent: new HttpProxyAgent('http://127.0.0.1:7897')
}));

app.listen(8000);
