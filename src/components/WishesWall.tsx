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
    <section className="py-12 px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="paper-card p-6 md:p-8"
      >
        <div className="text-center mb-8">
          <span className="text-xs text-[var(--gold)] font-semibold tracking-wider uppercase">
            دفتر یادبود
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--ruby)] mt-1">
            یادگاری‌های شما
          </h2>
          <p className="text-sm text-[var(--ink-muted)] mt-2">
            پیام تبریک و آرزوهای نیک خود را برای عروس و داماد ثبت کنید.
          </p>
        </div>

        {/* Message Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8 text-right">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام شما"
              className="px-4 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper-white)] text-[var(--ink)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
            />
            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-[var(--paper-white)] font-semibold text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <PaperPlaneTilt size={16} />
              <span>ثبت یادگاری</span>
            </button>
          </div>

          <textarea
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="متن پیام تبریک..."
            className="w-full px-4 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper-white)] text-[var(--ink)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
          />

          {isSent && (
            <p className="text-xs text-[var(--sage)] font-semibold text-center">
              پیام شما با موفقیت ثبت شد. سپاس!
            </p>
          )}
        </form>

        {/* Wishes List */}
        <div className="space-y-3 text-right">
          {wishes.map((item) => (
            <div
              key={item.id}
              className="paper-card-inset p-4 rounded-xl border border-[var(--line)] space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-[var(--ink)]">{item.name}</span>
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
