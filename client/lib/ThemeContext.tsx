import React, { createContext, useContext, useEffect } from "react";

type Theme = "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always apply light theme
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("dark");
    html.classList.add("light");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "light", toggleTheme: () => { } }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    return {
      theme: "light" as const,
      toggleTheme: () => { },
    };
  }
  return context;
}
