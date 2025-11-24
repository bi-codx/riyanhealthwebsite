/* RIYAN HEALTH LANDING 5/src/components/LiveStats.tsx */
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

function formatInteger(n: number) {
  return new Intl.NumberFormat().format(Math.round(n));
}

function formatCompact(n: number) {
  return new Intl.NumberFormat(undefined, {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(n);
}

function useCountTo(target: number, { duration = 2.0, decimals = 0 } = {}) {
  const [value, setValue] = useState<number>(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let start: number | null = null;
    const startVal = 0;
    const diff = target - startVal;
    const totalMs = Math.max(1, duration * 1000);

    function step(timestamp: number) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(1, elapsed / totalMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startVal + diff * eased;
      setValue(Number(current.toFixed(decimals)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setValue(Number(target.toFixed(decimals)));
      }
    }

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, decimals]);

  return value;
}

type LiveStatCardProps = {
  title: string;
  source?: string;
  target: number;
  duration?: number;
  format?: "integer" | "compact";
};

function LiveStatCard({
  title,
  source,
  target,
  duration = 2.0,
  format = "integer",
}: LiveStatCardProps) {
  const value = useCountTo(target, { duration, decimals: 0 });
  const display =
    format === "compact" ? formatCompact(value) : formatInteger(value);

  return (
    <div className="flex flex-col gap-3 px-4 py-6">
      <div
        role="status"
        aria-live="polite"
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: "clamp(40px, 5vw, 64px)",
          fontWeight: 700,
          color: "#FF3B30",
          lineHeight: 1.02,
          letterSpacing: "-0.02em",
        }}
      >
        {display}
      </div>

      <div
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: "13px",
          fontWeight: 700,
          color: "var(--riyan-text-primary)",
          lineHeight: 1.4,
        }}
      >
        {title}
      </div>

      {source && (
        <div
          style={{
            fontSize: 11,
            color: "var(--riyan-text-secondary)",
          }}
        >
          {source}
        </div>
      )}
    </div>
  );
}

export function LiveStats() {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={statsRef}
      initial={{ opacity: 0, y: 24 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
        <LiveStatCard
          title="43 million deaths per year"
          source="WHO"
          target={43000000}
          duration={2.4}
          format="integer"
        />

        <LiveStatCard
          title="Suffer risk factors worldwide"
          source="UNICEF (Children & Adolescents)"
          target={2100000000}
          duration={2.6}
          format="compact"
        />

        <LiveStatCard
          title="60-80% of all deaths worldwide"
          source="WHO"
          target={75}
          duration={2.2}
          format="integer"
        />    
      </div>
    </motion.div>
  );
}
