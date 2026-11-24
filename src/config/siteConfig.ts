export const assetUrl = (filename: string) =>
  `${import.meta.env.BASE_URL}assets/${filename}`;

export interface GalleryItem {
  id: string;
  title: string;
  tag: string;
  resolution: string;
  image: string;
}

export interface ClientNode {
  id: string;
  name: string;
  tag: string;
  punchline: string;
}

export const SITE_CONFIG = {
  brand: {
    name: "鱼池中转",
    englishName: "RELAY STATION",
    serviceTag: "SERVICE PROFILE",
    regionTag: "国内网络直连",
    subTag: "独立中转服务",
    rateMultiplier: 0.17,
    rateLabel: "0.17x 官方倍率",
    exchangeRateRmb: 7.25,
    officialPlusUsd: 20,
    officialProUsd: 200,
    characterCredit: "龙娘原设参考：ZipZipPipe",
  },
  links: {
    // 同学接手时替换为真实线上地址
    consoleUrl: "https://console.yuchi-relay.example/login",
    docsUrl: "https://docs.yuchi-relay.example",
    apiBaseUrl: "https://api.yuchi-relay.example/v1",
    wechatId: "YuchiRelay_017",
    wechatQrImage: "",
  },
  lyraQuotes: [
    "0.17 倍率直连满血 Astra，免去每月 $200 官方门卫费。",
    "原生 Responses 协议全字段透传，绝不吞思维链降智。",
    "配合 CC Switch 一键切主流 Agent，新手也能 1:1 远程包配好。",
    "用多少算多少，余额不过期；Image 2.6 原生透明出图即开即用。",
  ],
  gallery: [
    {
      id: "sanctuary",
      title: "云海星轨观测圣殿",
      tag: "细节放大 · 2.5x",
      resolution: "1536 × 1024",
      image: assetUrl("showcase-starlight-sanctuary.webp"),
    },
    {
      id: "relic",
      title: "天琴星盘圣物",
      tag: "原生 Alpha 透明",
      resolution: "RGBA WebP",
      image: assetUrl("showcase-astrolabe-relic.webp"),
    },
    {
      id: "desk",
      title: "极客天文书房与白龙幼崽",
      tag: "空间质感直出",
      resolution: "1024 × 1024",
      image: assetUrl("showcase-observatory-desk.webp"),
    },
  ] as GalleryItem[],
  clientNodes: [
    {
      id: "codex",
      name: "Codex CLI / App",
      tag: "主力推荐",
      punchline: "保留官方登录态的同时，一键写入中转节点。",
    },
    {
      id: "opencode",
      name: "OpenCode",
      tag: "终端 Agent",
      punchline: "多款 CLI Agent 档位毫秒切换，直连不断流。",
    },
    {
      id: "cherry",
      name: "Cherry Studio",
      tag: "桌面对话",
      punchline: "填好接入地址直接对话与调用 Image 2.6 生图。",
    },
    {
      id: "sdk",
      name: "Roo Code / SDK",
      tag: "工程集成",
      punchline: "兼容全部 OpenAI 协议插件，零代码改造迁移。",
    },
  ] as ClientNode[],
};
