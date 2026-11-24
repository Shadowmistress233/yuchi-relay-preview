import {
  ArrowLeftRight,
  ArrowUpRight,
  Calculator,
  Code2,
  Cpu,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Wifi,
} from "lucide-react";
import { useState } from "react";
import { SITE_CONFIG } from "../config/siteConfig";

const CLIENT_ICONS = {
  codex: Terminal,
  opencode: Code2,
  cherry: MessageSquare,
  sdk: Cpu,
} as const;

export function AdvantageBentoSection() {
  const [splitPercent, setSplitPercent] = useState(66);
  const [activeClientId, setActiveClientId] = useState(SITE_CONFIG.clientNodes[0].id);
  const [monthlyUsdUsage, setMonthlyUsdUsage] = useState(100);

  const activeClient =
    SITE_CONFIG.clientNodes.find((c) => c.id === activeClientId) ??
    SITE_CONFIG.clientNodes[0];

  const fx = SITE_CONFIG.brand.exchangeRateRmb;
  const officialRmb = Math.round(monthlyUsdUsage * fx);
  const yuchiRmb = Math.max(
    1,
    Math.round(monthlyUsdUsage * SITE_CONFIG.brand.rateMultiplier * fx)
  );
  const savedVsOfficial = Math.max(0, officialRmb - yuchiRmb);

  return (
    <section
      id="advantages"
      className="border-b border-[#DCE2F0] bg-[#F4F6FB] py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-black tracking-tight text-[#14192E] sm:text-4xl">
            为什么开发者都在切到鱼池
          </h2>
          <span className="font-mono text-xs font-bold text-[#4A50C8]">
            零废话交互透视 · 四大核心壁垒
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Card 1: Interactive Anti-Downgrade Split Comparator (Zero code) */}
          <div className="rounded-2xl border border-[#DCE2F0] bg-white p-6 lg:col-span-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-lg font-black text-[#14192E]">
                <ShieldCheck className="h-5 w-5 text-[#4A50C8]" />
                <span>防降智透视窗</span>
              </div>
              <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#4A5370]">
                <ArrowLeftRight className="h-3.5 w-3.5 text-[#4A50C8]" />
                拖动对比
              </span>
            </div>

            {/* Visual Split Stage */}
            <div className="relative mt-4 h-52 overflow-hidden rounded-xl border border-[#DCE2F0] bg-[#F4F6FB]">
              {/* Left Bad Channel Layer */}
              <div className="absolute inset-0 flex flex-col justify-between bg-[#ECEFF6] p-4 text-[#4A5370] sm:p-5">
                <div className="max-w-[55%] space-y-2">
                  <div className="flex items-center gap-1.5 text-sm font-bold text-amber-700">
                    <ShieldAlert className="h-4 w-4 shrink-0" />
                    <span>劣质掺水站</span>
                  </div>
                  <div className="space-y-1 text-xs font-semibold sm:text-sm">
                    <div>高峰偷换 mini 模型</div>
                    <div>吞推理链 · 协议报错</div>
                  </div>
                </div>
                <div className="font-mono text-xs text-amber-800">
                  REASONING: DROPPED
                </div>
              </div>

              {/* Right Good Channel Clipped Layer */}
              <div
                data-testid="anti-downgrade-overlay"
                className="absolute inset-0 flex flex-col justify-between bg-[#12183E] p-4 text-white sm:p-5"
                style={{ clipPath: `inset(0 0 0 ${100 - splitPercent}%)` }}
              >
                <div className="ml-auto max-w-[55%] space-y-2 text-right">
                  <div className="flex items-center justify-end gap-1.5 text-sm font-bold text-[#E2BE70]">
                    <span>鱼池纯血直通</span>
                    <ShieldCheck className="h-4 w-4 shrink-0" />
                  </div>
                  <div className="space-y-1 text-xs font-semibold sm:text-sm">
                    <div>100% 原生池一字不改</div>
                    <div>完整思维链 · 缓存计费</div>
                  </div>
                </div>
                <div className="text-right font-mono text-xs text-[#E2BE70]">
                  RESPONSES_API: 100% PASS
                </div>
              </div>

              {/* Divider Line */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 w-0.5 bg-[#E2BE70]"
                style={{ left: `${100 - splitPercent}%` }}
              />
            </div>

            <input
              type="range"
              min={15}
              max={85}
              value={splitPercent}
              onChange={(e) => setSplitPercent(Number(e.target.value))}
              aria-label="防降智对比拉杆"
              data-testid="downgrade-slider"
              className="mt-4 w-full cursor-pointer accent-[#12183E]"
            />
          </div>

          {/* Card 2: CC Switch Visual Topology (Zero code blocks!) */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#DCE2F0] bg-white p-6 lg:col-span-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-lg font-black text-[#14192E]">
                <Terminal className="h-5 w-5 text-[#4A50C8]" />
                <span>配合 CC Switch 秒切主流 Agent</span>
              </div>
              <a
                href={SITE_CONFIG.links.docsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#4A50C8] hover:underline"
              >
                配置文档
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Graphical Hub -> Client Nodes */}
            <div className="mt-4 grid grid-cols-1 items-center gap-4 rounded-xl border border-[#DCE2F0] bg-[#F4F6FB] p-4 sm:grid-cols-12">
              {/* Hub */}
              <div className="flex flex-col items-center justify-center rounded-xl bg-[#12183E] p-4 text-center text-white sm:col-span-4">
                <span className="font-display text-2xl font-bold text-[#E2BE70]">
                  CC Switch
                </span>
                <span className="mt-1 text-xs text-[#CBD3E6]">鱼池 0.17x 节点</span>
              </div>

              {/* 4 Selectable Client Nodes */}
              <div className="grid grid-cols-2 gap-2.5 sm:col-span-8">
                {SITE_CONFIG.clientNodes.map((node) => {
                  const Icon =
                    CLIENT_ICONS[node.id as keyof typeof CLIENT_ICONS] ?? Cpu;
                  const active = node.id === activeClient.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setActiveClientId(node.id)}
                      data-testid={`client-node-${node.id}`}
                      className={`flex cursor-pointer items-center gap-2.5 rounded-xl border p-3 text-left transition-colors ${
                        active
                          ? "border-[#12183E] bg-[#12183E] text-[#E2BE70]"
                          : "border-[#DCE2F0] bg-white text-[#14192E] hover:border-[#4A50C8]"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <div className="min-w-0">
                        <div className="truncate text-xs font-bold">{node.name}</div>
                        <div
                          className={`text-xs ${
                            active ? "text-[#CBD3E6]" : "text-[#4A5370]"
                          }`}
                        >
                          {node.tag}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Single-line punchline */}
            <div
              data-testid="client-punchline"
              className="mt-4 rounded-xl border border-[#DCE2F0] bg-[#F4F6FB] px-4 py-3 text-sm font-semibold text-[#14192E]"
            >
              {activeClient.name}：{activeClient.punchline}
            </div>
          </div>

          {/* Card 3: 0.17x Big-Number Pricing Calculator */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#2D3B7A] bg-[#12183E] p-6 text-white lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-lg font-black">
                <Calculator className="h-5 w-5 text-[#E2BE70]" />
                <span>0.17x 按量计费算账台</span>
              </div>
              <span
                data-testid="usage-usd-value"
                className="font-display text-lg font-bold text-[#E2BE70]"
              >
                官方等值 ${monthlyUsdUsage}/月
              </span>
            </div>

            <div className="my-5 grid grid-cols-1 items-center gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-[#2D3B7A] bg-[#192252] p-4">
                <div className="text-xs text-[#9EA9CE]">鱼池 0.17x 实付</div>
                <div
                  data-testid="yuchi-rmb-value"
                  className="mt-1 font-display text-4xl font-bold text-[#E2BE70]"
                >
                  ¥{yuchiRmb}
                </div>
              </div>
              <div className="rounded-xl border border-[#2D3B7A] bg-[#0C1029] p-4">
                <div className="text-xs text-[#9EA9CE]">官方等值直充</div>
                <div className="mt-1 font-display text-3xl font-bold text-[#9EA9CE] line-through">
                  ¥{officialRmb}
                </div>
              </div>
              <div className="rounded-xl border border-[#E2BE70]/60 bg-[#192252] p-4">
                <div className="text-xs text-[#E2BE70]">本月直接省下</div>
                <div
                  data-testid="saved-rmb-value"
                  className="mt-1 font-display text-4xl font-bold text-white"
                >
                  ¥{savedVsOfficial}
                </div>
              </div>
            </div>

            <div>
              <input
                type="range"
                min={20}
                max={300}
                step={10}
                value={monthlyUsdUsage}
                onChange={(e) => setMonthlyUsdUsage(Number(e.target.value))}
                aria-label="月均官方等值额度滑块"
                data-testid="pricing-slider"
                className="w-full cursor-pointer accent-[#E2BE70]"
              />
              <div className="mt-1.5 flex justify-between font-mono text-xs text-[#9EA9CE]">
                <span>$20 轻量</span>
                <span>$150 常规编码</span>
                <span>$300 重度 Agent</span>
              </div>
            </div>
          </div>

          {/* Card 4: Domestic BGP Direct Anchor */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#DCE2F0] bg-white p-6 lg:col-span-4">
            <div className="flex items-center justify-between">
              <span className="chamfer-badge bg-[#E2BE70] px-2.5 py-0.5 font-mono text-xs font-bold text-[#14192E]">
                CN DIRECT
              </span>
              <Wifi className="h-5 w-5 text-[#4A50C8]" />
            </div>
            <div className="my-5">
              <div className="font-display text-5xl font-bold text-[#14192E]">
                ~42ms
              </div>
              <div className="mt-2 text-lg font-black text-[#14192E]">
                国内 BGP 直连免梯子
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#4A5370]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              本地终端 · 校园网 · 办公网开箱即连
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
