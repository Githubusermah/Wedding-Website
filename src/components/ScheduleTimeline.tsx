"use client";

import { motion } from "motion/react";
import { Clock, Sparkle, Heart, ForkKnife, Cake, MusicNotes, Door } from "@phosphor-icons/react";

export default function ScheduleTimeline() {
  const scheduleEvents = [
    {
      time: "۰۶:۰۰ شام",
      title: "ورود و استقبال از مهمانان گرامی",
      description: "پذیرایی اولیه با نوشیدنی‌های گرم، چای و شیرینی در لابی تالار الماس",
      icon: <Door size={22} weight="duotone" className="text-[#8b1e2d]" />,
      highlight: false,
    },
    {
      time: "۰۷:۰۰ شب",
      title: "تلاوت کلام‌الله مجید و آغاز محفل",
      description: "آغاز رسمی برنامه با کلام خدای متعال و خوش‌آمدگویی خانواده‌های رضایی و همت",
      icon: <Sparkle size={22} weight="fill" className="text-[#5b7e53]" />,
      highlight: false,
    },
    {
      time: "۰۷:۳۰ شب",
      title: "مراسم مقدس عقد نکاح و آیین آئینه مصحف",
      description: "اجرای خطبه عقد و سنت دیرینه آئینه و مصحف با دعای خیر بزرگان",
      icon: <Heart size={22} weight="fill" className="text-[#8b1e2d]" />,
      highlight: true,
    },
    {
      time: "۰۸:۳۰ شب",
      title: "صرف شام شاهانه و بوفه مفصل",
      description: "پذیرایی شام شامل غذاهای اصیل افغانی (قابلی پلو، کباب، منتو، دسرها و میوه‌جات)",
      icon: <ForkKnife size={22} weight="duotone" className="text-[#5b7e53]" />,
      highlight: false,
    },
    {
      time: "۰۹:۳۰ شب",
      title: "کیک‌بری، اهداء تحایف و شادمانی",
      description: "مراسم بریدن کیک عروسی، عکس‌های یادگاری و ترانه‌های اصیل افغانی",
      icon: <Cake size={22} weight="duotone" className="text-[#8b1e2d]" />,
      highlight: false,
    },
    {
      time: "۱۰:۳۰ شب",
      title: "ختم محفل و بدرقه مهمانان عزیز",
      description: "سپاسگزاری از حضور گرم شما و بدرقه با صلوات بر محمد و آل محمد",
      icon: <MusicNotes size={22} weight="duotone" className="text-[#5b7e53]" />,
      highlight: false,
    },
  ];

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto" id="schedule-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-widest text-[#8b1e2d] uppercase bg-[#fdf0f2] px-4 py-1.5 rounded-full border border-[#8b1e2d]/20 shadow-xs">
          <Clock size={16} weight="bold" />
          برنامه زمان‌بندی مراسم
        </span>
        <h2 className="text-3xl md:text-5xl font-heading text-deep-red-gradient mt-3">
          جدول زمانی محفل عروسی
        </h2>
        <p className="text-[#4a5850] text-sm md:text-base mt-2 max-w-lg mx-auto">
          جهت هماهنگی بیشتر و بهره‌مندی از تمام لحظات شادمانی، برنامه‌ریزی زیر تنظیم شده است
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative border-r-2 border-[#c5a059]/40 mr-4 md:mr-8 space-y-8 pr-6 md:pr-10">
        {scheduleEvents.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="relative group"
          >
            {/* Timeline Bullet Node */}
            <div
              className={`absolute -right-[35px] md:-right-[51px] top-1.5 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-transform duration-300 group-hover:scale-110 shadow-md ${
                item.highlight
                  ? "bg-deep-red-gradient border-[#c5a059] text-white ring-4 ring-[#8b1e2d]/15"
                  : "bg-white border-[#5b7e53] text-[#5b7e53]"
              }`}
            >
              {item.icon}
            </div>

            {/* Event Card Content */}
            <div
              className={`rounded-2xl p-5 md:p-6 border transition-all duration-300 ${
                item.highlight
                  ? "glass-card-ruby border-[#8b1e2d]/30 shadow-lg"
                  : "glass-card border-[#c5a059]/25 hover:border-[#5b7e53]/40"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span
                  className={`text-xs md:text-sm font-bold px-3 py-1 rounded-full ${
                    item.highlight
                      ? "bg-[#8b1e2d] text-white"
                      : "bg-[#eef4ed] text-[#5b7e53] border border-[#5b7e53]/20"
                  }`}
                >
                  {item.time}
                </span>

                {item.highlight && (
                  <span className="text-xs text-[#8b1e2d] font-bold bg-white px-2.5 py-0.5 rounded-full border border-[#8b1e2d]/30">
                    مهم‌ترین لحظه محفل
                  </span>
                )}
              </div>

              <h3 className="text-xl md:text-2xl font-heading text-[#2c3831] mt-2">
                {item.title}
              </h3>

              <p className="text-xs md:text-sm text-[#4a5850] mt-1.5 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
