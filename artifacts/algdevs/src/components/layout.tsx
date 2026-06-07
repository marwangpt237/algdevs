import { useLanguage } from "@/hooks/use-language";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun, Languages } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const { language, setLanguage, t, isAr } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-[100dvh] flex flex-col w-full bg-background text-foreground transition-colors duration-300">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold sm:inline-block text-xl text-primary" data-testid="link-logo">
                AlgDevs
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60" data-testid="link-about">
                {t("About", "عن المشروع")}
              </Link>
              <Link href="/submit" className="transition-colors hover:text-foreground/80 text-foreground/60" data-testid="link-submit">
                {t("Submit", "أضف مصدراً")}
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-9 px-0"
              onClick={() => setLanguage(isAr ? "en" : "ar")}
              data-testid="button-language"
            >
              <Languages className="h-4 w-4" />
              <span className="sr-only">Toggle language</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-9 px-0"
              onClick={toggleTheme}
              data-testid="button-theme"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t py-6 md:py-0 bg-muted/40">
        <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            {t("Built by the Algerian developer community.", "صُنع من طرف مجتمع المطورين الجزائريين.")}
          </p>
          <p className="text-sm text-muted-foreground">
            <a
              href="https://github.com/algdevs/algdevs"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
              data-testid="link-github-footer"
            >
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
