import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import PageLayout from "@/components/ui/page-layout";
import { useLanguage } from "@/lib/LanguageContext";
import { getTranslation } from "@/lib/translations";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <PageLayout backgroundClass={"bg-background"}>
      <div className="flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-6xl sm:text-7xl font-bold text-foreground mb-4">404</h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-2">Oops! Page not found</p>
          <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
          <Link to="/" className="inline-block bg-card-blue hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all">{getTranslation(language, "common.backToHome")}</Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
