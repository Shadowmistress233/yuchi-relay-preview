import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BrainCircuit,
  CheckCircle2,
  Coins,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { assetUrl } from "../config/siteConfig";

gsap.registerPlugin(ScrollTrigger);

interface ModelArenaSectionProps {
  requestedStage?: { stage: "sol" | "astra"; nonce: number } | null;
}

export function ModelArenaSection({ requestedStage }: ModelArenaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const solImgRef = useRef<HTMLImageElement>(null);
  const astraLayerRef = useRef<HTMLDivElement>(null);
  const astraImgRef = useRef<HTMLImageElement>(null);
  const astraContentRef = useRef<HTMLDivElement>(null);
  const ringRotateRef = useRef<SVGSVGElement>(null);
  const splitLayerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const [activeCap, setActiveCap] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=2000",
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => {
              if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${self.progress})`;
              }
              if (self.progress < 0.36) setActiveCap(0);
              else if (self.progress < 0.72) setActiveCap(1);
              else setActiveCap(2);
            },
          },
        });

        triggerRef.current = tl.scrollTrigger ?? null;

        // Act 1 -> Act 2: Slow Sol push + continuous circular reveal of Astra
        tl.to(solImgRef.current, { scale: 1.08, duration: 0.45 }, 0)
          .fromTo(
            astraLayerRef.current,
            { clipPath: "circle(0% at 86% 52%)" },
            { clipPath: "circle(145% at 55% 50%)", duration: 0.42, ease: "power1.inOut" },
            0.22
          )
          .fromTo(
            astraImgRef.current,
            { scale: 1.12 },
            { scale: 1.02, duration: 0.5 },
            0.22
          )
          .fromTo(
            astraContentRef.current,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.2 },
            0.38
          )
          .to(ringRotateRef.current, { rotation: 110, duration: 1 }, 0)
          // Act 3: Dual-star split comparison overlay
          .fromTo(
            splitLayerRef.current,
            { opacity: 0, y: 30, pointerEvents: "none" },
            { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.22 },
            0.74
          );
      });
    }, el);

    return () => {
      triggerRef.current = null;
      ctx.revert();
    };
  }, []);

  const scrollToProgress = (targetProgress: number) => {
    const st = triggerRef.current;
    if (!st) return;
    const y = st.start + (st.end - st.start) * targetProgress;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    if (!requestedStage) return;
    const p = requestedStage.stage === "sol" ? 0.05 : 0.54;
    const timer = setTimeout(() => scrollToProgress(p), 80);
    return () => clearTimeout(timer);
  }, [requestedStage]);

  return (
    <section
      id="arena"
      ref={sectionRef}
      className="relative border-b border-[#2D3B7A] bg-[#0C1029] text-white"
    >
      {/* Desktop: Full-Viewport Continuous GSAP Scrub Theater */}
      <div className="hidden h-screen w-full p-4 lg:block xl:p-6">
        <div className="relative h-full w-full overflow-hidden rounded-3xl border border-[#2D3B7A] bg-[#12183E]">
          {/* LAYER 1: GPT-6.2 Sol (Dawn Solar Engine) */}
          <div className="absolute inset-0">
            <img
              ref={solImgRef}
              src={assetUrl("sol-dawn-engine.webp")}
              alt="GPT-6.2 Sol 极速主力太阳星盘引擎"
              className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C1029]/92 via-[#0C1029]/60 to-transparent" />

            <div className="relative z-10 flex h-full max-w-2xl flex-col justify-center px-12 xl:px-16">
              <div className="font-display text-7xl leading-none font-bold text-[#E2BE70]/25">
                01
              </div>
              <div className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-[#E2BE70]/50 bg-[#0C1029]/75 px-3 py-1 font-mono text-xs font-semibold text-[#E2BE70] backdrop-blur-sm">
                <Zap className="h-3.5 w-3.5" />
                80% 日常编码主力
              </div>
              <h2 className="mt-4 text-5xl font-black tracking-tight text-white">
                GPT-6.2 Sol
              </h2>
              <p className="mt-2 text-lg font-medium text-[#CBD3E6]">
                极速响应、极低单价的日常开发全能发动机
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-[#0C1029]/80 px-4 py-2.5 text-sm font-semibold backdrop-blur-md">
                  <Zap className="h-4 w-4 text-[#E2BE70]" />
                  <span>~0.4s 极速首字</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-[#0C1029]/80 px-4 py-2.5 text-sm font-semibold backdrop-blur-md">
                  <Coins className="h-4 w-4 text-[#E2BE70]" />
                  <span className="font-display">¥0.03 / 轮</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-[#0C1029]/80 px-4 py-2.5 text-sm font-semibold backdrop-blur-md">
                  <CheckCircle2 className="h-4 w-4 text-[#E2BE70]" />
                  <span>Codex CLI 首选</span>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 2: GPT-6.2 Astra (Continuous Clip-Path Circular Reveal) */}
          <div
            ref={astraLayerRef}
            data-testid="arena-astra-layer"
            className="absolute inset-0 z-20 will-change-[clip-path]"
            style={{ clipPath: "circle(0% at 86% 52%)" }}
          >
            <img
              ref={astraImgRef}
              src={assetUrl("astra-cosmos-crown.webp")}
              alt="GPT-6.2 Astra 深度推理天琴星冕"
              className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C1029]/94 via-[#12183E]/65 to-transparent" />

            {/* Subtle rotating astrolabe ring */}
            <svg
              ref={ringRotateRef}
              viewBox="0 0 400 400"
              aria-hidden="true"
              className="pointer-events-none absolute right-8 top-1/2 h-[440px] w-[440px] -translate-y-1/2 opacity-35"
            >
              <circle
                cx="200"
                cy="200"
                r="180"
                fill="none"
                stroke="#E2BE70"
                strokeWidth="1"
                strokeDasharray="8 8"
              />
              <circle
                cx="200"
                cy="200"
                r="140"
                fill="none"
                stroke="#8B6CE8"
                strokeWidth="1"
              />
            </svg>

            <div
              ref={astraContentRef}
              className="relative z-10 flex h-full max-w-2xl flex-col justify-center px-12 xl:px-16"
            >
              <div className="font-display text-7xl leading-none font-bold text-[#E2BE70]/30">
                02
              </div>
              <div className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-[#E2BE70]/60 bg-[#0C1029]/80 px-3 py-1 font-mono text-xs font-semibold text-[#E2BE70] backdrop-blur-sm">
                <BrainCircuit className="h-3.5 w-3.5" />
                前沿旗舰 · 深度推理
              </div>
              <h2 className="mt-4 text-5xl font-black tracking-tight text-white">
                GPT-6.2 Astra
              </h2>
              <p className="mt-2 text-lg font-medium text-[#CBD3E6]">
                完整保留高阶思维链，硬核架构重构一击必杀
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-[#E2BE70]/30 bg-[#0C1029]/85 px-4 py-2.5 text-sm font-semibold backdrop-blur-md">
                  <BrainCircuit className="h-4 w-4 text-[#E2BE70]" />
                  <span>满血 High 推理链</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-[#E2BE70]/30 bg-[#0C1029]/85 px-4 py-2.5 text-sm font-semibold backdrop-blur-md">
                  <Layers className="h-4 w-4 text-[#E2BE70]" />
                  <span>大型跨仓工程</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-[#E2BE70]/30 bg-[#0C1029]/85 px-4 py-2.5 text-sm font-semibold backdrop-blur-md">
                  <Sparkles className="h-4 w-4 text-[#E2BE70]" />
                  <span>免 $200 Pro 订阅</span>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 3: Dual-Star Split Finale */}
          <div
            ref={splitLayerRef}
            data-testid="arena-split-layer"
            className="absolute inset-0 z-30 grid grid-cols-2 bg-[#0C1029]/95 opacity-0 backdrop-blur-md"
          >
            {/* Left Sol */}
            <div className="relative flex flex-col justify-between overflow-hidden border-r border-[#2D3B7A] p-12 xl:p-16">
              <img
                src={assetUrl("sol-dawn-engine.webp")}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-22"
              />
              <div className="relative z-10">
                <span className="chamfer-badge bg-[#E2BE70] px-3 py-1 font-mono text-xs font-bold text-[#14192E]">
                  80% 日常主力
                </span>
                <h3 className="mt-5 text-4xl font-black text-white">GPT-6.2 Sol</h3>
                <p className="mt-2 text-base text-[#CBD3E6]">
                  高频代码迭代、单测、Agent 跑图
                </p>
              </div>
              <div className="relative z-10 flex items-baseline gap-3">
                <span className="font-display text-6xl font-bold text-[#E2BE70]">
                  0.17x
                </span>
                <span className="text-sm text-[#B8C2E0]">分币级按量实扣</span>
              </div>
            </div>

            {/* Right Astra */}
            <div className="relative flex flex-col justify-between overflow-hidden p-12 xl:p-16">
              <img
                src={assetUrl("astra-cosmos-crown.webp")}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-28"
              />
              <div className="relative z-10">
                <span className="chamfer-badge bg-[#E2BE70] px-3 py-1 font-mono text-xs font-bold text-[#14192E]">
                  20% 架构攻坚
                </span>
                <h3 className="mt-5 text-4xl font-black text-white">GPT-6.2 Astra</h3>
                <p className="mt-2 text-base text-[#CBD3E6]">
                  复杂并发排查、数理推演、专业交付
                </p>
              </div>
              <div className="relative z-10 flex items-baseline gap-3">
                <span className="font-display text-6xl font-bold text-white">
                  $0
                </span>
                <span className="text-sm text-[#B8C2E0]">固定月租 · 随时切换调用</span>
              </div>
            </div>
          </div>

          {/* Floating Capsule Scrubber Controller */}
          <div className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2">
            <div className="flex items-center gap-1 rounded-full border border-white/15 bg-[#0C1029]/90 p-1.5 backdrop-blur-md">
              {[
                { idx: 0 as const, label: "01 · GPT-6.2 Sol", progress: 0.05 },
                { idx: 1 as const, label: "02 · GPT-6.2 Astra", progress: 0.56 },
                { idx: 2 as const, label: "03 · 双星黄金协同", progress: 0.94 },
              ].map((item) => (
                <button
                  key={item.idx}
                  type="button"
                  onClick={() => scrollToProgress(item.progress)}
                  data-testid={`arena-cap-${item.idx}`}
                  className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                    activeCap === item.idx
                      ? "bg-[#E2BE70] text-[#14192E]"
                      : "text-[#CBD3E6] hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="h-1 w-48 overflow-hidden rounded-full bg-white/15">
              <div
                ref={progressBarRef}
                className="h-full w-full origin-left bg-[#E2BE70]"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Fallback: Clean Full-Bleed Visual Posters */}
      <div className="space-y-4 px-4 py-12 sm:px-6 lg:hidden">
        <div className="relative overflow-hidden rounded-2xl border border-[#2D3B7A]">
          <img
            src={assetUrl("sol-dawn-engine.webp")}
            alt="GPT-6.2 Sol"
            className="h-64 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1029] via-[#0C1029]/45 to-transparent" />
          <div className="absolute right-0 bottom-0 left-0 p-5">
            <span className="chamfer-badge bg-[#E2BE70] px-2.5 py-0.5 font-mono text-xs font-bold text-[#14192E]">
              01 · 80% 日常主力
            </span>
            <h3 className="mt-2 text-2xl font-black text-white">GPT-6.2 Sol</h3>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-[#E6EBF8]">
              <span className="rounded-md bg-[#0C1029]/80 px-2.5 py-1">~0.4s 极速首字</span>
              <span className="rounded-md bg-[#0C1029]/80 px-2.5 py-1">¥0.03 / 轮</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-[#2D3B7A]">
          <img
            src={assetUrl("astra-cosmos-crown.webp")}
            alt="GPT-6.2 Astra"
            className="h-64 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1029] via-[#0C1029]/45 to-transparent" />
          <div className="absolute right-0 bottom-0 left-0 p-5">
            <span className="chamfer-badge bg-[#E2BE70] px-2.5 py-0.5 font-mono text-xs font-bold text-[#14192E]">
              02 · 20% 架构攻坚
            </span>
            <h3 className="mt-2 text-2xl font-black text-white">GPT-6.2 Astra</h3>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-[#E6EBF8]">
              <span className="rounded-md bg-[#0C1029]/80 px-2.5 py-1">满血 High 推理链</span>
              <span className="rounded-md bg-[#0C1029]/80 px-2.5 py-1">免 $200 月租</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
