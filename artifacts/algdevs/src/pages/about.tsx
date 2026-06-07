import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Github, Globe, Heart, Users } from "lucide-react";
import resourcesData from "@/data/resources.json";

export function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 w-full flex flex-col gap-16">
      <section className="text-center flex flex-col items-center gap-6">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2">
          <Globe className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {t("About AlgDevs", "عن AlgDevs")}
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
          {t(
            "AlgDevs is a free, open-source directory aimed at helping Algerian developers and students find the best resources without financial barriers.",
            "دليل مجاني ومفتوح المصدر يهدف إلى مساعدة المطورين والطلاب الجزائريين في العثور على أفضل المصادر التعليمية والأدوات البرمجية."
          )}
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border rounded-2xl p-8 flex flex-col gap-4">
          <div className="w-12 h-12 bg-green-500/10 text-green-600 rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold">{t("The Mission", "المهمة")}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {t(
              "Access to high-quality tech education and tools should be free. We curate the internet's best free resources, prioritizing tools that don't require credit cards to sign up.",
              "يجب أن يكون الوصول إلى التعليم التقني والأدوات عالي الجودة مجانياً. نحن نجمع أفضل المصادر المجانية، مع إعطاء الأولوية للأدوات التي لا تتطلب بطاقات ائتمان للتسجيل."
            )}
          </p>
        </div>
        
        <div className="bg-card border rounded-2xl p-8 flex flex-col gap-4">
          <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold">{t("Community Driven", "مبني بواسطة المجتمع")}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {t(
              "This project is maintained entirely through community contributions on GitHub. Every resource listed here was suggested or vetted by a fellow developer.",
              "تتم صيانة هذا المشروع بالكامل من خلال مساهمات المجتمع على GitHub. كل مصدر مدرج هنا تم اقتراحه أو التحقق منه بواسطة مطورين آخرين."
            )}
          </p>
        </div>
      </section>

      <section className="bg-muted/50 border rounded-2xl p-8 md:p-12 text-center flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold">{t("Want to contribute?", "هل ترغب في المساهمة؟")}</h2>
        <p className="text-muted-foreground max-w-lg mb-2">
          {t(
            "Whether it's fixing a typo, translating a description, or adding a new tool, your help is welcome. Check out our repository.",
            "سواء كان ذلك بتصحيح خطأ إملائي، ترجمة وصف، أو إضافة أداة جديدة، نرحب بمساهمتك. تحقق من مستودعنا على GitHub."
          )}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="gap-2">
            <a href={resourcesData.githubRepo} target="_blank" rel="noreferrer" data-testid="link-github-repo">
              <Github className="w-5 h-5" />
              {t("Star on GitHub", "المستودع على GitHub")}
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2 bg-background">
            <a href={`${resourcesData.githubRepo}/issues`} target="_blank" rel="noreferrer">
              {t("Report an Issue", "الإبلاغ عن مشكلة")}
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
