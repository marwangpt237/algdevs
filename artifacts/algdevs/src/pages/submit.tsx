import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Github, FilePlus } from "lucide-react";
import resourcesData from "@/data/resources.json";

export function SubmitPage() {
  const { t, isAr } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 w-full">
      <div className="flex flex-col items-center text-center gap-6 mb-12">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
          <FilePlus className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t("Submit a Resource", "أضف مصدراً جديداً")}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t(
            "AlgDevs is open source and community-driven. If you know a great free resource, share it with us!",
            "المشروع مفتوح المصدر ومبني من طرف المجتمع. إذا كنت تعرف مصدراً مجانياً مفيداً، شاركه معنا!"
          )}
        </p>
      </div>

      <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-bold mb-4">{t("How to submit?", "كيفية الإضافة؟")}</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            {t(
              "We manage all submissions through GitHub Issues to keep things transparent and organized.",
              "نحن ندير جميع الإضافات عبر GitHub Issues للحفاظ على الشفافية والتنظيم."
            )}
          </p>
          <ol className={`list-decimal list-inside space-y-2 ${isAr ? 'marker:text-right' : 'marker:text-left'}`}>
            <li>{t("Check if the resource isn't already listed.", "تأكد من أن المصدر غير موجود مسبقاً في الموقع.")}</li>
            <li>{t("Ensure it has a free tier or is 100% free.", "تأكد من أن المصدر مجاني بالكامل أو يحتوي على خطة مجانية جيدة.")}</li>
            <li>{t("Click the button below to open a new GitHub Issue.", "انقر على الزر أدناه لفتح Issue جديد على GitHub.")}</li>
            <li>{t("Fill in the template with the resource details.", "املأ القالب المرفق بتفاصيل المصدر.")}</li>
          </ol>
        </div>

        <div className="mt-8 pt-6 border-t flex justify-center">
          <Button asChild size="lg" className="w-full sm:w-auto h-14 text-base gap-2 px-8">
            <a 
              href={`${resourcesData.githubRepo}/issues/new?title=Resource+Suggestion&labels=submission`}
              target="_blank"
              rel="noreferrer"
              data-testid="link-github-issue"
            >
              <Github className="w-5 h-5" />
              {t("Open GitHub Issue", "فتح Issue على GitHub")}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
