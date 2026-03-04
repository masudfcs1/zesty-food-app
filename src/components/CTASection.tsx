import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import ParticleField from "./ParticleField";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");

  return (
    <section ref={ref} className="section-padding relative overflow-hidden" style={{ background: "var(--gradient-cta)" }}>
      <ParticleField count={18} />

      {/* Floating background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-10"
          style={{ background: "hsl(100 50% 70%)" }}
          animate={{ x: [-30, 30, -30], y: [-20, 20, -20], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-48 h-48 rounded-full opacity-10"
          style={{ background: "hsl(140 30% 50%)" }}
          animate={{ x: [20, -20, 20], y: [15, -15, 15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full opacity-5"
          style={{ background: "hsl(80 40% 90%)" }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        {["🌿", "🍃", "🌴"].map((leaf, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl opacity-15"
            style={{ left: `${20 + i * 25}%`, top: `${15 + i * 20}%` }}
            animate={{ y: [-10, 15, -10], rotate: [-20, 20, -20] }}
            transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {leaf}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: [0, 1.2, 1] } : {}}
          transition={{ duration: 0.6 }}
          className="text-5xl mb-6"
        >
          🥥
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-cream mb-6"
        >
          {"Ready for a Tropical Treat?".split(" ").map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-3"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-coconut-light font-body text-base md:text-lg mb-10 leading-relaxed"
        >
          Sign up for exclusive offers, new flavors, and tropical recipes delivered to your inbox.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input-glow flex-1 bg-cream/10 text-cream placeholder:text-coconut-light/50 border-coconut-light/20"
          />
          <motion.button
            type="submit"
            className="px-8 py-3 rounded-xl font-body font-semibold bg-warm-gold text-foreground transition-all duration-300 whitespace-nowrap"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(38 70% 55% / 0.4)" }}
            whileTap={{ scale: 0.95, rotate: [-1, 1, 0] }}
          >
            Get Started 🥥
          </motion.button>
        </motion.form>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="flex justify-center gap-6 mt-8"
        >
          {["🔒 Secure", "📦 Free Shipping", "💯 Quality"].map((badge, i) => (
            <motion.span
              key={i}
              className="text-coconut-light/50 font-body text-xs md:text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1 + i * 0.1 }}
            >
              {badge}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
