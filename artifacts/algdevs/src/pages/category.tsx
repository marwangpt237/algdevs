import { useParams, Link } from "wouter";
import { useState, useMemo } from "react";
import resourcesData from "@/data/resources.json";
import { useLanguage } from "@/hooks/use-language";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronRight, ChevronLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "react-day-picker";

export function CategoryPage() {
  const params = useParams();
  const { t, isAr } = useLanguage();
  const slug = params.slug;

  const category = useMemo(() => {
    return resourcesData.categories.find(c => c.slug === slug);
  }, [slug]);

  const [freeOnly, setFreeOnly] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const allTags = useMemo(() => {
    if (!category) return [];
    const tags = new Set<string>();
    category.resources.forEach(r => r.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [category]);

  const toggleTag = (tag: string) => {
    const next = new Set(selectedTags);
    if (next.has(tag)) {
      next.delete(tag);
    } else {
      next.add(tag);
    }
    setSelectedTags(next);
  };

  const filteredResources = useMemo(() => {
    if (!category) return [];
    return category.resources.filter(res => {
      if (freeOnly && !res.isFree) return false;
      if (selectedTags.size > 0 && !res.tags.some(t => selectedTags.has(t))) return false;
      return true;
    });
  }, [category, freeOnly, selectedTags]);

  if (!category) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">{t("Category not found", "القسم غير موجود")}</h1>
        <Link href="/" className="text-primary hover:underline">{t("Return home", "العودة للرئيسية")}</Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">{t("Home", "الرئيسية")}</Link>
        {isAr ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        <span className="text-foreground font-medium">{isAr ? category.nameAr : category.nameEn}</span>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-end justify-between border-b pb-6">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{category.icon}</span>
          <h1 className="text-3xl md:text-4xl font-bold">{isAr ? category.nameAr : category.nameEn}</h1>
        </div>
        <Badge variant="outline" className="w-fit text-base px-3 py-1">
          {filteredResources.length} {t("resources", "مصدر")}
        </Badge>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-6 sticky top-24">
          <div className="p-5 bg-card border rounded-xl flex flex-col gap-6 shadow-sm">
            <h3 className="font-bold text-lg border-b pb-2">{t("Filters", "تصفية")}</h3>
            
            <div className="flex items-center space-x-2 space-x-reverse justify-between">
              <Label htmlFor="free-mode" className="cursor-pointer font-medium">{t("100% Free Only", "مجاني 100% فقط")}</Label>
              <Switch 
                id="free-mode" 
                checked={freeOnly} 
                onCheckedChange={setFreeOnly} 
                data-testid="switch-free-only"
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label className="font-medium">{t("Tags", "الوسوم")}</Label>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge 
                    key={tag}
                    variant={selectedTags.has(tag) ? "default" : "secondary"}
                    className={`cursor-pointer hover:opacity-80 transition-opacity ${selectedTags.has(tag) ? '' : 'bg-muted text-muted-foreground'}`}
                    onClick={() => toggleTag(tag)}
                    data-testid={`badge-tag-${tag}`}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resource Grid */}
        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResources.length === 0 ? (
            <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-xl">
              {t("No resources match your filters.", "لا توجد مصادر تطابق خيارات التصفية.")}
              <Button variant="link" onClick={() => { setFreeOnly(false); setSelectedTags(new Set()); }} className="mt-2 block mx-auto">
                {t("Clear filters", "مسح خيارات التصفية")}
              </Button>
            </div>
          ) : (
            filteredResources.map((res, i) => (
              <motion.a
                key={res.id}
                href={res.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col gap-3 p-5 rounded-xl border bg-card hover:border-primary/50 hover:shadow-md transition-all group"
                data-testid={`card-resource-${res.id}`}
              >
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-lg text-primary flex items-center gap-1 group-hover:underline decoration-primary/50 underline-offset-4">
                    {res.title}
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <div className="flex gap-2 shrink-0">
                    {res.isFree && <Badge className="bg-green-600/20 text-green-600 hover:bg-green-600/30 border-green-600/20 shadow-none">{t("Free", "مجاني")}</Badge>}
                    {!res.isFree && res.hasFreeplan && <Badge variant="secondary" className="shadow-none">{t("Free Plan", "خطة مجانية")}</Badge>}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {isAr ? res.descriptionAr : res.descriptionEn}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {res.tags.map(tag => (
                    <span key={tag} className="text-xs bg-muted/70 px-2 py-1 rounded-md text-muted-foreground font-medium">#{tag}</span>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground/60 mt-1 truncate font-mono">
                  {new URL(res.url).hostname}
                </div>
              </motion.a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
