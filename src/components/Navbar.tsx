import { ArrowUpRight, Menu, MessageSquareText, X } from "lucide-react";
import { useState } from "react";
import { SITE_CONFIG } from "../config/siteConfig";
import { FourPointStar } from "./StarLine";

interface NavbarProps {
  onOpenContact: () => void;
}

const NAV_LINKS = [
  { label: "双星剧场", href: "#arena" },
  { label: "图像 2.6", href: "#gallery" },
  { label: "核心优势", href: "#advantages" },
  { label: "1:1 支持", href: "#support" },
];

export function Navbar({ onOpenContact }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#DCE2F0] bg-[#F4F6FB]/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#12183E] text-[#E2BE70]">
            <FourPointStar className="h-4 w-4" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-black tracking-tight text-[#14192E]">
              {SITE_CONFIG.brand.name}
            </span>
            <span className="hidden font-mono text-xs font-medium tracking-wider text-[#4A5370] sm:inline">
              / {SITE_CONFIG.brand.englishName}
            </span>
          </div>
          <span className="hidden items-center gap-1.5 rounded-md border border-[#DCE2F0] bg-white px-2 py-0.5 text-xs font-medium text-[#4A5370] md:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            直连在线
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-[#4A5370] transition-colors hover:text-[#14192E]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={SITE_CONFIG.links.consoleUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1 rounded-lg border border-[#CBD3E6] bg-white px-3.5 py-2 text-xs font-semibold text-[#14192E] transition-colors hover:border-[#4A50C8] hover:text-[#4A50C8] sm:inline-flex"
          >
            控制台
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#12183E] px-3.5 py-2 text-xs font-bold text-[#E2BE70] transition-colors hover:bg-[#192252]"
          >
            <MessageSquareText className="h-3.5 w-3.5" />
            微信拿报价
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="展开导航菜单"
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#DCE2F0] bg-white text-[#14192E] lg:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#DCE2F0] bg-white px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[#14192E] hover:bg-[#F4F6FB]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={SITE_CONFIG.links.consoleUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#CBD3E6] px-3 py-2 text-xs font-semibold text-[#14192E]"
            >
              进入控制台
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
