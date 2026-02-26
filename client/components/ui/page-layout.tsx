import React from "react";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { getTranslation } from "@/lib/translations";
import { useTheme } from "@/lib/ThemeContext";

type Props = {
  children: React.ReactNode;
  backgroundClass?: string;
  containerClass?: string;
};

// AI background for inner pages (subtle version)
function PageAIBackground({ isDark }: { isDark: boolean }) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none" aria-hidden style={{ zIndex: 0 }}>
      {/* base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "linear-gradient(135deg, #050510 0%, #0a0a1a 50%, #080814 100%)"
            : "linear-gradient(135deg, #f0f4ff 0%, #f8faff 60%, #f3f0ff 100%)",
        }}
      />
      {/* SVG grid */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isDark ? 0.04 : 0.03 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="pg" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke={isDark ? "#6366f1" : "#4f46e5"} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pg)" />
      </svg>
      {/* Orbs */}
      <div
        data-ai="orb1"
        className="absolute rounded-full"
        style={{
          width: "600px", height: "600px", top: "-100px", left: "-150px",
          background: isDark
            ? "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        data-ai="orb2"
        className="absolute rounded-full"
        style={{
          width: "500px", height: "500px", bottom: "-80px", right: "-100px",
          background: isDark
            ? "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}

export default function PageLayout({
  children,
  backgroundClass,
  containerClass = "max-w-7xl mx-auto",
}: Props) {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="min-h-screen flex flex-col relative">
      <PageAIBackground isDark={isDark} />

      {/* Content above background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation />

        <main className="flex-1 pt-6 px-4 sm:px-6 lg:px-8 pb-12">
          <div className={containerClass}>{children}</div>
        </main>

        <footer
          className="border-t py-6 sm:py-8"
          style={{
            borderColor: isDark ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.1)",
            background: isDark ? "rgba(5,5,16,0.8)" : "rgba(255,255,255,0.8)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p
              className="text-sm font-medium"
              style={{ color: isDark ? "rgba(100,116,139,0.7)" : "rgba(100,116,139,0.7)" }}
            >
              {getTranslation(language, "footer.copyright")}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
