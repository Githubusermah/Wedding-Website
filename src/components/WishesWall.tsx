"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { PaperPlaneTilt } from "@phosphor-icons/react";

interface Wish {
  id: number;
  name: string;
  message: string;
  date: string;
}

const initialWishes: Wish[] = [
  {
    id: 1,
    name: "احمد شکیب",
    message: "با صمیمانه‌ترین آرزوهای خوشبختی برای فرهاد و ادیبه عزیز. پیوندتان خجسته باد!",
    date: "۱۳ میزان",
  },
  {
    id: 2,
    name: "فامیلی رضایی",
    message: "آغاز زندگی مشترک‌تان مبارک باد. با آرزوی روزهای پر از عشق و شادکامی.",
    date: "۱۳ میزان",
  },
];

export default function WishesWall() {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: Wish = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      date: "هم‌اکنون",
    };

    setWishes([newWish, ...wishes]);
    setName("");
    setMessage("");
    setIsSent(true);
    setTimeout(() => setIsSent(false), 4000);
  };

  return (
    <section className="py-14 px-4 max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div>
          <span className="text-xs text-[var(--gold-dark)] font-semibold tracking-widest uppercase block">
            دفتر یادبود
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] font-serif mt-1">
            یادگاری‌های شما
          </h2>
          <div className="w-12 h-px bg-[var(--gold-muted)] mx-auto mt-3" />
        </div>

        {/* Form on transparent paper with subtle bottom line inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 text-right">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام شما"
              className="px-3 py-2 bg-transparent border-b border-[var(--line)] text-[var(--ink)] text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
            />
            <button
              type="submit"
              className="py-2 px-5 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-[var(--paper-white)] font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer self-end"
            >
              <PaperPlaneTilt size={14} />
              <span>ثبت یادگاری</span>
            </button>
          </div>

          <textarea
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="متن پیام تبریک..."
            className="w-full px-3 py-2 bg-transparent border-b border-[var(--line)] text-[var(--ink)] text-xs focus:outline-none focus:border-[var(--gold)] transition-colors"
          />

          {isSent && (
            <p className="text-xs text-[var(--gold-dark)] font-medium text-center pt-1">
              پیام شما با موفقیت ثبت شد. سپاس!
            </p>
          )}
        </form>

        {/* Wishes List */}
        <div className="space-y-4 text-right pt-2">
          {wishes.map((item) => (
            <div
              key={item.id}
              className="border-b border-[var(--line-subtle)] pb-3 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-[var(--ink)]">{item.name}</span>
                <span className="text-[10px] text-[var(--ink-muted)]">{item.date}</span>
              </div>
              <p className="text-xs text-[var(--ink-muted)] leading-relaxed">{item.message}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
