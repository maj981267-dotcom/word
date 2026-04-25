# Next.js + Neon PostgreSQL 项目

这是一个使用 Next.js 14 和 Neon PostgreSQL 数据库的项目。

## 技术栈

- **Next.js 14** - React 框架
- **TypeScript** - 类型安全
- **Neon PostgreSQL** - Serverless 数据库
- **Drizzle ORM** - 类型安全的 ORM
- **Tailwind CSS** - 样式框架
- **Vercel** - 部署平台

## 开始使用

1. 安装依赖：
```bash
npm install
```

2. 配置环境变量：
复制 `.env.example` 到 `.env.local` 并填入你的数据库连接字符串。

3. 运行开发服务器：
```bash
npm run dev
```

4. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 数据库设置

1. 同步数据库表结构：
```bash
npx drizzle-kit push:pg
```

这会在 Neon 数据库中创建 `words` 表。

## 自动任务

项目配置了 Vercel Cron Job，每 5 分钟自动向 `words` 表插入一条数据。

- Cron 路由: `/api/cron`
- 执行频率: 每 5 分钟（`*/5 * * * *`）
- 查看数据: 访问首页或 `/api/words`

## 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 导入你的仓库
3. 在 Vercel 项目设置中添加环境变量 `DATABASE_URL`
4. 部署！

## 项目结构

```
├── app/              # Next.js App Router
├── lib/              # 工具函数和数据库配置
│   ├── db.ts        # 数据库连接
│   └── schema.ts    # 数据库表结构
├── drizzle/         # 数据库迁移文件
└── public/          # 静态资源
```
