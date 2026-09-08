"use client";

import { motion } from "motion/react";
import { Camera, Image as ImageIcon } from "@phosphor-icons/react";

export default function GallerySection() {
  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      caption: "طراحی و دکوراسیون باشکوه تالار عروسی",
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      caption: "لحظات شیرین و ماندگار جشن پیوند",
    },
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      caption: "کیک و گل‌آرایی اختصاصی محفل",
    },
    {
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
      caption: "نورپردازی و فضای رؤیایی تالار الماس",
    },
  ];

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto" id="gallery-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-widest text-[#d4af37] uppercase bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/30">
          <Camera size={16} weight="bold" />
          گالری تصاویر محفل
        </span>
        <h2 className="text-3xl md:text-5xl font-heading text-gold-gradient mt-4">
          جلوه‌هایی از زیبایی و شکوه
        </h2>
        <p className="text-[#a0b0a8] text-sm md:text-base mt-2 max-w-xl mx-auto">
          نگاهی به فضای خاطره‌انگیز و مجلل قصر شام پاریس
        </p>
      </motion.div>

      {/* Grid of Stock Wedding Gallery Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {galleryImages.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            className="group glass-card rounded-2xl overflow-hidden border border-[#d4af37]/25 shadow-xl hover:border-[#d4af37]/60 transition-all duration-500"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out filter brightness-[0.9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09110d] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              <div className="absolute bottom-3 right-3 left-3 text-right">
                <span className="text-xs text-[#d4af37] font-semibold bg-[#09110d]/80 backdrop-blur-md px-3 py-1 rounded-lg border border-[#d4af37]/30 inline-block">
                  {item.caption}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
