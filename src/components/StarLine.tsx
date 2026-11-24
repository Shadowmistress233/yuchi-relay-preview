interface StarLineProps {
  dark?: boolean;
  className?: string;
}

export function FourPointStar({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 0L9.6 6.4L16 8L9.6 9.6L8 16L6.4 9.6L0 8L6.4 6.4L8 0Z" />
    </svg>
  );
}

export function StarLine({ dark = false, className = "" }: StarLineProps) {
  const lineColor = dark ? "bg-[#2D3B7A]" : "bg-[#CBD3E6]";
  const starColor = dark ? "text-[#E2BE70]" : "text-[#4A5370]";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`h-px flex-1 ${lineColor}`} />
      <FourPointStar className={`w-2.5 h-2.5 shrink-0 ${starColor}`} />
    </div>
  );
}
