import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ParticleField from "./ParticleField";

const steps = [
  {
    number: "01",
    title: "Choose Your Flavor",
    description: "Pick from our range of creamy Zesty flavors.",
    emoji: "🎯",
  },
  {
    number: "02",
    title: "We Craft It Fresh",
    description: "Made daily with organic coconut milk and natural sweeteners.",
    emoji: "👨‍🍳",
  },
  {
    number: "03",
    title: "Delivered To You",
    description: "Chilled and packed carefully, straight to your doorstep.",
    emoji: "📦",
  },
];

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--gradient-cream)" }}
    >
      <ParticleField count={10} />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-body font-semibold tracking-[0.2em] uppercase text-tropical-green mb-4">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-foreground">
            Simple as <span className="gradient-text">1-2-3</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Animated connector line */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 z-0">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--gradient-tropical)" }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
            />
            {/* Traveling dot on line */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-warm-gold"
              initial={{ left: "0%" }}
              animate={isInView ? { left: ["0%", "100%"] } : {}}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
              style={{ boxShadow: "0 0 12px hsl(var(--warm-gold) / 0.6)" }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.25 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="text-center"
              >
                <motion.div
                  className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center font-display text-2xl font-bold text-primary-foreground relative"
                  style={{ background: "var(--gradient-tropical)" }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: [0, 1.2, 1], rotate: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.6 + i * 0.25,
                    type: "spring",
                  }}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                >
                  {step.number}
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-tropical-green/30"
                    animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                  <motion.span
                    className="absolute -top-2 -right-2 text-xl"
                    animate={{ y: [-3, 3, -3], rotate: [-5, 5, -5] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    {step.emoji}
                  </motion.span>
                </motion.div>

                <h3 className="text-lg md:text-xl font-display font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed text-sm md:text-base">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
