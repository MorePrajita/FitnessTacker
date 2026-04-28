import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon, DumbbellIcon, HeartPulseIcon, SaladIcon } from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Testimonials from "../pages/Testimonials";

const slides = [
  {
    title: "Track your fitness journey",
    desc: "Log meals, workouts, and daily progress in one clean dashboard.",
    icon: DumbbellIcon,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Build healthier habits",
    desc: "Stay consistent with smart calorie tracking and activity insights.",
    icon: HeartPulseIcon,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "See your progress clearly",
    desc: "A simple, modern fitness experience designed to keep you motivated.",
    icon: SaladIcon,
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];
  const SlideIcon = slide.icon;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-0">
      <header className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <DumbbellIcon className="size-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">FitTrack</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Smart fitness for every day
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button type="button" onClick={() => navigate("/login")}>
            Sign Up
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center mt-6">
          <section>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
              <HeartPulseIcon className="size-4" />
              Track. Train. Transform.
            </div>

            <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">
              Your fitness journey starts here.
            </h2>

            <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-xl">
              Log meals, track workouts, and stay motivated with a clean dashboard that helps you build healthier habits every day.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button type="button" onClick={() => navigate("/login")}>
                Get Started
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/login")}
              >
                Already have an account?
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10">
              <Card>
                <p className="text-xs text-slate-500 dark:text-slate-400">Meals</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">Log</p>
              </Card>
              <Card>
                <p className="text-xs text-slate-500 dark:text-slate-400">Workouts</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">Track</p>
              </Card>
              <Card>
                <p className="text-xs text-slate-500 dark:text-slate-400">Goals</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">Grow</p>
              </Card>
            </div>
          </section>

          <section className="relative">
            <Card className="overflow-hidden p-0">
              <div className="relative min-h-[420px]">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
                  <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-4">
                    <SlideIcon className="size-7 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {slide.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-white/85 max-w-md">
                    {slide.desc}
                  </p>

                  <div className="flex items-center gap-3 mt-6">
                    <button
                      onClick={() =>
                        setIndex((prev) => (prev - 1 + slides.length) % slides.length)
                      }
                      className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center hover:bg-white/25 transition"
                    >
                      <ChevronLeftIcon className="size-5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {slides.map((_, i) => (
                        <span
                          key={i}
                          className={`h-2 rounded-full transition-all ${
                            i === index ? "w-7 bg-white" : "w-2 bg-white/50 pt-0"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() =>
                        setIndex((prev) => (prev + 1) % slides.length)
                      }
                      className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center hover:bg-white/25 transition pt-0"
                    >
                      <ChevronRightIcon className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </main>
      <Testimonials  />
    </div>
  );
};

export default Home;