import { ArrowUpRight, Check, Copy, QrCode, X } from "lucide-react";
import { useState } from "react";
import { SITE_CONFIG } from "../config/siteConfig";
import { FourPointStar } from "./StarLine";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [copiedId, setCopiedId] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!open) return null;

  const handleCopy = async (text: string, type: "id" | "url") => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback ignored in restricted environments; state still updates cleanly
    }
    if (type === "id") {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0C1029]/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-xl border border-[#2D3B7A] bg-[#12183E] p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#2D3B7A] pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#E2BE70]">
              <FourPointStar className="h-3 w-3" />
              <span>SERVICE ACCESS CARD</span>
            </div>
            <h3 id="contact-modal-title" className="mt-1 text-xl font-bold text-white">
              获取测试 Key 与 1:1 远程配好
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭弹窗"
            className="cursor-pointer rounded-lg border border-[#2D3B7A] p-1.5 text-[#9EA9CE] transition-colors hover:border-[#E2BE70] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* QR or Placeholder */}
        <div className="mt-5 flex flex-col items-center rounded-lg border border-[#2D3B7A] bg-[#0C1029] p-5 text-center">
          {SITE_CONFIG.links.wechatQrImage ? (
            <img
              src={SITE_CONFIG.links.wechatQrImage}
              alt="微信联系二维码"
              className="h-40 w-40 rounded-lg bg-white p-2 object-contain"
            />
          ) : (
            <div className="flex h-36 w-36 flex-col items-center justify-center rounded-lg border border-dashed border-[#2D3B7A] bg-[#192252]/50 px-3">
              <QrCode className="h-12 w-12 text-[#E2BE70]" strokeWidth={1.5} />
              <span className="mt-2 font-mono text-xs text-[#9EA9CE]">
                可替换为微信二维码
              </span>
            </div>
          )}
          <p className="mt-3 text-xs text-[#B8C2E0]">
            加好友备注「鱼池中转」，发 0.17x 实时价目表与测试额度
          </p>
        </div>

        {/* Copy Wechat & Base URL */}
        <div className="mt-4 space-y-2.5">
          <div className="flex items-center justify-between rounded-lg border border-[#2D3B7A] bg-[#192252] px-3.5 py-2.5">
            <div>
              <div className="text-xs text-[#9EA9CE]">站长微信号</div>
              <div className="font-mono text-sm font-semibold text-white">
                {SITE_CONFIG.links.wechatId}
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(SITE_CONFIG.links.wechatId, "id")}
              data-testid="copy-wechat-btn"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-[#E2BE70] px-3 py-1.5 text-xs font-bold text-[#14192E] transition-colors hover:bg-[#ecd08f]"
            >
              {copiedId ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedId ? "已复制微信号" : "复制微信号"}
            </button>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-[#2D3B7A] bg-[#192252] px-3.5 py-2.5">
            <div className="min-w-0 pr-2">
              <div className="text-xs text-[#9EA9CE]">兼容接入地址（Base URL）</div>
              <div className="truncate font-mono text-xs font-medium text-[#E2BE70]">
                {SITE_CONFIG.links.apiBaseUrl}
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(SITE_CONFIG.links.apiBaseUrl, "url")}
              className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-md border border-[#2D3B7A] bg-[#0C1029] px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:border-[#E2BE70]"
            >
              {copiedUrl ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedUrl ? "已复制" : "复制"}
            </button>
          </div>
        </div>

        {/* Direct Console Link */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <a
            href={SITE_CONFIG.links.consoleUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#E2BE70]/60 bg-transparent px-4 py-2.5 text-xs font-semibold text-[#E2BE70] transition-colors hover:bg-[#E2BE70] hover:text-[#14192E]"
          >
            已有账号？直接进控制台
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
