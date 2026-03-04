import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.92]);
  const blur = useTransform(scrollY, [0, 100], [0, 20]);
  const navRef = useRef(null);
  const [open, setOpen] = useState(false);

  const links = ["Products", "Ingredients", "Reviews", "Pricing"];

  return (
    <motion.nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 py-3 md:py-4"
      style={{
        backgroundColor: useTransform(
          bgOpacity,
          (v) => `hsl(100 30% 95% / ${v})`,
        ),
        backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.a
          href="#"
          className="text-lg md:text-xl font-display font-bold text-foreground"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          🥥 Zesty
        </motion.a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            >
              {link}
            </motion.a>
          ))}
          <motion.button
            className="btn-primary text-sm !px-5 !py-2.5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            Order Now
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <motion.button
                className="p-2 rounded-xl text-foreground hover:bg-muted transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] bg-background border-border"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-2 mt-8">
                {links.map((link, i) => (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="font-body text-lg text-foreground hover:text-tropical-green py-3 px-4 rounded-xl hover:bg-muted transition-all duration-300"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.08 }}
                  >
                    {link}
                  </motion.a>
                ))}
                <motion.button
                  className="btn-primary text-base mt-4 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  onClick={() => setOpen(false)}
                >
                  Order Now
                </motion.button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
