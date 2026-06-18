import { OI } from "@/lib/oi-data";

/** Cropped flame mark from the full Office Image wordmark — no text. */
export function LogoMark({
  className = "",
  height = 32,
  width = 30,
}: {
  className?: string;
  height?: number;
  width?: number;
}) {
  return (
    <div className={`overflow-hidden shrink-0 ${className}`} style={{ width }} aria-hidden>
      <img
        src={OI.logo}
        alt=""
        style={{ height }}
        className="w-auto max-w-none object-left object-cover"
        draggable={false}
      />
    </div>
  );
}
