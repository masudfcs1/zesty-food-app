import { motion } from "framer-motion";

const ParticleField = ({ count = 20 }: { count?: number }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: 2 + (i % 4) * 2,
          height: 2 + (i % 4) * 2,
          left: `${(i * 17) % 100}%`,
          top: `${(i * 23) % 100}%`,
          background: `hsl(${120 + (i * 10) % 40} ${30 + (i * 5) % 20}% ${50 + (i * 3) % 30}% / 0.15)`,
        }}
        animate={{
          y: [0, -30 - (i % 3) * 20, 0],
          x: [0, (i % 2 === 0 ? 15 : -15), 0],
          opacity: [0.05, 0.3, 0.05],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 4 + (i % 5) * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: (i * 0.3) % 3,
        }}
      />
    ))}
  </div>
);

export default ParticleField;
