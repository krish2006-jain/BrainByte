import { useLanguage } from "@/lib/LanguageContext";
import { getTranslation } from "@/lib/translations";

/**
 * Custom hook for translation
 * Returns a function to get translated text based on current language
 * 
 * Usage:
 * const t = useTranslation();
 * <h1>{t("home.hero.title")}</h1>
 */
export function useTranslation() {
  const { language } = useLanguage();

  // Return a function that gets translation for any key
  return (key: string, fallback?: string): string => {
    const translated = getTranslation(language, key);
    // If translation returns the key itself (not found), use fallback or key
    return translated === key ? (fallback || key) : translated;
  };
}
