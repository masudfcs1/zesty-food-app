import { motion } from "framer-motion";

interface MarqueeStripProps {
  items: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
}

const MarqueeStrip = ({
  items,
  speed = 20,
  reverse = false,
  className = "",
}: MarqueeStripProps) => {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`overflow-hidden py-4 ${className}`}
      style={{ background: "var(--gradient-tropical)" }}
    >
      <motion.div
        className="flex whitespace-nowrap gap-8"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="text-sm md:text-base font-body font-semibold text-slate-200 flex items-center gap-3 shrink-0"
          >
            {item}
            <span className="text-primary-foreground/40">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeStrip;
