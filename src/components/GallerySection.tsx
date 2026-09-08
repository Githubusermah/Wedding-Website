"use client";

import { motion } from "motion/react";
import { Camera, FlowerTulip, Heart } from "@phosphor-icons/react";

export default function GallerySection() {
  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      title: "طراحی و گل‌آرایی اختصاصی",
      tag: "دکوراسیون تالار",
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      title: "لحظات شیرین و ماندگار پیوند",
      tag: "خاطرات خاطره‌انگیز",
    },
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      title: "کیک چندطبقه و شادمانی",
      tag: "پذیرایی شاهانه",
    },
    {
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
      title: "نورپردازی و فای محیطی تالار",
      tag: "فضای رؤیایی",
    },
    {
      url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80",
      title: "جایگاه عقد و سفره آئینه و مصحف",
      tag: "سنت‌های اصیل",
    },
    {
      url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
      title: "دسته گل‌های طبیعی و پپشواز",
      tag: "گل‌آرایی پستاگی",
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
        <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-widest text-[#5b7e53] uppercase bg-[#eef4ed] px-4 py-1.5 rounded-full border border-[#5b7e53]/20 shadow-xs">
          <Camera size={16} weight="bold" />
          گالری تصاویر محفل
        </span>
        <h2 className="text-3xl md:text-5xl font-heading text-deep-red-gradient mt-3">
          جلوه‌هایی از زیبایی و شکوه
        </h2>
        <p className="text-[#4a5850] text-sm md:text-base mt-2 max-w-xl mx-auto">
          نگاهی به فضای خاطره‌انگیز، گل‌آرایی زنده و دکوراسیون مجلل جشن پیوند ما
        </p>
      </motion.div>

      {/* Grid of Gallery Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="group glass-card rounded-3xl overflow-hidden border border-[#c5a059]/30 shadow-md hover:shadow-xl hover:border-[#5b7e53]/50 transition-all duration-500"
          >
            <div className="relative h-72 overflow-hidden">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              <div className="absolute top-3 right-3">
                <span className="text-[11px] text-[#5b7e53] font-bold bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-xs border border-[#5b7e53]/20 flex items-center gap-1">
                  <FlowerTulip size={13} weight="fill" className="text-[#5b7e53]" />
                  {item.tag}
                </span>
              </div>

              <div className="absolute bottom-4 right-4 left-4 text-right">
                <h4 className="text-sm font-heading text-white drop-shadow-md flex items-center gap-2">
                  <Heart size={16} weight="fill" className="text-[#8b1e2d] shrink-0" />
                  {item.title}
                </h4>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
