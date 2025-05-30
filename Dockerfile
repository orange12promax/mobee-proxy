FROM oven/bun:latest

WORKDIR /app

# 设置环境变量配置镜像源
ENV NPM_CONFIG_REGISTRY=https://registry.npmmirror.com

# 复制 package.json 和 bun.lockb（如果存在）
COPY package.json bun.lockb* ./

# 安装依赖
RUN bun install

# 复制源代码
COPY . .

# 暴露端口
EXPOSE 8000

# 启动应用
CMD ["bun", "run", "index.ts"] 