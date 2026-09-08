"use client";

import { motion } from "motion/react";
import { TShirt, Car, Camera, MapPin, Heart, Info, CheckCircle } from "@phosphor-icons/react";

export default function GuestGuide() {
  const guideItems = [
    {
      title: "کد پوشش و لباس (Dress Code)",
      icon: <TShirt size={28} weight="duotone" className="text-[#8b1e2d]" />,
      color: "border-[#8b1e2d]/30 bg-[#fdf8f5]",
      description: "لباس رسمی، دریشی یا پیراهن تنبان افغانی فاخر / لباس‌های مجلسی شیک با رنگ‌های ملایم، زمردی، طلایی یا عنابی",
      tips: [
        "پوشیدن لباس با رنگ‌های روشن و فاخر توصیه می‌شود",
        "امکانات رختکن و تبدیل لباس با پرسونل مخصوص مهیا است"
      ]
    },
    {
      title: "پارکنیگ اختصاصی و وسایل نقلیه",
      icon: <Car size={28} weight="duotone" className="text-[#5b7e53]" />,
      color: "border-[#5b7e53]/30 bg-[#f4f8f4]",
      description: "پارکنیگ سرپوشیده و مصون هتل با ظرفیت ۲۰۰ عراده موتر همراه با نگهبانان آموزش دیده و پارک‌بان اختصاصی",
      tips: [
        "ورودی پارکینگ از ضلع غربی هتل کابل استار می‌باشد",
        "خدمات پارک‌بان (Valet Parking) به طور رایگان آماده خدمات است"
      ]
    },
    {
      title: "عکاسی و ثبت خاطرات",
      icon: <Camera size={28} weight="duotone" className="text-[#c5a059]" />,
      color: "border-[#c5a059]/30 bg-[#fcfaf5]",
      description: "امکان عکاسی در غرفه‌ها و دکورهای گل‌آرایی شده سالن هم در بخش زنانه و هم مردانه فراهم شده است",
      tips: [
        "لطفاً در بخش بانوان احترام به حریم خصوصی مهمانان رعایت گردد",
        "هشتگ رسمی اینستاگرام محفل: #FarhadAndSahar"
      ]
    },
    {
      title: "آدرس دقیق و مسیرها",
      icon: <MapPin size={28} weight="duotone" className="text-[#8b1e2d]" />,
      color: "border-[#8b1e2d]/30 bg-[#fdf0f2]",
      description: "کابل، شهرنو، سرک دوم، هتل ۵ ستاره کابل استار - سالن مجلل الماس (طبقه دوم)",
      tips: [
        "جهت مسیریابی آسان می‌توانید از نقشه انلاین در انتهای صفحه استفاده نمایید",
        "تیم تشریفات از ساعت ۰۵:۳۰ عصر آماده پذیرایی می‌باشد"
      ]
    }
  ];

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto" id="guest-guide">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-widest text-[#5b7e53] uppercase bg-[#eef4ed] px-4 py-1.5 rounded-full border border-[#5b7e53]/20">
          <Info size={16} weight="bold" />
          راهنمای مهمانان گرامی
        </span>
        <h2 className="text-3xl md:text-5xl font-heading text-[#8b1e2d] mt-3">
          اطلاعات و توصیه‌های مهم برای حضور در محفل
        </h2>
        <p className="text-[#4a5850] text-sm md:text-base mt-2 max-w-xl mx-auto">
          برای تجربه هرچه راحت‌تر و لذت‌بخش‌تر شما عزیزان، نکاتی چند جهت سهولت حضور ارائه می‌گردد
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guideItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className={`rounded-2xl p-6 border shadow-xs hover:shadow-md transition-all duration-300 ${item.color}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white rounded-xl shadow-xs border border-stone-200/60">
                {item.icon}
              </div>
              <h3 className="text-lg md:text-xl font-heading text-[#2c3831]">
                {item.title}
              </h3>
            </div>

            <p className="text-sm text-[#38453d] font-medium leading-relaxed mb-4">
              {item.description}
            </p>

            <ul className="space-y-2 border-t border-stone-200/80 pt-3">
              {item.tips.map((tip, tIdx) => (
                <li key={tIdx} className="flex items-start gap-2 text-xs md:text-sm text-[#526358]">
                  <CheckCircle size={16} weight="fill" className="text-[#5b7e53] shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Warm Hospitality Note */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-10 rounded-2xl p-6 text-center border border-[#c5a059]/40 bg-gradient-to-r from-[#faf5eb] via-white to-[#faf5eb] shadow-sm max-w-3xl mx-auto"
      >
        <Heart size={32} weight="fill" className="text-[#8b1e2d] mx-auto mb-2 animate-bounce" />
        <h4 className="text-lg font-heading text-[#8b1e2d]">
          حضور شما، زیباترین هدیه برای آغاز زندگی مشترک ماست
        </h4>
        <p className="text-xs md:text-sm text-[#526358] mt-1">
          در صورت داشتن هرگونه سوال یا نیاز به هماهنگی بیشتر، می‌توانید با شماره تشریفات ۰۰۹۳۷۹۹۱۲۳۴۵۶ در تماس باشید.
        </p>
      </motion.div>
    </section>
  );
}
