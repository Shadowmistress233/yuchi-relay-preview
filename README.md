# 鱼池中转 / RELAY STATION — 官网首页

- **在线预览**：https://shadowmistress233.github.io/yuchi-relay-preview/
- **技术栈**：Vite + React + TypeScript + Tailwind CSS v4 + GSAP ScrollTrigger + Lucide Icons

## 本地运行与构建

```bash
npm install
npm run dev     # 本地预览
npm run build   # 生成纯静态产物到 dist/
```

## 业务配置替换

接入真实控制台与微信二维码时，只需修改 `src/config/siteConfig.ts`：
- `links.consoleUrl` / `links.docsUrl` / `links.apiBaseUrl`
- `links.wechatId` / `links.wechatQrImage`
- `brand.rateMultiplier`

> 龙娘原设参考：ZipZipPipe
