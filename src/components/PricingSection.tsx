import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import ParticleField from "./ParticleField";

const plans = [
  {
    name: "Single",
    price: 8.99,
    description: "Perfect for a personal treat",
    features: ["1 Zesty", "Choice of flavor", "Free spoon set"],
    highlighted: false,
    emoji: "🥄",
  },
  {
    name: "Family Pack",
    price: 29.99,
    description: "Share the tropical bliss",
    features: [
      "4 Zestys",
      "Mix & match flavors",
      "Premium packaging",
      "Free delivery",
    ],
    highlighted: true,
    emoji: "👨‍👩‍👧‍👦",
  },
  {
    name: "Celebration",
    price: 49.99,
    description: "For special occasions",
    features: [
      "8 Zestys",
      "All flavors included",
      "Gift wrapping",
      "Free delivery",
      "Personalized card",
    ],
    highlighted: false,
    emoji: "🎉",
  },
];

const AnimatedPrice = ({
  price,
  isInView,
}: {
  price: number;
  isInView: boolean;
}) => {
  const [displayPrice, setDisplayPrice] = useState(0);

  return (
    <motion.span
      className="text-4xl md:text-5xl font-display font-bold"
      initial={{ scale: 0.3, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      onAnimationComplete={() => {
        let start = 0;
        const end = price;
        const step = end / 30;
        const interval = setInterval(() => {
          start += step;
          if (start >= end) {
            start = end;
            clearInterval(interval);
          }
          setDisplayPrice(parseFloat(start.toFixed(2)));
        }, 20);
      }}
    >
      ${displayPrice.toFixed(2)}
    </motion.span>
  );
};

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--gradient-cream)" }}
    >
      <ParticleField count={10} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-sm font-body font-semibold tracking-[0.2em] uppercase text-tropical-green mb-4">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-foreground">
            Choose Your <span className="gradient-text-tropical">Package</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 60, rotateX: 10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
              whileHover={{
                y: -16,
                scale: 1.03,
                boxShadow: plan.highlighted
                  ? "0 25px 60px hsl(140 35% 40% / 0.25)"
                  : "0 20px 40px hsl(var(--glass-shadow))",
              }}
              className={`relative p-6 md:p-8 rounded-3xl border flex flex-col transition-shadow duration-300 ${
                plan.highlighted
                  ? "border-tropical-green pulse-glow"
                  : "border-border"
              }`}
              style={{
                background: plan.highlighted
                  ? "linear-gradient(135deg, hsl(100 40% 94%), hsl(120 30% 92%))"
                  : "hsl(var(--card))",
              }}
            >
              {plan.highlighted && (
                <motion.span
                  initial={{ opacity: 0, scale: 0, y: -10 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-body font-bold text-primary-foreground"
                  style={{ background: "var(--gradient-tropical)" }}
                >
                  Most Popular ✨
                </motion.span>
              )}

              <motion.span
                className="text-3xl mb-4"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              >
                {plan.emoji}
              </motion.span>

              <h3 className="text-xl font-display font-bold text-foreground mb-1">
                {plan.name}
              </h3>
              <p className="text-muted-foreground font-body text-sm mb-6">
                {plan.description}
              </p>

              <div className="mb-6">
                <AnimatedPrice price={plan.price} isInView={isInView} />
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, fi) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + fi * 0.08 }}
                    className="flex items-center gap-3 text-foreground font-body text-sm md:text-base"
                  >
                    <motion.span
                      className="text-tropical-green"
                      whileInView={{ scale: [0, 1.3, 1] }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + fi * 0.08 }}
                    >
                      ✓
                    </motion.span>
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <motion.button
                className={
                  plan.highlighted
                    ? "btn-secondary w-full"
                    : "btn-primary w-full"
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Order Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
