import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const socialIcons = [
  { name: "Instagram", emoji: "📸" },
  { name: "Twitter", emoji: "🐦" },
  { name: "Facebook", emoji: "📘" },
  { name: "TikTok", emoji: "🎵" },
];

const footerLinks = [
  { title: "Products", links: ["Classic", "Mango", "Chocolate", "Seasonal"] },
  { title: "Company", links: ["About Us", "Careers", "Press", "Blog"] },
  { title: "Support", links: ["Contact", "FAQ", "Shipping", "Returns"] },
];

const TypewriterCopyright = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const text = "© 2026 Zesty Co. All rights reserved.";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <p
      ref={ref}
      className="text-coconut-light/60 font-body text-sm text-center mt-12 pt-8 border-t border-coconut-light/10"
    >
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        |
      </motion.span>
    </p>
  );
};

const FooterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "hsl(140 25% 12%)" }}
    >
      {/* Wave divider */}
      <svg
        className="w-full -mb-1"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,0 L0,0 Z"
          fill="hsl(var(--background))"
          initial={{
            d: "M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,0 L0,0 Z",
          }}
          animate={{
            d: [
              "M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,0 L0,0 Z",
              "M0,30 C360,0 720,80 1080,30 C1260,10 1380,50 1440,30 L1440,0 L0,0 Z",
              "M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,0 L0,0 Z",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <div className="section-padding pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-display font-bold text-cream mb-2">
                🥥 Zesty Co.
              </h3>
              <p className="text-coconut-light/60 font-body max-w-xs">
                Crafting tropical happiness, one pudding at a time.
              </p>

              <div className="flex gap-3 mt-6">
                {socialIcons.map((icon, i) => (
                  <motion.a
                    key={icon.name}
                    href="#"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: [20, -5, 0] } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    whileHover={{ scale: 1.2, y: -3, rotate: [0, -10, 10, 0] }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                    style={{ background: "hsl(140 20% 20%)" }}
                    title={icon.name}
                  >
                    {icon.emoji}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12">
              {footerLinks.map((column, ci) => (
                <div key={column.title}>
                  <motion.h4
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + ci * 0.1 }}
                    className="font-display font-semibold text-cream mb-4"
                  >
                    {column.title}
                  </motion.h4>
                  <ul className="space-y-2">
                    {column.links.map((link, li) => (
                      <motion.li
                        key={link}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: 0.4 + ci * 0.1 + li * 0.06,
                        }}
                      >
                        <a
                          href="#"
                          className="text-coconut-light/50 font-body text-sm hover:text-warm-gold transition-colors duration-300"
                        >
                          {link}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <TypewriterCopyright />
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
