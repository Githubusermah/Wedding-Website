"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function TropicalWindOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
    >
      {/* 1. Top-Left Tropical Corner Bouquet */}
      <motion.div
        animate={{
          rotate: [-1.5, 3.5, -2, 2.5, -1.5],
          x: [0, 8, -4, 6, 0],
          y: [0, -6, 4, -3, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-12 -left-12 w-48 sm:w-72 md:w-96 lg:w-[420px] aspect-square origin-top-left"
      >
        <Image
          src="/botanical/corner-tropical-main.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 192px, (max-width: 1024px) 288px, 420px"
          className="object-contain drop-shadow-[0_10px_20px_rgba(55,71,47,0.18)]"
        />
      </motion.div>

      {/* 2. Top-Right Tropical Corner Bouquet */}
      <motion.div
        animate={{
          rotate: [2, -3, 3, -2, 2],
          x: [0, -7, 5, -4, 0],
          y: [0, -5, 6, -2, 0],
        }}
        transition={{
          duration: 12.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="absolute -top-12 -right-12 w-48 sm:w-72 md:w-96 lg:w-[420px] aspect-square origin-top-right"
      >
        <Image
          src="/botanical/corner-tropical-tr.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 192px, (max-width: 1024px) 288px, 420px"
          className="object-contain drop-shadow-[0_10px_20px_rgba(55,71,47,0.18)]"
        />
      </motion.div>

      {/* 3. Mid-Left Vertical Tropical Cluster (Hides on tiny mobile, visible sm+) */}
      <motion.div
        animate={{
          rotate: [-3, 2.5, -3.5, 1.5, -3],
          x: [0, 10, -6, 8, 0],
          y: [0, 12, -8, 10, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="hidden sm:block absolute top-[35%] -left-14 w-32 md:w-48 lg:w-60 h-80 md:h-96 origin-left"
      >
        <Image
          src="/botanical/tropical-cluster-side.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 128px, 240px"
          className="object-contain opacity-90 drop-shadow-[0_8px_16px_rgba(55,71,47,0.15)]"
        />
      </motion.div>

      {/* 4. Mid-Right Vertical Foliage Accent */}
      <motion.div
        animate={{
          rotate: [2.5, -3, 2, -3.5, 2.5],
          x: [0, -9, 5, -7, 0],
          y: [0, -10, 8, -6, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
        className="hidden sm:block absolute top-[45%] -right-14 w-32 md:w-48 lg:w-60 h-80 md:h-96 origin-right"
      >
        <Image
          src="/botanical/corner-foliage-right.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 128px, 240px"
          className="object-contain opacity-90 drop-shadow-[0_8px_16px_rgba(55,71,47,0.15)]"
        />
      </motion.div>

      {/* 5. Bottom-Left Corner Tropical Foliage */}
      <motion.div
        animate={{
          rotate: [-2, 3, -1.5, 2.5, -2],
          x: [0, 6, -5, 4, 0],
          y: [0, 8, -6, 5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.1,
        }}
        className="absolute -bottom-10 -left-10 w-40 sm:w-64 md:w-80 lg:w-96 aspect-square origin-bottom-left"
      >
        <Image
          src="/botanical/corner-tropical-bl.webp"
          alt=""
          fill
          sizes="(max-width: 640px) 160px, (max-width: 1024px) 256px, 384px"
          className="object-contain opacity-95 drop-shadow-[0_10px_20px_rgba(55,71,47,0.18)]"
        />
      </motion.div>

      {/* 6. Bottom-Right Corner Tropical Foliage */}
      <motion.div
        animate={{
          rotate: [2.5, -3.5, 2, -2.5, 2.5],
          x: [0, -6, 7, -5, 0],
          y: [0, 6, -8, 4, 0],
        }}
        transition={{
          duration: 13.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
        className="absolute -bottom-10 -right-10 w-40 sm:w-64 md:w-80 lg:w-96 aspect-square origin-bottom-right"
      >
        <Image
          src="/botanical/corner-tropical-br.webp"
          alt=""
          fill
          sizes="(max-width: 640px) 160px, (max-width: 1024px) 256px, 384px"
          className="object-contain opacity-95 drop-shadow-[0_10px_20px_rgba(55,71,47,0.18)]"
        />
      </motion.div>

      {/* 7. Drifting Wind Leaf Accent 1 (Top left to bottom right breeze) */}
      <motion.div
        animate={{
          x: ["-10vw", "110vw"],
          y: ["10vh", "85vh"],
          rotate: [0, 540],
          scale: [0.8, 1.1, 0.9],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
        className="absolute top-0 left-0 w-12 sm:w-16 h-12 sm:h-16 opacity-75"
      >
        <Image
          src="/botanical/leaves-botanical-sway.webp"
          alt=""
          fill
          sizes="64px"
          className="object-contain filter drop-shadow-sm"
        />
      </motion.div>

      {/* 8. Drifting Tropical Flower Accent 2 (Right to Left breeze) */}
      <motion.div
        animate={{
          x: ["105vw", "-15vw"],
          y: ["30vh", "70vh"],
          rotate: [0, -360],
          scale: [0.7, 1, 0.8],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "linear",
          delay: 8,
        }}
        className="absolute top-0 right-0 w-14 sm:w-20 h-14 sm:h-20 opacity-70"
      >
        <Image
          src="/botanical/flowers-tropical-accent.webp"
          alt=""
          fill
          sizes="80px"
          className="object-contain filter drop-shadow-sm"
        />
      </motion.div>
    </div>
  );
}
