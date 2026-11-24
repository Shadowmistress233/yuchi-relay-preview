import {
  ArrowUpRight,
  Headphones,
  KeyRound,
  MessageSquareText,
  TerminalSquare,
} from "lucide-react";
import { SITE_CONFIG, assetUrl } from "../config/siteConfig";
import { FourPointStar } from "./StarLine";

interface SupportFooterSectionProps {
  onOpenContact: () => void;
}

const STEPS = [
  { icon: MessageSquareText, label: "加微信领测试 Key" },
  { icon: Headphones, label: "1:1 远程配好客户端" },
  { icon: TerminalSquare, label: "按量稳跑不交月租" },
];

export function SupportFooterSection({ onOpenContact }: SupportFooterSectionProps) {
  return (
    <footer
      id="support"
      className="bg-[#0C1029] pt-24 pb-10 text-white lg:pt-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breakout Banner */}
        <div className="relative rounded-3xl border border-[#2D3B7A] bg-[#12183E] px-6 py-8 sm:px-10 sm:py-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-7">
            <span className="chamfer-badge inline-block bg-[#E2BE70] px-3 py-1 font-mono text-xs font-bold text-[#14192E]">
              1:1 远程技术支持
            </span>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              想试试？微信找我看单价、拿接入地址
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {STEPS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 rounded-xl border border-[#2D3B7A] bg-[#192252] px-3.5 py-3"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-[#E2BE70]" />
                    <span className="text-xs font-bold text-white">{item.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenContact}
                data-testid="footer-contact-btn"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#E2BE70] px-6 py-3.5 text-sm font-bold text-[#14192E] transition-colors hover:bg-[#ecd08f]"
              >
                <KeyRound className="h-4 w-4" />
                微信拿报价与测试 Key
              </button>
              <a
                href={SITE_CONFIG.links.consoleUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#2D3B7A] bg-[#192252] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:border-[#E2BE70] hover:text-[#E2BE70]"
              >
                进入控制台
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={SITE_CONFIG.links.docsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-[#B8C2E0] hover:text-[#E2BE70]"
              >
                接入文档
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Breakout Lyra Support Officer (Protruding above the top border on desktop) */}
          <div className="relative mt-8 flex justify-center lg:col-span-5 lg:mt-0 lg:self-end">
            <img
              src={assetUrl("lyra-guide-cutout.webp")}
              alt="鱼池中转 1:1 远程支持看板娘"
              className="h-72 w-auto object-contain object-bottom drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)] sm:h-80 lg:-mt-28 lg:-mb-10 lg:h-[380px]"
            />
          </div>
        </div>

        {/* Bottom Credit */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-[#2D3B7A] pt-6 text-xs text-[#9EA9CE] sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <FourPointStar className="h-3.5 w-3.5 text-[#E2BE70]" />
            <span className="font-bold text-white">{SITE_CONFIG.brand.name}</span>
            <span>/</span>
            <span className="font-mono">{SITE_CONFIG.brand.englishName}</span>
          </div>
          <span>{SITE_CONFIG.brand.characterCredit}</span>
        </div>
      </div>
    </footer>
  );
}
