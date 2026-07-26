"use client";

import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
];

export default function CafeStorySection() {
  return (
    <section className="overflow-hidden bg-[#F5EBDD] py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
        >
          <span className="mb-5 inline-block rounded-full bg-[#E8D9C2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#8D5A2B]">
            Our Story
          </span>

          <h2 className="font-serif text-[58px] leading-[0.9] tracking-[-0.05em] text-[#23150C] sm:text-[70px] lg:text-[92px]">
            There's
            <br />
            Room
            <br />
            to Sip
          </h2>

          <p className="mt-10 max-w-xl text-lg leading-9 text-[#5F4633]">
            We wanted a space perfect for intimate conversations,
            celebrations, or simply slowing down with a great cup of coffee.
            Every corner has been designed to feel warm, welcoming, and filled
            with natural light.
          </p>

          <p className="mt-8 max-w-xl text-lg leading-9 text-[#5F4633]">
            Whether you're meeting friends, reading your favorite book,
            working quietly, or enjoying handcrafted pastries, there's always
            a comfortable place waiting for you.
          </p>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .9 }}
          viewport={{ once: true }}
          className="relative mx-auto h-[430px] w-full max-w-[620px] sm:h-[520px] lg:h-[620px]"
        >

          {/* Back Image */}

          <motion.img
            whileHover={{
              rotate: -6,
              scale: 1.03,
            }}
            transition={{ duration: .35 }}
            src={images[0]}
            alt=""
            className="absolute right-12 top-0 h-[78%] w-[74%] rounded-[34px] object-cover shadow-[0_30px_80px_rgba(0,0,0,.22)] rotate-[-8deg]"
          />

          {/* Middle */}

          <motion.img
            whileHover={{
              rotate: 3,
              scale: 1.03,
            }}
            transition={{ duration: .35 }}
            src={images[1]}
            alt=""
            className="absolute left-0 top-16 h-[78%] w-[72%] rounded-[34px] object-cover shadow-[0_30px_80px_rgba(0,0,0,.22)] rotate-[5deg]"
          />

          {/* Front */}

          <motion.img
            whileHover={{
              rotate: 0,
              scale: 1.04,
            }}
            transition={{ duration: .35 }}
            src={images[2]}
            alt=""
            className="absolute bottom-0 right-4 h-[82%] w-[82%] rounded-[34px] object-cover shadow-[0_35px_90px_rgba(0,0,0,.28)] rotate-[-2deg]"
          />

        </motion.div>

      </div>
    </section>
  );
}