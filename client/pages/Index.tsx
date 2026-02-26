import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PageLayout from "@/components/ui/page-layout";
import { FileText, Stethoscope, BookOpen, ArrowRight, Zap } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { getTranslation } from "@/lib/translations";
import { useAuth } from "@/lib/AuthContext";
import { useTheme } from "@/lib/ThemeContext";

export default function Index() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/landing");
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      id: "sarkari-dost",
      titleKey: "features.sarkaridost.title",
      subtitleKey: "features.sarkaridost.subtitle",
      descriptionKey: "features.sarkaridost.description",
      icon: FileText,
      accent: "#6366f1",
      gradient: "linear-gradient(135deg, #6366f1, #4f46e5)",
      glowColor: "rgba(99,102,241,0.3)",
      path: "/sarkari-dost",
    },
    {
      id: "seva-summary",
      titleKey: "features.sevasummary.title",
      subtitleKey: "features.sevasummary.subtitle",
      descriptionKey: "features.sevasummary.description",
      icon: Stethoscope,
      accent: "#10b981",
      gradient: "linear-gradient(135deg, #10b981, #059669)",
      glowColor: "rgba(16,185,129,0.3)",
      path: "/seva-summary",
    },
    {
      id: "vidyarthi-ai",
      titleKey: "features.vidyarthi.title",
      subtitleKey: "features.vidyarthi.subtitle",
      descriptionKey: "features.vidyarthi.description",
      icon: BookOpen,
      accent: "#f59e0b",
      gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
      glowColor: "rgba(245,158,11,0.3)",
      path: "/vidyarthi-ai",
    },
  ];

  return (
    <PageLayout>
      <section className="flex items-center justify-center py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto w-full text-center">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 uppercase tracking-widest"
            style={{
              background: isDark ? "rgba(99,102,241,0.14)" : "rgba(99,102,241,0.09)",
              border: isDark ? "1px solid rgba(99,102,241,0.28)" : "1px solid rgba(99,102,241,0.2)",
              color: isDark ? "#a5b4fc" : "#4f46e5",
            }}
          >
            <Zap className="w-3 h-3" />
            Bharat AI Portal
          </div>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight"
            style={{
              background: isDark
                ? "linear-gradient(135deg, #e2e8f0 0%, #a5b4fc 60%, #818cf8 100%)"
                : "linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #6366f1 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "textGradient 5s ease infinite",
            }}
          >
            {getTranslation(language, "home.hero.title")}
          </h1>
          <p
            className="text-base sm:text-lg mb-12 max-w-2xl mx-auto font-light"
            style={{ color: isDark ? "rgba(148,163,184,0.85)" : "rgba(71,85,105,0.85)" }}
          >
            {getTranslation(language, "home.hero.subtitle")}
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.id} to={feature.path} className="group block">
                  <div
                    className="h-full rounded-2xl p-6 sm:p-7 flex flex-col transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.72)",
                      backdropFilter: "blur(16px)",
                      border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.06)",
                      boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.25)" : "0 4px 24px rgba(0,0,0,0.06)",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.border = `1px solid ${feature.accent}40`;
                      el.style.boxShadow = `0 8px 40px ${feature.glowColor}, 0 4px 24px rgba(0,0,0,0.15)`;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.border = isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.06)";
                      el.style.boxShadow = isDark ? "0 4px 24px rgba(0,0,0,0.25)" : "0 4px 24px rgba(0,0,0,0.06)";
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: feature.gradient, boxShadow: `0 4px 16px ${feature.glowColor}` }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <h2
                      className="text-xl sm:text-2xl font-bold mb-1.5 text-left"
                      style={{ color: isDark ? "rgba(226,232,240,0.95)" : "rgba(15,23,42,0.95)" }}
                    >
                      {getTranslation(language, feature.titleKey)}
                    </h2>
                    <p
                      className="text-xs font-semibold mb-3 text-left uppercase tracking-wider"
                      style={{ color: feature.accent }}
                    >
                      {getTranslation(language, feature.subtitleKey)}
                    </p>
                    <p
                      className="text-sm text-left mb-5 flex-1 leading-relaxed"
                      style={{ color: isDark ? "rgba(148,163,184,0.75)" : "rgba(71,85,105,0.8)" }}
                    >
                      {getTranslation(language, feature.descriptionKey)}
                    </p>

                    {/* Button */}
                    <div
                      className="w-full py-2.5 px-4 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all duration-200 group-hover:gap-3 btn-shimmer"
                      style={{
                        background: feature.gradient,
                        boxShadow: `0 2px 12px ${feature.glowColor}`,
                      }}
                    >
                      {getTranslation(language, "common.getStarted")}
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
