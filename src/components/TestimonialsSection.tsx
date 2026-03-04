import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ParticleField from "./ParticleField";

const testimonials = [
  {
    name: "Masud Rana",
    role: "@sarahsweets",
    text: "The silkiest Zesty I've ever tasted. It's like a tropical vacation in every spoonful!",
    rating: 5,
    initials: "SC",
  },
  {
    name: "Mithun Rao",
    role: "Chef, Tropicana Restaurant",
    text: "We serve this at our restaurant. Guests always come back for seconds. Exceptional quality.",
    rating: 5,
    initials: "MR",
  },
  {
    name: "Tisha Chowdhury",
    role: "Dessert Enthusiast",
    text: "Finally, a coconut dessert that's creamy, natural, and absolutely divine. My whole family loves it!",
    rating: 5,
    initials: "TC",
  },
];

const StarRating = ({ rating, delay }: { rating: number; delay: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: rating }).map((_, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        whileInView={{ opacity: 1, scale: [0, 1.3, 1], rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + i * 0.08 }}
        className="text-warm-gold text-xl"
      >
        ★
      </motion.span>
    ))}
  </div>
);

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--gradient-green-soft)" }}
    >
      <ParticleField count={15} />

      {/* Sparkle particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-lg"
            style={{ left: `${15 + i * 14}%`, top: `${20 + ((i * 23) % 60)}%` }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0.5, 1, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-sm font-body font-semibold tracking-[0.2em] uppercase text-tropical-green mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-foreground">
            Loved by <span className="gradient-text">Thousands</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
          style={{ perspective: 1000, rotateX }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
              whileHover={{ y: -8, scale: 1.03, rotateY: 3 }}
              className="glass-card-hover p-6 md:p-8 relative overflow-hidden"
            >
              {/* Quote mark decoration */}
              <motion.span
                className="absolute top-4 right-4 text-5xl opacity-10 font-display text-tropical-green"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                "
              </motion.span>

              <StarRating rating={t.rating} delay={0.5 + i * 0.15} />
              <p className="text-foreground font-body mt-4 mb-6 text-base md:text-lg leading-relaxed italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + i * 0.15,
                    type: "spring",
                  }}
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-primary-foreground"
                  style={{ background: "var(--gradient-tropical)" }}
                >
                  {t.initials}
                </motion.div>
                <div>
                  <p className="font-display font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-muted-foreground font-body text-sm">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
