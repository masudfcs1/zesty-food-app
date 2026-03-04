import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import puddingVarieties from "@/assets/pudding-varieties.jpg";
import ParticleField from "./ParticleField";

const products = [
  {
    name: "Classic Coconut",
    description: "Pure silky coconut with toasted flakes",
    price: "$8.99",
    tag: "Bestseller",
    emoji: "🥥",
  },
  {
    name: "Mango Paradise",
    description: "Fresh mango chunks on coconut cream",
    price: "$10.99",
    tag: "New",
    emoji: "🥭",
  },
  {
    name: "Chocolate Swirl",
    description: "Rich chocolate meets creamy coconut",
    price: "$9.99",
    tag: "Popular",
    emoji: "🍫",
  },
];

const ProductSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--gradient-cream)" }}
    >
      <ParticleField count={12} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.p
            className="text-sm font-body font-semibold tracking-[0.2em] uppercase text-tropical-green mb-4"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.2em" } : {}}
            transition={{ duration: 1 }}
          >
            Our Collection
          </motion.p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-foreground">
            Flavors That <span className="gradient-text">Delight</span>
          </h2>
        </motion.div>

        <motion.div
          className="mb-16 md:mb-20 rounded-3xl overflow-hidden shadow-2xl max-w-5xl mx-auto"
          style={{ scale: imageScale, y: imageY }}
        >
          <motion.img
            src={puddingVarieties}
            alt="Three varieties of Zesty"
            className="w-full object-cover"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 60, rotateY: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.15 }}
              whileHover={{
                y: -12,
                scale: 1.03,
                boxShadow: "0 25px 50px hsl(var(--glass-shadow))",
              }}
              className="glass-card-hover p-6 md:p-8 text-center group cursor-pointer relative overflow-hidden"
            >
              {/* Shimmer effect on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, hsl(var(--warm-gold) / 0.08) 45%, transparent 50%)",
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />

              <motion.span
                className="text-4xl block mb-4"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              >
                {product.emoji}
              </motion.span>

              <motion.span
                className="inline-block px-3 py-1 rounded-full text-xs font-body font-semibold bg-tropical-green-light text-tropical-green mb-4"
                whileInView={{ scale: [0, 1.1, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              >
                {product.tag}
              </motion.span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
                {product.name}
              </h3>
              <p className="text-muted-foreground font-body mb-6">
                {product.description}
              </p>
              <p className="text-3xl font-display font-bold gradient-text">
                {product.price}
              </p>
              <motion.button
                className="btn-primary w-full text-sm mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add to Cart
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
