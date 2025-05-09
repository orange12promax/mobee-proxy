FROM oven/bun:1 as builder

WORKDIR /app

# 复制 package.json 和 bun.lockb（如果存在）
COPY package.json bun.lockb* ./

# 安装依赖
RUN bun install

# 复制源代码
COPY . .

# 构建阶段（如果需要的话）
# RUN bun run build

# 生产环境镜像
FROM oven/bun:1-slim

WORKDIR /app

# 从构建阶段复制必要文件
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lockb* ./
COPY --from=builder /app/index.ts ./
COPY --from=builder /app/node_modules ./node_modules

# 暴露端口
EXPOSE 8000

# 启动应用
CMD ["bun", "run", "index.ts"] 