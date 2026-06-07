import { useEffect, useState } from "react";

type Language = "en" | "ar";

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "ar";
  });

  const setLanguage = (lang: Language) => {
    localStorage.setItem("language", lang);
    setLanguageState(lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  return {
    language,
    setLanguage,
    t: (en: string, ar: string) => (language === "en" ? en : ar),
    isAr: language === "ar",
  };
}
