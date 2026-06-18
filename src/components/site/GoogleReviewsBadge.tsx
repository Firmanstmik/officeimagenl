import { OI } from "@/lib/oi-data";

function GoogleMark({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function IconStar({ className = "size-2.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l2.9 6.9L22 9.8l-5.2 4.5 1.6 6.9L12 17.8 5.6 21.2l1.6-6.9L2 9.8l7.1-.9L12 2z" />
    </svg>
  );
}

type GoogleReviewsBadgeProps = {
  className?: string;
  variant?: "dark" | "light";
};

export function GoogleReviewsBadge({ className = "", variant = "dark" }: GoogleReviewsBadgeProps) {
  const isDark = variant === "dark";

  return (
    <a
      href={OI.social.googleReviews}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 transition-all duration-300",
        isDark
          ? "border-[var(--bone)]/14 bg-[var(--bone)]/6 hover:border-[var(--ochre)]/35 hover:bg-[var(--bone)]/10"
          : "border-[var(--ink)]/10 bg-white/80 hover:border-[var(--clay)]/30 hover:bg-white",
        className,
      ].join(" ")}
      aria-label="4,9 sterren op Google Reviews"
    >
      <GoogleMark />
      <span className={`font-semibold leading-none num ${isDark ? "text-[var(--ochre)]" : "text-[var(--ink)]"}`}>4,9</span>
      <span className={`flex items-center gap-px ${isDark ? "text-[var(--ochre)]" : "text-[var(--clay)]"}`} aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <IconStar key={i} />
        ))}
      </span>
      <span className={`hidden sm:inline text-[10px] font-medium leading-none ${isDark ? "text-[var(--bone)]/75" : "text-[var(--graphite)]/80"}`}>
        Google Reviews
      </span>
    </a>
  );
}
