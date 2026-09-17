import { track } from "@vercel/analytics";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  NumberOne,
  NumberTwo,
  NumberThree,
  LockKey,
} from "@phosphor-icons/react";

const processSteps = [
  {
    number: 1,
    icon: NumberOne,
    title: "Choose your course",
    description:
      "Select a Canvas course you already have access to. No special permissions or password sharing required.",
  },
  {
    number: 2,
    icon: NumberTwo,
    title: "CourseVault organizes it",
    description:
      "Course content — assignments, pages, announcements, resources — becomes clean, structured files in a logical folder layout.",
  },
  {
    number: 3,
    icon: NumberThree,
    title: "Keep your archive",
    description:
      "Receive an organized course folder you can study from, search through, and use with Obsidian, AI tools, or any note-taking workflow.",
  },
];

const courseCountOptions = ["1", "2", "3", "4", "5+"];

const usefulOptions = [
  { id: "old-material", label: "Keeping old course material" },
  { id: "assignments", label: "Organizing assignments" },
  { id: "search", label: "Searching course content" },
  { id: "obsidian", label: "Obsidian knowledge base" },
  { id: "ai-tools", label: "AI study tools" },
  { id: "announcements", label: "Organizing announcements & resources" },
];

export default function HowItWorksAndPilot() {
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [courseCount, setCourseCount] = useState("");
  const [selectedUseful, setSelectedUseful] = useState<string[]>([]);
  const [frustration, setFrustration] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState("");
	const [errors, setErrors] = useState<{ email?: string }>({});

  const toggleUseful = (id: string) => {
    setSelectedUseful((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const newErrors: { email?: string } = {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = "Please enter a valid email address.";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({});
  setSubmitError("");
  setIsSubmitting(true);

  try {
    const response = await fetch("https://formspree.io/f/mjykvzed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        school,
        courseCount,
        usefulFor: selectedUseful,
        frustration,
      }),
    });

    if (!response.ok) {
      throw new Error("Form submission failed.");
    }

    track("pilot_interest_submitted", {
      courseCount: courseCount || "not_provided",
      schoolProvided: school ? "yes" : "no",
      frustrationProvided: frustration ? "yes" : "no",
    });

    setSubmitted(true);
  } catch (error) {
    console.error(error);
    setSubmitError(
      "Something went wrong. Please try again or email canvascoursevault@gmail.com.",
    );
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <section
      id="how-it-works-and-pilot"
      className="bg-card py-16 md:py-20 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-sans mb-3">
            Student Pilot
          </p>
          <h2 className="font-heading text-3xl md:text-4xl tracking-tight leading-tight text-foreground">
            Want to try CourseVault?
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-prose">
            We're testing CourseVault with a small number of students and
            looking for feedback from people who regularly use Canvas.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left: How It Works */}
          <div className="flex-1 flex flex-col gap-8">
            <h3 className="font-heading text-xl md:text-2xl leading-snug text-foreground">
              How it works
            </h3>

            <ol className="flex flex-col gap-8">
              {processSteps.map((step) => (
                <li key={step.number} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-9 h-9 rounded-md bg-muted flex items-center justify-center border border-border">
                    <span className="font-heading text-base text-foreground font-semibold">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-heading text-base md:text-lg leading-snug text-foreground mb-1">
                      {step.title}
                    </h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Reassurance badge */}
            <div className="mt-2">
              <Badge
                variant="outline"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-border text-muted-foreground text-xs md:text-sm font-sans tracking-wide"
              >
                <LockKey weight="duotone" className="w-4 h-4 text-foreground" />
                You never need to send us your Canvas password.
              </Badge>
            </div>
          </div>

          {/* Right: Pilot Form */}
          <div className="flex-1">
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-6 py-16 px-6 border border-border rounded-xl bg-muted text-center h-full min-h-[400px]">
                <CheckCircle
                  weight="duotone"
                  className="w-12 h-12 text-foreground"
                />
                <div>
                  <h4 className="font-heading text-xl md:text-2xl leading-snug text-foreground mb-2">
                    You're on the list.
                  </h4>
                  <p className="text-base text-muted-foreground max-w-sm mx-auto">
                    Thanks! We'll send information about the CourseVault student
                    pilot to the email you provided.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-6 border border-border rounded-xl p-6 md:p-8 bg-background"
              >
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="pilot-email"
                    className="text-sm font-sans text-foreground"
                  >
                    Email <span className="text-foreground">*</span>
                  </Label>
                  <Input
                    id="pilot-email"
                    type="email"
                    placeholder="you@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-lg border-border bg-card text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-150"
                    required
                  />
                  {errors.email && (
                    <p className="text-xs text-foreground font-sans">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* School */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="pilot-school"
                    className="text-sm font-sans text-foreground"
                  >
                    School / College{" "}
                    <span className="text-muted-foreground text-xs">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    id="pilot-school"
                    type="text"
                    placeholder="e.g. State University"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="rounded-lg border-border bg-card text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-150"
                  />
                </div>

                {/* Course count */}
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-sans text-foreground">
                    Number of Canvas courses this semester
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {courseCountOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setCourseCount(opt)}
                        className={`px-4 py-2 rounded-full border text-sm font-sans transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                          courseCount === opt
                            ? "bg-foreground text-background border-foreground"
                            : "bg-card text-foreground border-border hover:bg-muted"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Most useful */}
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-sans text-foreground">
                    What would be most useful?{" "}
                    <span className="text-muted-foreground text-xs">
                      (select all that apply)
                    </span>
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {usefulOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleUseful(opt.id)}
                        className={`px-3 py-1.5 rounded-full border text-xs md:text-sm font-sans transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                          selectedUseful.includes(opt.id)
                            ? "bg-foreground text-background border-foreground"
                            : "bg-card text-foreground border-border hover:bg-muted"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Frustration textarea */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="pilot-frustration"
                    className="text-sm font-sans text-foreground"
                  >
                    What is the most frustrating part of keeping your classes
                    organized?{" "}
                    <span className="text-muted-foreground text-xs">
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="pilot-frustration"
                    placeholder="e.g. I can never find old announcements when I need them..."
                    value={frustration}
                    onChange={(e) => setFrustration(e.target.value)}
                    rows={3}
                    className="rounded-lg border-border bg-card text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-150 resize-none"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-primary text-primary-foreground font-heading text-base py-3 transition-all duration-150 hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? "Submitting..." : "I'm Interested"}
                </Button>
                {submitError && (
                  <p className="text-sm text-center text-red-600">
                    {submitError}
                  </p>
                )}

                <p className="text-xs text-muted-foreground text-center font-sans">
                  No account creation. No Canvas password required.
                  We may contact you about the CourseVault pilot.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
