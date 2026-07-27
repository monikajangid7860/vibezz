"use client";

import { motion, AnimatePresence } from "framer-motion";

const transition = {
  duration: 0.55,
  ease: [0.4, 0, 0.2, 1],
};

function PanelContent({ panel, active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={panel.id}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{
            duration: 0.35,
            delay: 0.2,
          }}
          className="flex h-full flex-col justify-between p-10"
        >
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-black/60">
              {panel.subtitle}
            </p>

            <h2 className="text-5xl font-bold leading-none">
              {panel.heading}
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-7 text-black/70">
              {panel.description}
            </p>
          </div>

          <h1 className="text-right text-[140px] font-black leading-none opacity-90">
            {panel.number}
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DesktopPanel({
  panel,
  isActive,
  onActivate,
}) {
  return (
    <motion.article
      layout
      transition={transition}
      animate={{
        width: isActive ? "48%" : "6%",
      }}
      className="relative h-full overflow-hidden rounded-3xl"
      style={{
        background: panel.color,
      }}
      onMouseEnter={onActivate}
    >
      {/* Invisible Button */}
      <button
        aria-expanded={isActive}
        className="absolute inset-0 z-20"
      />

      {/* Vertical Title */}
      <motion.div
        className="absolute left-1/2 top-8 z-10 -translate-x-1/2"
        animate={{
          opacity: isActive ? 0 : 1,
          y: isActive ? -20 : 0,
        }}
        transition={{
          duration: 0.35,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <p className="[writing-mode:vertical-rl] rotate-180 text-xs font-bold uppercase tracking-[0.25em] text-black/70">
          {panel.title}
        </p>
      </motion.div>

      {/* Number when collapsed */}
      {!isActive && (
        <motion.div
          layout
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <h1 className="text-4xl font-black">
            {panel.number}
          </h1>
        </motion.div>
      )}

      {/* Expanded Content */}
      <div className="ml-[80px] h-full">
        <PanelContent
          panel={panel}
          active={isActive}
        />
      </div>
    </motion.article>
  );
}

export function MobilePanel({
  panel,
  isActive,
  onActivate,
}) {
  return (
    <article
      className="overflow-hidden rounded-2xl"
      style={{
        background: panel.color,
      }}
    >
      <button
        onClick={onActivate}
        className="flex w-full items-center justify-between p-3 text-left"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.22em]">
            {panel.number}
          </p>

          <h2 className="mt-1 text-sm font-bold">
            {panel.heading}
          </h2>
        </div>

        <span className="text-xl">
          {isActive ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={transition}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                delay: 0.15,
              }}
              className="px-6 pb-6"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-black/60">
                {panel.subtitle}
              </p>

              <p className="mt-4 text-sm leading-7 text-black/70">
                {panel.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}