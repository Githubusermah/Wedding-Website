"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChatCircle, PaperPlaneTilt, Heart, Sparkle, UserCheck } from "@phosphor-icons/react";

interface Wish {
  id: number;
  name: string;
  relation: string;
  message: string;
  date: string;
  likes: number;
  liked?: boolean;
}

const initialWishes: Wish[] = [
  {
    id: 1,
    name: "احمد شکیب و فامیلی",
    relation: "دوست دیرینه داماد",
    message: "فرهاد جان و سحر خانم عزیز! پیوندتان مبارک باد. امیدوارم سالیان سال در کنار هم با عزت، محبت و خوشبختی زندگی کنید. مبارک باشد! 🌸💍",
    date: "۲ ساعت پیش",
    likes: 12,
  },
  {
    id: 2,
    name: "مریم رضایی",
    relation: "خاله عروس",
    message: "سحر نازنینم، دیدن خنده‌ها و خوشبختی تو بزرگترین آرزوی ما بود. شاهی و عروسی‌تان مبارک و قدم‌تان خجسته باد! ❤️✨",
    date: "۵ ساعت پیش",
    likes: 18,
  },
  {
    id: 3,
    name: "استاد همایون افغان",
    relation: "فامیل و همکار",
    message: "با صمیمانه‌ترین درودها، شادباش بنده را به مناسبت این آغاز فرخنده بپذیرید. زندگی‌تان پر از برکت و محبت پایدار.",
    date: "دیروز",
    likes: 9,
  },
  {
    id: 4,
    name: "زهرا و امید",
    relation: "همکلاسی‌های پوهنتون",
    message: "چقدر خوشحال شدیم از شنیدن این خبر نیک! ان‌شاءالله خانه دل‌تان همواره آباد و پر از شور و نشاط باشد. مبارک باشه!",
    date: "دیروز",
    likes: 15,
  },
];

export default function WishesWall() {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWishItem: Wish = {
      id: Date.now(),
      name: name.trim(),
      relation: relation.trim() || "مهمان گرامی",
      message: message.trim(),
      date: "همین الان",
      likes: 1,
      liked: true,
    };

    setWishes([newWishItem, ...wishes]);
    setName("");
    setRelation("");
    setMessage("");
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  const handleToggleLike = (id: number) => {
    setWishes((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isLiked = item.liked;
          return {
            ...item,
            liked: !isLiked,
            likes: isLiked ? item.likes - 1 : item.likes + 1,
          };
        }
        return item;
      })
    );
  };

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto" id="wishes-wall">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-widest text-[#8b1e2d] uppercase bg-[#fdf0f2] px-4 py-1.5 rounded-full border border-[#8b1e2d]/20">
          <ChatCircle size={16} weight="bold" />
          دیوار تبریکات و یادگاری‌ها
        </span>
        <h2 className="text-3xl md:text-5xl font-heading text-deep-red-gradient mt-3">
          پیام‌های محبت‌آمیز مهمانان
        </h2>
        <p className="text-[#4a5850] text-sm md:text-base mt-2 max-w-lg mx-auto">
          آرزوهای قشنگ و آرزوی خوشبختی خود را برای عروس و داماد به یادگار بنویسید
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form to leave a wish */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 glass-card border-[#c5a059]/30 p-6 md:p-8 rounded-3xl shadow-lg relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#5b7e53]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-2 text-[#8b1e2d] font-heading text-xl mb-4">
            <Sparkle size={22} weight="fill" />
            <h3>ارسال پیام تبریک</h3>
          </div>

          <form onSubmit={handleAddWish} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#38453d] mb-1.5">
                نام و تخلص شما <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثلا: احمد شکیب"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#8b1e2d] focus:ring-2 focus:ring-[#8b1e2d]/20 outline-hidden text-sm transition bg-white/80"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#38453d] mb-1.5">
                نسبت با عروس یا داماد (اختیاری)
              </label>
              <input
                type="text"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                placeholder="مثلا: دوست دیرینه، همکار، خاله..."
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#8b1e2d] focus:ring-2 focus:ring-[#8b1e2d]/20 outline-hidden text-sm transition bg-white/80"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#38453d] mb-1.5">
                متن آرزو و تبریک شما <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="پیام زیبایتان را بنویسید..."
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#8b1e2d] focus:ring-2 focus:ring-[#8b1e2d]/20 outline-hidden text-sm transition bg-white/80 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-deep-red-gradient text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <PaperPlaneTilt size={18} weight="bold" />
              <span>ثبت پیام تبریک</span>
            </button>
          </form>

          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-3 rounded-xl bg-[#eef4ed] border border-[#5b7e53]/30 text-[#5b7e53] text-xs font-medium flex items-center gap-2"
              >
                <UserCheck size={18} weight="bold" />
                <span>سپاس! پیام شما با موفقیت ثبت شد و روی دیوار قرار گرفت.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Wishes List */}
        <div className="lg:col-span-7 space-y-4 max-h-[520px] overflow-y-auto pr-1 custom-scrollbar">
          {wishes.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card border-[#5b7e53]/20 p-5 rounded-2xl relative shadow-xs hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h4 className="font-heading text-lg text-[#2c3831]">{item.name}</h4>
                  <span className="text-xs text-[#5b7e53] font-medium bg-[#eef4ed] px-2.5 py-0.5 rounded-full inline-block mt-0.5">
                    {item.relation}
                  </span>
                </div>
                <span className="text-[11px] text-stone-400 font-medium">{item.date}</span>
              </div>

              <p className="text-sm text-[#38453d] leading-relaxed mt-2 mb-3">
                {item.message}
              </p>

              <div className="flex items-center justify-end border-t border-stone-200/60 pt-2.5">
                <button
                  type="button"
                  onClick={() => handleToggleLike(item.id)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border transition-all cursor-pointer ${
                    item.liked
                      ? "bg-[#8b1e2d] text-white border-[#8b1e2d]"
                      : "bg-white text-stone-600 border-stone-200 hover:border-[#8b1e2d]/40"
                  }`}
                >
                  <Heart size={14} weight={item.liked ? "fill" : "bold"} />
                  <span>{item.likes}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
