'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * Header — floating editorial navigation for a luxury bakery site.
 *
 * Single file, single default export, no external CSS. The small pieces
 * below (NavLink / OrderButton / Hamburger) are kept as plain functions at
 * module scope rather than nested inside Header() — nesting them would
 * redefine them on every scroll-driven re-render and force Framer Motion to
 * remount them constantly (breaking the active-link and hamburger
 * animations mid-flight). Everything still lives in this one file/component.
 */

const NAV_LEFT = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Our Story', href: '/our-story' },
];

const NAV_RIGHT = [
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

const MOBILE_LINKS = [...NAV_LEFT, ...NAV_RIGHT];

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Pinterest', href: 'https://pinterest.com' },
  { label: 'Email', href: 'mailto:hello@bakery.com' },
];

const EASE = [0.22, 1, 0.36, 1];

const FONT_DISPLAY = { fontFamily: "'Fraunces', Georgia, serif" };
const FONT_NAV = { fontFamily: "'Jost', 'Helvetica Neue', Arial, sans-serif" };

function NavLink({ href, label, pathname, reduceMotion }) {
  const active = pathname === href;
  return (
    <Link href={href} className="group relative">
      <motion.span
        whileHover={reduceMotion ? {} : { y: -2 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={FONT_NAV}
        className={`relative inline-block whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 sm:text-[14px] ${
          active ? 'text-[#3A2A1D]' : 'text-[#3A2A1D]/65 group-hover:text-[#3A2A1D]'
        }`}
      >
        {active && (
          <motion.span
            layoutId="activeCapsule"
            className="absolute inset-0 -z-10 rounded-full bg-[#F3EAD9] shadow-[0_2px_10px_rgba(58,42,29,0.14)]"
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          />
        )}
        <span className="relative z-10">{label}</span>
        <span className="pointer-events-none absolute left-1/2 -bottom-0.5 h-[1.5px] w-0 -translate-x-1/2 bg-[#3A2A1D] transition-all duration-300 ease-out group-hover:w-[60%]" />
      </motion.span>
    </Link>
  );
}

function OrderButton() {
  return (
    <Link href="/order">
      <motion.span
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileTap={{ scale: 0.97 }}
        variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        style={FONT_NAV}
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#3A2A1D] py-3 pl-6 pr-5 text-[13px] font-medium uppercase tracking-[0.15em] text-[#F8F4EC] shadow-[0_6px_18px_rgba(42,29,20,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A2A1D]/50"
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-[#2A1D14]"
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.3 }}
        />
        <span className="relative z-10">Order Now</span>
        <motion.span
          className="relative z-10 inline-flex"
          variants={{ rest: { x: 0 }, hover: { x: 4 } }}
          transition={{ type: 'spring', stiffness: 320, damping: 20 }}
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
            <path
              d="M4 10h12M11 5l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </motion.span>
    </Link>
  );
}

function Hamburger({ menuOpen, setMenuOpen }) {
  return (
    <button
      type="button"
      aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={menuOpen}
      onClick={() => setMenuOpen((v) => !v)}
      className="flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 hover:bg-[#3A2A1D]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A2A1D]/40"
    >
      <span className="relative flex h-[14px] w-6 flex-col items-center justify-between">
        <motion.span
          className="block h-[1.5px] w-full rounded-full bg-[#3A2A1D]"
          animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        />
        <motion.span
          className="block h-[1.5px] w-full rounded-full bg-[#3A2A1D]"
          animate={{ opacity: menuOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block h-[1.5px] w-full rounded-full bg-[#3A2A1D]"
          animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        />
      </span>
    </button>
  );
}

export default function Header() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  // Load the two typefaces once, without needing a separate font file.
  useEffect(() => {
    const id = 'bakery-header-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@400;500;600&display=swap';
    document.head.appendChild(link);
  }, []);

  // Scroll: nudges the pill toward opaque, and hides/reveals the header.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > lastScrollY.current && y > 120);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: Escape to close, lock page scroll while open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: hidden && !menuOpen ? '-110%' : '0%' }}
        transition={{
          opacity: { duration: 0.6, ease: 'easeOut' },
          y: { type: 'spring', stiffness: 260, damping: 30 },
        }}
        className="fixed inset-x-0 top-5 z-[60] px-4 sm:px-6"
      >
        <motion.nav
          animate={{
            y: reduceMotion ? 0 : [0, -2, 0],
            backgroundColor: scrolled ? 'rgba(248,244,236,0.88)' : 'rgba(248,244,236,0.65)',
            borderColor: scrolled ? 'rgba(58,42,29,0.18)' : 'rgba(58,42,29,0.08)',
            boxShadow: scrolled
              ? '0 16px 44px rgba(42,29,20,0.16)'
              : '0 6px 22px rgba(42,29,20,0.07)',
          }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            backgroundColor: { duration: 0.4, ease: 'easeOut' },
            borderColor: { duration: 0.4, ease: 'easeOut' },
            boxShadow: { duration: 0.4, ease: 'easeOut' },
          }}
          style={{ backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)' }}
          className="relative mx-auto flex h-[82px] max-w-[1500px] items-center justify-between rounded-full border px-5 sm:px-8 lg:px-10"
        >
          {/* Left group */}
          <div className="hidden items-center gap-8 md:flex lg:gap-11">
            {NAV_LEFT.map((l) => (
              <NavLink key={l.href} {...l} pathname={pathname} reduceMotion={reduceMotion} />
            ))}
          </div>

          {/* Right group */}
          <div className="hidden items-center gap-8 md:flex lg:gap-11">
            {NAV_RIGHT.map((l) => (
              <NavLink key={l.href} {...l} pathname={pathname} reduceMotion={reduceMotion} />
            ))}
            <OrderButton />
          </div>

          {/* Mobile trigger */}
          <div className="ml-auto flex items-center md:hidden">
            <Hamburger menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>

          {/* Centered logo — absolutely positioned so it never shifts */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <Link href="/" aria-label="Home" className="pointer-events-auto">
              <motion.img
                src="https://mrday.it/wp-content/themes/mrday/assets/images/logo.png"
                alt="Bakery logo"
                draggable={false}
                whileHover={reduceMotion ? {} : { scale: 1.03, rotate: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="h-10 w-auto select-none sm:h-12 md:h-[52px]"
              />
            </Link>
          </div>
        </motion.nav>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-40 bg-[#2A1D14]/25 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              key="panel"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ opacity: 0, y: -28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="fixed left-1/2 top-[104px] z-50 w-[calc(100%-2.5rem)] max-w-[540px] -translate-x-1/2 rounded-[40px] bg-[#FAF6EE] p-8 shadow-[0_30px_80px_rgba(42,29,20,0.28)] sm:top-[112px] sm:p-10"
            >
              <motion.nav
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
                className="flex flex-col gap-1"
              >
                {MOBILE_LINKS.map((link) => (
                  <motion.div
                    key={link.href}
                    variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <Link href={link.href} onClick={() => setMenuOpen(false)} className="group inline-flex">
                      <motion.span
                        whileHover={reduceMotion ? {} : { x: 10, rotate: -1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        style={FONT_DISPLAY}
                        className="relative inline-block py-1.5 text-[42px] leading-[1.05] text-[#3A2A1D]/75 transition-colors duration-300 group-hover:text-[#3A2A1D] sm:text-[54px]"
                      >
                        {link.label}
                        <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-0 bg-[#B98859] transition-all duration-300 ease-out group-hover:w-full" />
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}

                {/* Order Now — kept reachable on mobile even without a persistent desktop CTA */}
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="mt-3"
                >
                  <Link
                    href="/order"
                    onClick={() => setMenuOpen(false)}
                    className="group inline-flex items-baseline gap-3"
                  >
                    <motion.span
                      whileHover={reduceMotion ? {} : { x: 10, rotate: -1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      style={FONT_DISPLAY}
                      className="relative inline-block py-1.5 text-[42px] italic leading-[1.05] text-[#8A5A32] transition-colors duration-300 group-hover:text-[#3A2A1D] sm:text-[54px]"
                    >
                      Order Now
                      <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-0 bg-[#B98859] transition-all duration-300 ease-out group-hover:w-full" />
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.nav>

              <div className="mt-9 flex items-center gap-5 border-t border-[#3A2A1D]/10 pt-6" style={FONT_NAV}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="text-[11px] uppercase tracking-[0.15em] text-[#3A2A1D]/45 transition-colors duration-300 hover:text-[#3A2A1D]"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
