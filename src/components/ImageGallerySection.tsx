import { Grid, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { SITE_CONFIG } from "../config/siteConfig";

type AlphaBgMode = "checker" | "light" | "navy";

export function ImageGallerySection() {
  const [alphaBg, setAlphaBg] = useState<AlphaBgMode>("checker");
  const [loupePos, setLoupePos] = useState<{ x: number; y: number; active: boolean }>({
    x: 50,
    y: 50,
    active: false,
  });

  const [sanctuary, relic, desk] = SITE_CONFIG.gallery;

  const alphaBgClass =
    alphaBg === "checker"
      ? "alpha-checkerboard"
      : alphaBg === "light"
      ? "bg-[#F4F6FB]"
      : "bg-[#0C1029]";

  return (
    <section
      id="gallery"
      className="border-b border-[#2D3B7A] bg-[#12183E] py-16 text-white lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Compact Visual Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="chamfer-badge bg-[#E2BE70] px-3 py-1 font-mono text-xs font-bold text-[#14192E]">
              图像 03
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              GPT Image 2.6 实机画廊
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#E2BE70]">
            <Sparkles className="h-3.5 w-3.5" />
            0.17x 按量直出商业插画与原生透明 PNG
          </span>
        </div>

        {/* Image-Dominated Asymmetric Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* 8-Col Widescreen Sanctuary with 2.5x Loupe */}
          <div
            className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#2D3B7A] bg-[#0C1029] lg:col-span-8 lg:cursor-crosshair"
            onMouseMove={(e) => {
              if (window.innerWidth < 1024) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              setLoupePos({ x, y, active: true });
            }}
            onMouseLeave={() => setLoupePos((p) => ({ ...p, active: false }))}
          >
            <img
              src={sanctuary.image}
              alt={sanctuary.title}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#0C1029]/90 via-[#0C1029]/30 to-transparent p-5">
              <div>
                <div className="text-lg font-black text-white">{sanctuary.title}</div>
                <div className="font-mono text-xs text-[#E2BE70]">{sanctuary.resolution}</div>
              </div>
              <span className="hidden items-center gap-1.5 rounded-full border border-white/20 bg-[#0C1029]/80 px-3 py-1 font-mono text-xs text-white backdrop-blur-sm lg:inline-flex">
                <Search className="h-3.5 w-3.5 text-[#E2BE70]" />
                悬停 2.5x 细节放大
              </span>
            </div>

            {loupePos.active && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute hidden h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#E2BE70] shadow-[0_8px_28px_rgba(0,0,0,0.7)] lg:block"
                style={{
                  left: `${loupePos.x}%`,
                  top: `${loupePos.y}%`,
                  backgroundImage: `url(${sanctuary.image})`,
                  backgroundSize: "250% 250%",
                  backgroundPosition: `${loupePos.x}% ${loupePos.y}%`,
                }}
              />
            )}
          </div>

          {/* 4-Col Alpha Transparent Cutout */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#2D3B7A] bg-[#192252] lg:col-span-4">
            <div
              data-testid="alpha-preview-stage"
              data-bg-mode={alphaBg}
              className={`relative flex flex-1 items-center justify-center p-6 transition-colors ${alphaBgClass}`}
            >
              <img
                src={relic.image}
                alt={relic.title}
                className="max-h-72 w-auto object-contain lg:max-h-80"
              />
              {/* Floating Alpha Switcher */}
              <div className="absolute top-3 right-3 flex items-center gap-1 rounded-lg border border-[#2D3B7A] bg-[#0C1029]/90 p-1 backdrop-blur-sm">
                <Grid className="mx-1 h-3.5 w-3.5 text-[#E2BE70]" />
                <button
                  type="button"
                  onClick={() => setAlphaBg("checker")}
                  data-testid="alpha-bg-checker"
                  className={`cursor-pointer rounded px-2 py-0.5 text-xs font-semibold ${
                    alphaBg === "checker"
                      ? "bg-[#E2BE70] text-[#14192E]"
                      : "text-[#B8C2E0] hover:text-white"
                  }`}
                >
                  透明
                </button>
                <button
                  type="button"
                  onClick={() => setAlphaBg("light")}
                  data-testid="alpha-bg-light"
                  className={`cursor-pointer rounded px-2 py-0.5 text-xs font-semibold ${
                    alphaBg === "light"
                      ? "bg-[#E2BE70] text-[#14192E]"
                      : "text-[#B8C2E0] hover:text-white"
                  }`}
                >
                  白底
                </button>
                <button
                  type="button"
                  onClick={() => setAlphaBg("navy")}
                  data-testid="alpha-bg-navy"
                  className={`cursor-pointer rounded px-2 py-0.5 text-xs font-semibold ${
                    alphaBg === "navy"
                      ? "bg-[#E2BE70] text-[#14192E]"
                      : "text-[#B8C2E0] hover:text-white"
                  }`}
                >
                  暗底
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#2D3B7A] bg-[#0C1029] px-5 py-3.5">
              <span className="text-sm font-bold text-white">{relic.title}</span>
              <span className="font-mono text-xs text-[#E2BE70]">{relic.resolution}</span>
            </div>
          </div>

          {/* 12-Col Bottom Panoramic Showcase */}
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[#2D3B7A] bg-[#192252] md:grid-cols-12 lg:col-span-12">
            <div className="overflow-hidden md:col-span-5">
              <img
                src={desk.image}
                alt={desk.title}
                className="h-64 w-full object-cover md:h-72"
              />
            </div>
            <div className="flex flex-col justify-center gap-3 p-6 md:col-span-7 md:px-10">
              <span className="chamfer-badge w-fit bg-[#E2BE70] px-2.5 py-0.5 font-mono text-xs font-bold text-[#14192E]">
                {desk.tag}
              </span>
              <h3 className="text-2xl font-black text-white">{desk.title}</h3>
              <div className="flex flex-wrap gap-3 pt-1 font-mono text-xs text-[#CBD3E6]">
                <span className="rounded-lg border border-[#2D3B7A] bg-[#0C1029] px-3 py-1.5">
                  model: gpt-image-2.6-sunburst
                </span>
                <span className="rounded-lg border border-[#2D3B7A] bg-[#0C1029] px-3 py-1.5">
                  native alpha PNG
                </span>
                <span className="rounded-lg border border-[#2D3B7A] bg-[#0C1029] px-3 py-1.5 text-[#E2BE70]">
                  0.17x 按量出图
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
