import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Fuse from "fuse.js";
import resourcesData from "@/data/resources.json";
import { useLanguage } from "@/hooks/use-language";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function HomePage() {
  const { t, isAr } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const totalCategories = resourcesData.categories.length;
  const totalResources = resourcesData.categories.reduce(
    (acc, cat) => acc + cat.resources.length,
    0
  );

  const allResources = useMemo(() => {
    return resourcesData.categories.flatMap((cat) =>
      cat.resources.map((res) => ({ ...res, categorySlug: cat.slug }))
    );
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(allResources, {
        keys: ["title", "descriptionAr", "descriptionEn", "tags"],
        threshold: 0.3,
      }),
    [allResources]
  );

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    return fuse.search(searchQuery).map((r) => r.item);
  }, [searchQuery, fuse]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full flex flex-col gap-12">
      <section className="flex flex-col items-center justify-center pt-10 pb-8 gap-6 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold tracking-tight text-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t("Algerian Devs Resource Hub", "دليل مطوري الجزائر")}
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {t(
            "A curated collection of free tools, courses, and resources for developers and students.",
            "مجموعة منتقاة من الأدوات، الدورات، والمصادر المجانية للمطورين والطلاب."
          )}
        </motion.p>
        
        <motion.div 
          className="w-full max-w-2xl relative mt-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Search className={`absolute ${isAr ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground`} />
          <Input
            type="search"
            placeholder={t("Search resources, tags, or topics...", "ابحث عن المصادر، التقنيات، أو المواضيع...")}
            className={`w-full h-14 ${isAr ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-lg bg-card border-2 border-muted focus-visible:border-primary rounded-xl`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search"
          />
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-4 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Badge variant="secondary" className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20" data-testid="text-stats-resources">
            {totalResources} {t("Resources", "مصدر")}
          </Badge>
          <Badge variant="secondary" className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20" data-testid="text-stats-categories">
            {totalCategories} {t("Categories", "قسم")}
          </Badge>
        </motion.div>
      </section>

      {searchQuery ? (
        <section className="w-full max-w-5xl mx-auto flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-4">
            {t("Search Results", "نتائج البحث")} ({searchResults.length})
          </h2>
          {searchResults.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground border-2 border-dashed rounded-xl">
              {t("No resources found matching your search.", "لم يتم العثور على مصادر تطابق بحثك.")}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.map((res) => (
                <a
                  key={res.id}
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col gap-3 p-5 rounded-xl border bg-card hover:border-primary/50 hover:shadow-md transition-all group"
                  data-testid={`card-resource-${res.id}`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-lg text-primary group-hover:underline decoration-primary/50 underline-offset-4">{res.title}</h3>
                    <div className="flex gap-2 shrink-0">
                      {res.isFree && <Badge className="bg-green-600/20 text-green-600 hover:bg-green-600/30 border-green-600/20">{t("Free", "مجاني")}</Badge>}
                      {!res.isFree && res.hasFreeplan && <Badge variant="secondary">{t("Free Plan", "خطة مجانية")}</Badge>}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {isAr ? res.descriptionAr : res.descriptionEn}
                  </p>
                  <div className="mt-auto pt-2 flex flex-wrap gap-2">
                    {res.tags.map(tag => (
                      <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">#{tag}</span>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground/60 mt-2 truncate">
                    {new URL(res.url).hostname}
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="w-full max-w-5xl mx-auto pb-12">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {resourcesData.categories.map((cat) => (
              <motion.div key={cat.id} variants={item}>
                <Link href={`/category/${cat.slug}`} className="block h-full">
                  <div className="h-full p-6 rounded-2xl border bg-card hover:border-primary hover:shadow-lg transition-all group cursor-pointer" data-testid={`card-category-${cat.slug}`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform">{cat.icon}</span>
                      <Badge variant="outline" className="bg-muted/50 font-mono">
                        {cat.resources.length}
                      </Badge>
                    </div>
                    <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {isAr ? cat.nameAr : cat.nameEn}
                    </h2>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}
    </div>
  );
}
