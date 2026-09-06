import {
  Archive,
  MagnifyingGlass,
  BookOpen,
  Robot,
  HardDrive,
  ListBullets,
  BellSlash,
  Link,
  FolderOpen,
  ClockCounterClockwise,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const problemItems = [
  {
    icon: ListBullets,
    title: "Too many assignments across multiple classes",
    description:
      "Deadlines pile up across different course pages with no unified view of what's due or where to find it.",
  },
  {
    icon: BellSlash,
    title: "Announcements get buried",
    description:
      "Important instructor updates disappear into a feed that moves fast and offers no way to resurface them later.",
  },
  {
    icon: Link,
    title: "Useful pages and links are hard to find again",
    description:
      "That one resource you bookmarked three weeks ago is now three scrolls deep inside a module you can barely locate.",
  },
  {
    icon: FolderOpen,
    title: "Course resources are scattered",
    description:
      "Syllabi, lecture notes, rubrics, and external links live in different tabs, folders, and course sections with no coherent structure.",
  },
  {
    icon: ClockCounterClockwise,
    title: "Old course material becomes difficult to retrieve",
    description:
      "Once a semester ends, access to course content can disappear — taking useful reference material with it.",
  },
];

const benefitCards = [
  {
    icon: Archive,
    title: "Organized Archive",
    description:
      "Turn scattered course pages into a clean, understandable folder structure you can actually navigate.",
  },
  {
    icon: MagnifyingGlass,
    title: "Search Later",
    description:
      "Quickly surface useful material from previous courses without digging through old tabs or portals.",
  },
  {
    icon: BookOpen,
    title: "Study-Friendly",
    description:
      "Assignments, pages, announcements, and resources live together — organized the way studying actually works.",
  },
  {
    icon: Robot,
    title: "AI & Notes Friendly",
    description:
      "Structured files work seamlessly with Obsidian, Notion, and AI study workflows that expect clean input.",
  },
  {
    icon: HardDrive,
    title: "Local Copy",
    description:
      "Keep an organized copy of supported materials you were authorized to access, on your own terms.",
  },
];

export default function ProblemBenefits() {
  return (
    <section
      id="problem-benefits"
      className="bg-muted py-16 md:py-20 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section headline */}
        <div className="mb-12">
          <h2 className="font-heading text-3xl md:text-4xl tracking-tight leading-tight text-foreground max-w-2xl">
            Keeping up with multiple classes shouldn't be this messy.
          </h2>
        </div>

        {/* Bento grid: lead problem block + benefit cards */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">
          {/* Problem block — spans 2 columns on large screens */}
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6 md:p-8 flex flex-col gap-6">
            <p className="text-xs uppercase tracking-wide text-muted-foreground font-heading">
              The problem
            </p>
            <ul className="flex flex-col gap-5">
              {problemItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className="flex gap-3 items-start">
                    <span className="mt-0.5 shrink-0 text-foreground opacity-60">
                      <Icon size={18} weight="duotone" />
                    </span>
                    <div>
                      <p className="text-sm font-heading leading-snug text-foreground mb-0.5">
                        {item.title}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Benefit cards — spans 3 columns on large screens, 2-col grid internally */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefitCards.map((card, index) => {
              const Icon = card.icon;
              const isFeatured = index === 0;
              return (
                <Card
                  key={card.title}
                  className={`
                    bg-card border rounded-lg transition-all duration-200 ease-out cursor-default
                    hover:bg-background hover:border-foreground hover:shadow-md
                    ${isFeatured ? "border-2 border-primary sm:col-span-2 lg:col-span-1" : "border-border"}
                    ${index === benefitCards.length - 1 && benefitCards.length % 2 !== 0 ? "sm:col-span-2 lg:col-span-1" : ""}
                  `}
                >
                  <CardContent className="p-6 flex flex-col gap-3">
                    <span className="text-foreground opacity-70">
                      <Icon size={22} weight="duotone" />
                    </span>
                    <div>
                      <h3 className="font-heading text-base md:text-lg leading-snug text-foreground mb-1">
                        {card.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                    {isFeatured && (
                      <Badge className="self-start text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-normal tracking-wide">
                        Core feature
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Positioning line with research-handout badge */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 border-t border-border pt-8">
          <Badge
            variant="outline"
            className="self-start shrink-0 text-xs uppercase tracking-wide px-3 py-1 rounded-full border-border text-muted-foreground font-normal whitespace-nowrap"
          >
            The distinction
          </Badge>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Calendars and to-do lists remind you what to do.{" "}
            <span className="text-foreground font-medium">
              CourseVault helps organize and preserve the actual information
              inside your course.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
