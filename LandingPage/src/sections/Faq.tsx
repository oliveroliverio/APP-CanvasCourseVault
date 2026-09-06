import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus } from "@phosphor-icons/react";

const faqItems = [
  {
    id: "affiliation",
    question: "Is CourseVault affiliated with Canvas or Instructure?",
    answer:
      "No. CourseVault is an independent project and is not affiliated with, sponsored by, or endorsed by Canvas or Instructure, Inc. in any way. We are a student productivity tool built independently.",
  },
  {
    id: "password",
    question: "Do I give CourseVault my Canvas password?",
    answer:
      "No. The intended workflow does not require sharing your Canvas password or any login credentials. You retain full control of your account at all times.",
  },
  {
    id: "saved",
    question: "What does it save?",
    answer:
      "CourseVault is designed to organize supported pages, assignments, announcements, links, and other materials you already have permission to access within your enrolled courses. It structures that content into clean, searchable files — nothing beyond what you can already view.",
  },
  {
    id: "availability",
    question: "Is it available now?",
    answer:
      "CourseVault is currently being tested with a small group of students. We're gathering feedback from early users before a wider release. If you're interested in joining the pilot, fill out the interest form above.",
  },
];

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="bg-muted py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-2xl mx-auto">
        {/* Intro block */}
        <div className="mb-10">
          <Badge
            variant="outline"
            className="mb-5 text-xs uppercase tracking-widest border-border text-muted-foreground font-sans px-3 py-1 rounded-full"
          >
            Independent project
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl tracking-tight leading-tight text-foreground">
            Frequently asked questions
          </h2>
        </div>

        {/* FAQ list */}
        <div className="flex flex-col">
          {faqItems.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id}>
                {index === 0 && <Separator className="border-border" />}
                <div
                  className={`group transition-colors duration-150 ease-out ${
                    isOpen ? "bg-card" : "hover:bg-card"
                  }`}
                >
                  <button
                    onClick={() => toggle(item.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-4 py-5 px-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                  >
                    <span
                      className={`font-heading text-base md:text-lg leading-snug transition-colors duration-150 ${
                        isOpen
                          ? "text-foreground"
                          : "text-foreground group-hover:text-foreground"
                      }`}
                    >
                      {item.question}
                    </span>
                    <span className="mt-0.5 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors duration-150">
                      {isOpen ? (
                        <Minus weight="duotone" size={18} />
                      ) : (
                        <Plus weight="duotone" size={18} />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-5 px-1">
                      <p className="text-base text-muted-foreground leading-relaxed max-w-prose">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
                <Separator
                  className={`transition-colors duration-150 ${
                    isOpen
                      ? "border-primary/30"
                      : "border-border group-hover:border-border"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Trust footnote */}
        <p className="mt-8 text-xs text-muted-foreground tracking-wide">
          Have a question not listed here?{" "}
          <a
            href="#how-it-works-and-pilot"
            className="underline underline-offset-2 hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            Reach out via the interest form.
          </a>
        </p>
      </div>
    </section>
  );
}
