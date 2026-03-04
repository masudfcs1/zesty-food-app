import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import zestyCup from "@/assets/zesty-cup.jpeg";
import zestyDetails from "@/assets/zesty-details.jpeg";
import zestyBox from "@/assets/zesty-box.jpeg";
import ParticleField from "./ParticleField";

const products = [
  {
    image: zestyCup,
    title: "Daber Pudding – Cup",
    subtitle: "প্রকৃতির মিষ্টি স্বাদ এক চামচেই তৃপ্তি!",
    benefits: [
      "Keeps body hydrated",
      "Easy to digest & light",
      "Keeps body cool in summer",
      "Suitable for all ages",
      "Removes fatigue",
      "Made with natural ingredients",
    ],
    badge: "Bestseller",
  },
  {
    image: zestyDetails,
    title: "Daber Pudding – Family",
    subtitle: "Coconut water, coconut pulp, milk, sugar & agar powder (Halal)",
    benefits: [
      "Restaurant wholesale",
      "Family programs",
      "Corporate events",
      "Online & offline sales",
      "100% natural ingredients",
      "No preservatives",
    ],
    badge: "Bulk Orders",
  },
  {
    image: zestyBox,
    title: "Daber Pudding – Box Pack",
    subtitle: "Order 3 Box & Enjoy Free Delivery!",
    benefits: [
      "3-box free delivery offer",
      "Keeps body hydrated",
      "Easy to digest & light",
      "Suitable for all ages",
      "100% natural & preservative-free",
      "Served chilled for best taste",
    ],
    badge: "Free Delivery",
  },
];

const ZestyProductsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--gradient-green-soft)" }}
    >
      <ParticleField count={15} />

      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {["🥥", "🌴", "🍃", "🌿"].map((emoji, i) => (
          <motion.span
            key={i}
            className="absolute text-3xl opacity-10"
            style={{ left: `${10 + i * 22}%`, top: `${8 + i * 18}%` }}
            animate={{ y: [-12, 12, -12], rotate: [-15, 15, -15] }}
            transition={{
              duration: 5 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <p className="text-sm font-body font-semibold tracking-[0.2em] uppercase text-tropical-green mb-4">
            🥥 Zesty Daber Pudding
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-foreground">
            Our <span className="gradient-text-tropical">Products</span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground font-body text-base md:text-lg mt-4 max-w-2xl mx-auto"
          >
            100% natural Zesty — no preservatives, served chilled for the
            perfect tropical experience.
          </motion.p>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {products.map((product, i) => {
            const imgParallax = useTransform(
              scrollYProgress,
              [i * 0.2, (i + 1) * 0.3],
              [30, -30],
            );

            return (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 80 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.2 }}
                className={`grid lg:grid-cols-2 gap-8 md:gap-12 items-center`}
              >
                {/* Image */}
                <motion.div
                  className={`relative ${i % 2 === 1 ? "lg:order-2" : ""}`}
                  style={{ y: imgParallax }}
                >
                  <motion.div
                    className="absolute -inset-3 rounded-3xl blur-2xl opacity-20"
                    style={{ background: "hsl(120 40% 50%)" }}
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="relative overflow-hidden rounded-2xl shadow-2xl"
                    whileHover={{ scale: 1.03, rotateY: 3 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="relative z-10 w-full"
                    />
                    {/* Shine overlay on hover */}
                    <motion.div
                      className="absolute inset-0 z-20"
                      style={{
                        background:
                          "linear-gradient(105deg, transparent 40%, hsl(0 0% 100% / 0.15) 45%, transparent 50%)",
                      }}
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "200%" }}
                      transition={{ duration: 0.8 }}
                    />
                  </motion.div>
                  <motion.span
                    className="absolute top-4 left-4 z-20 px-4 py-1.5 rounded-full text-xs font-body font-bold text-primary-foreground"
                    style={{ background: "var(--gradient-tropical)" }}
                    initial={{ scale: 0, rotate: -12 }}
                    animate={isInView ? { scale: [0, 1.15, 1], rotate: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.2 }}
                  >
                    {product.badge}
                  </motion.span>
                </motion.div>

                {/* Details */}
                <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <motion.h3
                    initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                    className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2"
                  >
                    {product.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.2 }}
                    className="text-muted-foreground font-body text-base md:text-lg mb-6 leading-relaxed"
                  >
                    {product.subtitle}
                  </motion.p>

                  <ul className="space-y-3">
                    {product.benefits.map((benefit, bi) => (
                      <motion.li
                        key={benefit}
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: 0.5 + i * 0.15 + bi * 0.07,
                        }}
                        whileHover={{ x: 6 }}
                        className="flex items-center gap-3 font-body text-foreground"
                      >
                        <motion.span
                          className="text-tropical-green text-lg"
                          whileInView={{ scale: [0, 1.3, 1] }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.6 + bi * 0.07 }}
                        >
                          ✓
                        </motion.span>
                        {benefit}
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.2 }}
                    className="btn-secondary mt-8"
                    whileHover={{
                      scale: 1.08,
                      boxShadow: "0 15px 40px hsl(140 35% 40% / 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Order Now 🥥
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ZestyProductsSection;
