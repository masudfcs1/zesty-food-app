import { motion } from "framer-motion";

interface SectionDividerProps {
  flip?: boolean;
  color?: string;
}

const SectionDivider = ({ flip = false, color = "hsl(var(--background))" }: SectionDividerProps) => (
  <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""}`} style={{ marginTop: "-1px", marginBottom: "-1px" }}>
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-8 md:h-12">
      <motion.path
        d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
        fill={color}
        animate={{
          d: [
            "M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z",
            "M0,20 C240,0 480,50 720,20 C960,0 1200,50 1440,20 L1440,60 L0,60 Z",
            "M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  </div>
);

export default SectionDivider;
