import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PageLayout from "@/components/ui/page-layout";
import { FileText, Stethoscope, BookOpen, ArrowRight, Zap } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { getTranslation } from "@/lib/translations";
import { useAuth } from "@/lib/AuthContext";

export default function Index() {
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
      path: "/sarkari-dost",
    },
    {
      id: "seva-summary",
      titleKey: "features.sevasummary.title",
      subtitleKey: "features.sevasummary.subtitle",
      descriptionKey: "features.sevasummary.description",
      icon: Stethoscope,
      path: "/seva-summary",
    },
    {
      id: "vidyarthi-ai",
      titleKey: "features.vidyarthi.title",
      subtitleKey: "features.vidyarthi.subtitle",
      descriptionKey: "features.vidyarthi.description",
      icon: BookOpen,
      path: "/vidyarthi-ai",
    },
  ];

  return (
    <PageLayout>
      <section className="flex items-center justify-center py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto w-full text-center scroll-reveal is-visible">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
            <Zap className="w-3 h-3" />
            Bharat AI Portal
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight text-foreground">
            {getTranslation(language, "home.hero.title")}
          </h1>
          <p className="text-base sm:text-lg mb-12 max-w-2xl mx-auto font-light text-muted-foreground">
            {getTranslation(language, "home.hero.subtitle")}
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.id}
                  to={feature.path}
                  className={`group block scroll-reveal is-visible delay-${idx + 1}`}
                >
                  <div className="h-full rounded-2xl p-6 sm:p-7 flex flex-col transition-all duration-300 bg-card border border-border/50 hover:bg-secondary hover:border-border hover:shadow-md hover:-translate-y-1">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0 transition-transform duration-300 bg-background border border-border group-hover:scale-105 group-hover:bg-primary">
                      <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>

                    {/* Content */}
                    <h2 className="text-xl sm:text-2xl font-bold mb-1.5 text-left text-foreground">
                      {getTranslation(language, feature.titleKey)}
                    </h2>
                    <p className="text-xs font-semibold mb-3 text-left uppercase tracking-wider text-muted-foreground">
                      {getTranslation(language, feature.subtitleKey)}
                    </p>
                    <p className="text-sm text-left mb-6 flex-1 leading-relaxed text-muted-foreground">
                      {getTranslation(language, feature.descriptionKey)}
                    </p>

                    {/* Button */}
                    <div className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 group-hover:gap-3 bg-background border border-border text-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
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
