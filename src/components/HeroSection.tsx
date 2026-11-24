import {
  ArrowUpRight,
  Headphones,
  MessageSquareText,
  Percent,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SITE_CONFIG, assetUrl } from "../config/siteConfig";
import { FourPointStar, StarLine } from "./StarLine";

interface HeroSectionProps {
  onOpenContact: () => void;
  onSelectArenaStage: (stage: "sol" | "astra") => void;
}

export function HeroSection({ onOpenContact, onSelectArenaStage }: HeroSectionProps) {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const ringLayerRef = useRef<HTMLDivElement>(null);
  const lyraLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const rect = stage.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      if (ringLayerRef.current) {
        ringLayerRef.current.style.transform = `translate3d(${nx * -16}px, ${ny * -12}px, 0)`;
      }
      if (lyraLayerRef.current) {
        lyraLayerRef.current.style.transform = `translate3d(${nx * 18}px, ${ny * 12}px, 0)`;
      }
    };

    const handleLeave = () => {
      if (ringLayerRef.current) ringLayerRef.current.style.transform = "translate3d(0,0,0)";
      if (lyraLayerRef.current) lyraLayerRef.current.style.transform = "translate3d(0,0,0)";
    };

    stage.addEventListener("mousemove", handleMove);
    stage.addEventListener("mouseleave", handleLeave);
    return () => {
      stage.removeEventListener("mousemove", handleMove);
      stage.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section
      id="top"
      ref={stageRef}
      className="relative overflow-hidden border-b border-[#DCE2F0] bg-[#F4F6FB]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage: "radial-gradient(#CBD3E6 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pt-8 pb-8 sm:px-6 lg:grid-cols-12 lg:gap-4 lg:px-8 lg:pt-12 lg:pb-10">
        {/* Left: Crisp Poster Anchor */}
        <div className="relative z-20 lg:col-span-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-xs font-bold tracking-widest text-[#4A50C8]">
              // {SITE_CONFIG.brand.serviceTag}
            </span>
            <span className="chamfer-badge bg-[#E2BE70] px-3 py-1 text-xs font-bold text-[#14192E]">
              {SITE_CONFIG.brand.regionTag}
            </span>
          </div>

          <h1 className="mt-5 text-4xl leading-none font-black tracking-tight text-[#14192E] sm:text-5xl lg:text-[56px]">
            AI 模型中转站
          </h1>

          <StarLine className="my-5 max-w-sm" />

          <div className="flex items-center gap-4">
            <span className="font-display text-5xl leading-none font-bold tracking-tight text-[#14192E] sm:text-6xl">
              1:1
            </span>
            <div>
              <div className="text-xl font-black text-[#14192E] sm:text-2xl">
                远程技术支持
              </div>
              <div className="mt-0.5 text-xs font-semibold text-[#4A50C8]">
                免月租 · 按量计费
              </div>
            </div>
          </div>

          <StarLine className="my-5 max-w-sm" />

          <div className="brand-gold-stroke text-5xl leading-tight font-black tracking-tight sm:text-6xl">
            {SITE_CONFIG.brand.name}
          </div>

          {/* 3 High-Impact Stat Badges (Replacing verbose paragraph) */}
          <div className="mt-6 grid max-w-md grid-cols-3 gap-2.5">
            <div className="rounded-xl border border-[#DCE2F0] bg-white p-3">
              <Percent className="h-4 w-4 text-[#4A50C8]" />
              <div className="mt-1.5 font-display text-xl font-bold text-[#14192E]">
                0.17x
              </div>
              <div className="text-xs text-[#4A5370]">按量倍率</div>
            </div>
            <div className="rounded-xl border border-[#DCE2F0] bg-white p-3">
              <ShieldCheck className="h-4 w-4 text-[#4A50C8]" />
              <div className="mt-1.5 font-display text-xl font-bold text-[#14192E]">
                100%
              </div>
              <div className="text-xs text-[#4A5370]">满血防降智</div>
            </div>
            <div className="rounded-xl border border-[#DCE2F0] bg-white p-3">
              <Headphones className="h-4 w-4 text-[#4A50C8]" />
              <div className="mt-1.5 font-display text-xl font-bold text-[#14192E]">
                1:1
              </div>
              <div className="text-xs text-[#4A5370]">包配上线</div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#12183E] px-6 py-3.5 text-sm font-bold text-[#E2BE70] transition-colors hover:bg-[#192252]"
            >
              <MessageSquareText className="h-4 w-4" />
              微信拿报价与接入地址
            </button>
            <a
              href={SITE_CONFIG.links.consoleUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#CBD3E6] bg-white px-5 py-3.5 text-sm font-bold text-[#14192E] transition-colors hover:border-[#4A50C8] hover:text-[#4A50C8]"
            >
              进入控制台
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Right: Breakout Lyra Astrolabe Stage */}
        <div className="relative lg:col-span-7">
          <div className="relative mx-auto h-[460px] max-w-2xl sm:h-[540px] lg:h-[600px]">
            {/* Arched Night-Sky Backdrop */}
            <div className="absolute inset-x-0 top-6 bottom-0 overflow-hidden rounded-3xl border border-[#2D3B7A] bg-[#12183E] lg:left-6 lg:rounded-l-[300px] lg:rounded-r-3xl lg:border-2 lg:border-[#E2BE70]/75">
              <div
                ref={ringLayerRef}
                className="pointer-events-none absolute inset-0 transition-transform duration-200 ease-out"
              >
                <svg viewBox="0 0 640 600" className="h-full w-full" aria-hidden="true">
                  <defs>
                    <radialGradient id="heroSkyGrad" cx="55%" cy="45%" r="68%">
                      <stop offset="0%" stopColor="#233075" />
                      <stop offset="68%" stopColor="#12183E" />
                      <stop offset="100%" stopColor="#0C1029" />
                    </radialGradient>
                  </defs>
                  <rect width="640" height="600" fill="url(#heroSkyGrad)" />

                  <g
                    className="animate-astrolabe-slow"
                    style={{ transformOrigin: "330px 300px" }}
                  >
                    <circle
                      cx="330"
                      cy="300"
                      r="268"
                      fill="none"
                      stroke="#E2BE70"
                      strokeOpacity="0.48"
                      strokeWidth="1.2"
                      strokeDasharray="6 6"
                    />
                    <circle
                      cx="330"
                      cy="300"
                      r="248"
                      fill="none"
                      stroke="#2D3B7A"
                      strokeWidth="1"
                    />
                  </g>

                  <g
                    className="animate-astrolabe-reverse"
                    style={{ transformOrigin: "330px 300px" }}
                  >
                    <circle
                      cx="330"
                      cy="300"
                      r="192"
                      fill="none"
                      stroke="#E2BE70"
                      strokeOpacity="0.34"
                      strokeWidth="1"
                      strokeDasharray="2 10"
                    />
                    <line
                      x1="330"
                      y1="30"
                      x2="330"
                      y2="570"
                      stroke="#2D3B7A"
                      strokeOpacity="0.55"
                    />
                    <line
                      x1="60"
                      y1="300"
                      x2="600"
                      y2="300"
                      stroke="#2D3B7A"
                      strokeOpacity="0.55"
                    />
                  </g>

                  {/* Lyra Constellation */}
                  <g stroke="#E2BE70" strokeOpacity="0.6" strokeWidth="1.2">
                    <line x1="480" y1="88" x2="520" y2="122" />
                    <line x1="520" y1="122" x2="562" y2="106" />
                    <line x1="520" y1="122" x2="508" y2="174" />
                    <line x1="508" y1="174" x2="548" y2="194" />
                    <line x1="548" y1="194" x2="562" y2="140" />
                    <line x1="520" y1="122" x2="562" y2="140" />
                  </g>
                  <g fill="#E2BE70">
                    <circle cx="480" cy="88" r="3.5" />
                    <circle cx="520" cy="122" r="2.5" />
                    <circle cx="562" cy="106" r="2" />
                    <circle cx="508" cy="174" r="2.5" />
                    <circle cx="548" cy="194" r="2" />
                    <circle cx="562" cy="140" r="2" />
                  </g>
                  <text
                    x="490"
                    y="218"
                    fill="#9EA9CE"
                    fontSize="13"
                    fontFamily="JetBrains Mono, monospace"
                    letterSpacing="2"
                  >
                    LYRA / α
                  </text>
                </svg>
              </div>
            </div>

            {/* Breakout Lyra Character (Horns subtly extend above the arch top edge) */}
            <div
              ref={lyraLayerRef}
              className="pointer-events-none relative z-10 flex h-full items-end justify-center transition-transform duration-200 ease-out"
            >
              <img
                src={assetUrl("lyra-hero-cutout.webp")}
                alt="鱼池中转看板娘 GPT 龙娘 Lyra"
                className="h-[102%] w-auto max-w-none object-contain object-bottom drop-shadow-[0_14px_32px_rgba(12,16,41,0.5)] select-none"
              />
            </div>

            {/* Compact Interactive Speech Pill */}
            <button
              type="button"
              onClick={() => setQuoteIdx((p) => (p + 1) % SITE_CONFIG.lyraQuotes.length)}
              data-testid="lyra-quote-btn"
              className="absolute right-4 bottom-4 left-4 z-20 cursor-pointer rounded-xl border border-[#E2BE70]/70 bg-[#0C1029]/92 px-4 py-3 text-left backdrop-blur-md transition-colors hover:border-[#E2BE70] sm:right-auto sm:left-10 sm:max-w-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#E2BE70]">
                  <Sparkles className="h-3.5 w-3.5" />
                  LYRA · 看板娘
                </span>
                <span className="font-mono text-xs text-[#9EA9CE]">
                  {quoteIdx + 1}/{SITE_CONFIG.lyraQuotes.length}
                </span>
              </div>
              <p
                data-testid="lyra-quote-text"
                className="mt-1 text-xs leading-relaxed text-[#E6EBF8]"
              >
                {SITE_CONFIG.lyraQuotes[quoteIdx]}
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Dark Anchor Strip */}
      <div className="border-t border-[#2D3B7A] bg-[#12183E] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3.5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 md:gap-6">
            <a
              href="#arena"
              onClick={() => onSelectArenaStage("sol")}
              className="flex items-center gap-2.5 text-sm font-bold text-white transition-colors hover:text-[#E2BE70]"
            >
              <span className="chamfer-badge bg-[#E2BE70] px-2 py-0.5 font-mono text-xs font-bold text-[#14192E]">
                模型 01
              </span>
              <span>GPT-6.2 Sol</span>
            </a>
            <a
              href="#arena"
              onClick={() => onSelectArenaStage("astra")}
              className="flex items-center gap-2.5 text-sm font-bold text-white transition-colors hover:text-[#E2BE70]"
            >
              <span className="chamfer-badge bg-[#E2BE70] px-2 py-0.5 font-mono text-xs font-bold text-[#14192E]">
                模型 02
              </span>
              <span>GPT-6.2 Astra</span>
            </a>
            <a
              href="#gallery"
              className="flex items-center gap-2.5 text-sm font-bold text-white transition-colors hover:text-[#E2BE70]"
            >
              <span className="chamfer-badge bg-[#E2BE70] px-2 py-0.5 font-mono text-xs font-bold text-[#14192E]">
                图像 03
              </span>
              <span>GPT Image 2.6</span>
            </a>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#9EA9CE]">
            <FourPointStar className="h-3 w-3 text-[#E2BE70]" />
            <span>{SITE_CONFIG.brand.characterCredit}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
