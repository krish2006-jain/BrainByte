import React from "react";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { getTranslation } from "@/lib/translations";

type Props = {
  children: React.ReactNode;
  backgroundClass?: string;
  containerClass?: string;
};

// Minimalist soft blue-gray background
function PageBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none bg-background" aria-hidden style={{ zIndex: 0 }}>
      {/* Soft floating shapes to break up the solid color */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-secondary/30 blur-[100px] transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] rounded-full bg-card/40 blur-[120px] transform -translate-x-1/2 translate-y-1/2" />
    </div>
  );
}

export default function PageLayout({
  children,
  backgroundClass,
  containerClass = "max-w-7xl mx-auto",
}: Props) {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col relative text-foreground">
      <PageBackground />

      {/* Content above background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation />

        <main className="flex-1 pt-6 px-4 sm:px-6 lg:px-8 pb-12">
          <div className={containerClass}>{children}</div>
        </main>

        <footer className="border-t border-border py-6 sm:py-8 bg-background/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              {getTranslation(language, "footer.copyright")}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
