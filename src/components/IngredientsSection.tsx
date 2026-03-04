import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ingredientsImg from "@/assets/ingredients.jpg";
import ParticleField from "./ParticleField";

const ingredients = [
  { name: "Fresh Coconut Milk", description: "Cold-pressed from organic coconuts", icon: "🥥" },
  { name: "Pure Vanilla Bean", description: "Hand-picked Madagascar vanilla", icon: "🌿" },
  { name: "Organic Palm Sugar", description: "Unrefined golden sweetness", icon: "🍯" },
  { name: "Coconut Cream", description: "Extra thick and velvety smooth", icon: "🥄" },
];

const IngredientsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imgRotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <section ref={ref} className="section-padding relative overflow-hidden" style={{ background: "var(--gradient-green-soft)" }}>
      <ParticleField count={12} />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -60, rotateY: 10 }}
          animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="rounded-3xl overflow-hidden shadow-2xl relative"
          style={{ y: imgY, rotate: imgRotate }}
        >
          <motion.img
            src={ingredientsImg}
            alt="Fresh coconut ingredients"
            className="w-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5 }}
          />
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(105deg, transparent 40%, hsl(0 0% 100% / 0.12) 45%, transparent 50%)",
            }}
            initial={{ x: "-100%" }}
            animate={isInView ? { x: ["-100%", "200%"] } : {}}
            transition={{ duration: 1.5, delay: 1 }}
          />
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-sm font-body font-semibold tracking-[0.2em] uppercase text-tropical-green mb-4">
              Pure Ingredients
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Only the <span className="gradient-text-tropical">Finest</span>
            </h2>
            <p className="text-muted-foreground font-body text-base md:text-lg mb-10 leading-relaxed">
              Every spoonful is made with carefully sourced, all-natural ingredients from tropical farms.
            </p>
          </motion.div>

          <div className="space-y-4 md:space-y-6">
            {ingredients.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.12 }}
                whileHover={{ x: 10, scale: 1.02, boxShadow: "0 10px 30px hsl(var(--glass-shadow))" }}
                className="flex items-start gap-4 glass-card p-4 md:p-5 group cursor-pointer transition-all duration-300"
              >
                <motion.span
                  className="text-2xl md:text-3xl"
                  whileInView={{ scale: [0.5, 1.2, 1], rotate: [0, -10, 0] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                  whileHover={{ scale: 1.3, rotate: 15 }}
                >
                  {item.icon}
                </motion.span>
                <div>
                  <h4 className="font-display font-semibold text-foreground text-base md:text-lg">{item.name}</h4>
                  <p className="text-muted-foreground font-body text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngredientsSection;
