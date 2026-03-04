import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import coconutPudding from "@/assets/coconut-pudding.jpg";
import ParticleField from "./ParticleField";

const heroWords = ["Creamy.", "Tropical.", "Irresistible."];

const TypewriterText = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = heroWords[currentWord];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentChar < word.length) {
            setCurrentChar((c) => c + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (currentChar > 0) {
            setCurrentChar((c) => c - 1);
          } else {
            setIsDeleting(false);
            setCurrentWord((w) => (w + 1) % heroWords.length);
          }
        }
      },
      isDeleting ? 50 : 100,
    );
    return () => clearTimeout(timeout);
  }, [currentChar, isDeleting, currentWord]);

  return (
    <span className="gradient-text-tropical">
      {heroWords[currentWord].slice(0, currentChar)}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="text-tropical-green"
      >
        |
      </motion.span>
    </span>
  );
};

const FloatingLeaf = ({
  delay,
  x,
  y,
  size,
}: {
  delay: number;
  x: string;
  y: string;
  size: number;
}) => (
  <motion.div
    className="absolute pointer-events-none opacity-20"
    style={{ left: x, top: y, fontSize: size }}
    animate={{
      y: [-15, 15, -15],
      x: [-8, 8, -8],
      rotate: [-10, 10, -10],
    }}
    transition={{
      duration: 6 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    🌿
  </motion.div>
);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Animated gradient background with parallax scale */}
      <motion.div
        className="absolute inset-0 morph-gradient"
        style={{
          background: "var(--gradient-green-hero)",
          backgroundSize: "400% 400%",
          scale: bgScale,
        }}
      />

      {/* Particle field */}
      <ParticleField count={25} />

      {/* Floating leaves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingLeaf delay={0} x="5%" y="20%" size={32} />
        <FloatingLeaf delay={1.5} x="85%" y="15%" size={28} />
        <FloatingLeaf delay={0.8} x="70%" y="70%" size={24} />
        <FloatingLeaf delay={2} x="15%" y="75%" size={20} />
        <FloatingLeaf delay={1} x="50%" y="10%" size={26} />

        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full"
          style={{ background: "hsl(120 40% 70% / 0.15)" }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full"
          style={{ background: "hsl(100 35% 65% / 0.12)" }}
          animate={{
            y: [20, -20, 20],
            x: [10, -10, 10],
            scale: [1.05, 1, 1.05],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 section-padding w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Text content with parallax */}
        <motion.div className="space-y-6 md:space-y-8" style={{ y: textY }}>
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs md:text-sm font-body font-semibold tracking-[0.2em] uppercase text-tropical-green"
          >
            🌴 Handcrafted Tropical Desserts
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] text-foreground"
          >
            {/* Staggered letter reveal for "Coconut" */}
            <span className="inline-block overflow-hidden">
              {"Coconut".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: 80, rotateX: 90 }}
                  animate={{ y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + i * 0.05,
                    ease: "easeOut",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
            <br />
            <span className="inline-block overflow-hidden">
              {"Pudding".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: 80, rotateX: 90 }}
                  animate={{ y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.85 + i * 0.05,
                    ease: "easeOut",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
            <br />
            <TypewriterText />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-base md:text-xl text-muted-foreground max-w-md leading-relaxed"
          >
            Indulge in the silky smoothness of our artisan Zesty, crafted with
            the finest tropical ingredients.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              className="btn-primary pulse-glow text-base md:text-lg"
              whileHover={{
                scale: 1.08,
                boxShadow: "0 15px 40px hsl(25 45% 30% / 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Order Now
            </motion.button>
            <motion.button
              className="btn-secondary text-base md:text-lg"
              whileHover={{
                scale: 1.08,
                boxShadow: "0 15px 40px hsl(140 35% 40% / 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Flavors
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero image with parallax + tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="relative flex justify-center"
          style={{ y: imageY }}
        >
          <div className="floating relative">
            <motion.div
              className="absolute -inset-4 rounded-full blur-3xl"
              style={{ background: "hsl(120 40% 70% / 0.25)" }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Orbit ring */}
            <motion.div
              className="absolute inset-[-20px] rounded-full border-2 border-dashed border-tropical-green/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-[-40px] rounded-full border border-dashed border-warm-gold/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.img
              src={coconutPudding}
              alt="Delicious Zesty in a glass cup"
              className="relative z-10 w-64 sm:w-80 md:w-[420px] rounded-3xl shadow-2xl"
              style={{ rotate: imageRotate }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            {/* Floating badge */}
            <motion.div
              className="absolute -right-4 top-8 z-20 glass-card px-4 py-2 text-sm font-body font-semibold text-foreground"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⭐
              </motion.span>{" "}
              4.9 Rating
            </motion.div>
            <motion.div
              className="absolute -left-4 bottom-12 z-20 glass-card px-4 py-2 text-sm font-body font-semibold text-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              🥥 100% Natural
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-tropical-green/40 flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-tropical-green"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
