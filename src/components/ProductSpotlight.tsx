import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import puddingRaw from "@/assets/pudding-raw.jpeg";
import puddingCup from "@/assets/pudding-cup.png";
import zestyCup from "@/assets/zesty-cup.jpeg";

const spotlightProducts = [
  {
    image: puddingRaw,
    title: "Classic Daber Pudding",
    subtitle: "প্রকৃতির মিষ্টি স্বাদ এক চামচেই তৃপ্তি!",
    description:
      "Our signature coconut pudding made with fresh green coconut water and tender coconut pulp. Served chilled in a premium sealed cup.",
    tags: ["BSTI Certified", "Halal", "No Preservatives"],
    price: "৳120",
    color: "hsl(120 30% 90%)",
  },
  {
    image: puddingCup,
    title: "Zesty Premium Cup",
    subtitle: "The Original Coconut Experience",
    description:
      "Hand-crafted with agar powder, fresh milk, and real coconut — the perfect balance of sweetness and tropical freshness.",
    tags: ["Bestseller", "100% Natural", "Chilled"],
    price: "৳150",
    color: "hsl(140 35% 88%)",
  },
  {
    image: zestyCup,
    title: "Party Pack Cup",
    subtitle: "Perfect for Events & Gatherings",
    description:
      "Our larger portion size ideal for family events, corporate gatherings, and celebrations. Same premium quality, bigger joy.",
    tags: ["Bulk Orders", "Free Delivery", "Family Size"],
    price: "৳200",
    color: "hsl(100 30% 92%)",
  },
];

const ProductSpotlight = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden py-20 md:py-32"
    >
      {/* Animated background blobs */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
          style={{
            background: spotlightProducts[activeIndex].color,
            left: "10%",
            top: "20%",
          }}
          animate={{ scale: [1, 1.2, 1], x: [-20, 20, -20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-20"
          style={{ background: "hsl(140 40% 70%)", right: "5%", bottom: "10%" }}
          animate={{ scale: [1.1, 1, 1.1], y: [-30, 30, -30] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-5 py-2 rounded-full text-xs font-body font-bold tracking-widest uppercase mb-6"
            style={{
              background: "hsl(var(--accent))",
              color: "hsl(var(--accent-foreground))",
            }}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
          >
            ✨ Product Spotlight
          </motion.span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-foreground">
            Explore Our{" "}
            <span className="gradient-text-tropical">Collection</span>
          </h2>
        </motion.div>

        {/* Product selector tabs */}
        <div className="flex justify-center gap-3 mb-12">
          {spotlightProducts.map((p, i) => (
            <motion.button
              key={p.title}
              onClick={() => setActiveIndex(i)}
              className={`px-4 py-2 rounded-full text-sm font-body font-semibold transition-all duration-300 ${
                activeIndex === i
                  ? "text-primary-foreground shadow-lg"
                  : "bg-card text-muted-foreground hover:bg-accent"
              }`}
              style={
                activeIndex === i
                  ? { background: "var(--gradient-tropical)" }
                  : {}
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              {p.title.split(" – ")[0]}
            </motion.button>
          ))}
        </div>

        {/* Active product display */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image side */}
          <motion.div className="relative flex justify-center">
            <motion.div
              className="absolute -inset-8 rounded-full blur-3xl opacity-25"
              style={{ background: spotlightProducts[activeIndex].color }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {/* Rotating ring */}
            <motion.div
              className="absolute inset-[-30px] rounded-full border-2 border-dashed"
              style={{ borderColor: "hsl(var(--tropical-green) / 0.2)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <motion.img
              src={spotlightProducts[activeIndex].image}
              alt={spotlightProducts[activeIndex].title}
              className="relative z-10 w-72 md:w-96 rounded-3xl shadow-2xl"
              initial={{ scale: 0.8, rotateY: -15 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
            />
            {/* Price badge */}
            <motion.div
              className="absolute top-4 right-4 md:right-8 z-20 glass-card px-5 py-3 rounded-2xl"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <span className="text-2xl font-display font-bold text-foreground">
                {spotlightProducts[activeIndex].price}
              </span>
            </motion.div>
          </motion.div>

          {/* Details side */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-display font-bold text-foreground"
            >
              {spotlightProducts[activeIndex].title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-body text-tropical-green font-semibold"
            >
              {spotlightProducts[activeIndex].subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground font-body text-base md:text-lg leading-relaxed"
            >
              {spotlightProducts[activeIndex].description}
            </motion.p>

            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {spotlightProducts[activeIndex].tags.map((tag, ti) => (
                <motion.span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-xs font-body font-bold border"
                  style={{
                    borderColor: "hsl(var(--tropical-green) / 0.3)",
                    color: "hsl(var(--tropical-green))",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + ti * 0.1, type: "spring" }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="btn-primary text-lg mt-4"
              whileHover={{
                scale: 1.08,
                boxShadow: "0 20px 50px hsl(140 35% 40% / 0.35)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Order This 🥥
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSpotlight;
