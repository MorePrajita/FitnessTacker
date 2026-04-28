import { useEffect, useState } from "react";
import { StarIcon, QuoteIcon } from "lucide-react";
import Card from "../components/ui/Card";

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Weight loss journey",
    quote:
      "FitTrack made it so much easier to stay consistent. I finally understand my meals and workouts in one place.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Busy professional",
    quote:
      "I love the clean dashboard and quick logging. It feels simple, fast, and motivating every day.",
    rating: 5,
  },
  {
    name: "Rahul Patil",
    role: "Fitness beginner",
    quote:
      "The app keeps me on track without feeling overwhelming. The daily insights really help me stay focused.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="p-10 pt-0">
      <div className="text-center max-w-2xl mx-auto pt-0">
        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider pt-0">
          Testimonials
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white pt-0">
          What our users say
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300 pt-0">
          Real feedback from people using FitTrack to improve their health and build better habits.
        </p>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {testimonials.map((item, i) => (
          <Card
            key={item.name}
            className={`transition-all duration-300 ${
              i === index ? "ring-2 ring-emerald-500 scale-[1.02]" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <QuoteIcon className="size-8 text-emerald-500 shrink-0" />
              <div className="flex items-center gap-1">
                {Array.from({ length: item.rating }).map((_, idx) => (
                  <StarIcon key={idx} className="size-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
              “{item.quote}”
            </p>

            <div className="mt-5">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {item.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {item.role}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;