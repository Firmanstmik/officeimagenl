import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type PaperFlipImageProps = {
  src: string;
  alt: string;
  flipVersion: number;
  className?: string;
};

export function PaperFlipImage({ src, alt, flipVersion, className = "" }: PaperFlipImageProps) {
  const prevVersion = useRef(flipVersion);
  const prevSrc = useRef(src);
  const [direction, setDirection] = useState(1);
  const [outgoing, setOutgoing] = useState<{ src: string; version: number } | null>(null);

  useEffect(() => {
    if (flipVersion === prevVersion.current) return;
    setDirection(flipVersion > prevVersion.current ? 1 : -1);
    setOutgoing({ src: prevSrc.current, version: prevVersion.current });
    prevVersion.current = flipVersion;
    prevSrc.current = src;
    const t = setTimeout(() => setOutgoing(null), 720);
    return () => clearTimeout(t);
  }, [flipVersion, src]);

  return (
    <div className={`relative h-full w-full [perspective:1400px] ${className}`}>
      <AnimatePresence mode="popLayout">
        {outgoing && (
          <motion.div
            key={`out-${outgoing.version}`}
            className="absolute inset-0 origin-left [transform-style:preserve-3d] shadow-[inset_-12px_0_24px_-8px_rgba(0,0,0,0.45)]"
            initial={{ rotateY: 0, zIndex: 2 }}
            animate={{ rotateY: direction * -92 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.72, ease: [0.42, 0.02, 0.18, 1] }}
            style={{ backfaceVisibility: "hidden" }}
          >
            <img src={outgoing.src} alt="" className="h-full w-full object-cover" aria-hidden />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, rgba(255,255,255,0.08) 0%, transparent 42%, rgba(0,0,0,0.28) 100%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={flipVersion}
        className="absolute inset-0 origin-right [transform-style:preserve-3d]"
        initial={{ rotateY: direction * 92, opacity: 0.9 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.72, ease: [0.42, 0.02, 0.18, 1] }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      </motion.div>
    </div>
  );
}
