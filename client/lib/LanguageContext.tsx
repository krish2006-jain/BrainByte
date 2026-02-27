import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Language } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Key for localStorage
const LANGUAGE_STORAGE_KEY = "bharat-ai-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage or default to "en"
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored === "en" || stored === "hi" || stored === "ta") {
        return stored as Language;
      }
    } catch (error) {
      console.warn("Error reading language from localStorage:", error);
    }
    return "en";
  });

  // Wrapper function that updates both state and localStorage
  const setLanguage = (lang: Language) => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      setLanguageState(lang);
      // Update document language attribute for accessibility
      document.documentElement.lang = lang;
    } catch (error) {
      console.warn("Error saving language to localStorage:", error);
      setLanguageState(lang);
    }
  };

  // Set document language on mount and when language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
