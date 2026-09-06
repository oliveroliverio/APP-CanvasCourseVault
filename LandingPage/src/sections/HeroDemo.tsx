import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  FolderOpen,
  FileText,
  CaretRight,
  CaretDown,
  LockSimple,
} from "@phosphor-icons/react";

const beforeItems = [
  {
    label: "Modules",
    sub: ["Week 4 Lecture", "Week 3 Notes", "Week 2 Slides"],
  },
  {
    label: "Assignments",
    sub: ["Assignment 6", "Assignment 5", "Project Instructions"],
  },
  {
    label: "Pages",
    sub: ["Vocabulary List", "Grammar Reference", "Exam Review"],
  },
  { label: "Announcements", sub: ["Midterm reminder", "Office hours change"] },
  { label: "Syllabus", sub: ["ASL-201 Syllabus"] },
  { label: "Files", sub: ["lecture_w4.pdf", "vocab_sheet.docx", "rubric.pdf"] },
];

const afterTree = [
  {
    name: "ASL-201",
    type: "root",
    children: [
      {
        name: "syllabus",
        type: "folder",
        children: [
          { name: "ASL-201_Syllabus.md", type: "file", fileKey: "syllabus" },
        ],
      },
      {
        name: "modules",
        type: "folder",
        children: [
          { name: "Week_2_Slides.md", type: "file", fileKey: "week2" },
          { name: "Week_3_Notes.md", type: "file", fileKey: "week3" },
          { name: "Week_4_Lecture.md", type: "file", fileKey: "week4" },
        ],
      },
      {
        name: "assignments",
        type: "folder",
        children: [
          { name: "Assignment_5.md", type: "file", fileKey: "assign5" },
          { name: "Assignment_6.md", type: "file", fileKey: "assign6" },
          { name: "Project_Instructions.md", type: "file", fileKey: "project" },
        ],
      },
      {
        name: "announcements",
        type: "folder",
        children: [
          { name: "Midterm_Reminder.md", type: "file", fileKey: "announce" },
        ],
      },
      {
        name: "resources",
        type: "folder",
        children: [
          { name: "Vocabulary_List.md", type: "file", fileKey: "vocab" },
          { name: "Exam_Review.md", type: "file", fileKey: "exam" },
        ],
      },
    ],
  },
];

const mockPreviews: Record<string, { title: string; content: string }> = {
  week4: {
    title: "Week 4 — Lecture Notes",
    content: `## Topics\n- Classifiers in ASL\n- Spatial grammar\n- Directional verbs\n\n## Key Vocabulary\n- Classifier: CL-1, CL-3, CL-5\n- Spatial referencing\n\n## Assignments\n- Practice classifier sentences\n- Video submission due Friday`,
  },
  week3: {
    title: "Week 3 — Describing People",
    content: `## Topics\n- Vocabulary\n- Grammar\n- Class activities\n\n## Assignments\n- Practice exercise\n- Video submission`,
  },
  week2: {
    title: "Week 2 — Slides",
    content: `## Overview\n- Introduction to ASL handshapes\n- Fingerspelling review\n\n## Practice\n- Handshape drills\n- Partner activity`,
  },
  assign6: {
    title: "Assignment 6",
    content: `## Instructions\nRecord a 2-minute video using at least 5 classifiers from Week 4.\n\n## Rubric\n- Accuracy: 40%\n- Fluency: 30%\n- Vocabulary: 30%\n\n## Due Date\nFriday, 11:59 PM`,
  },
  assign5: {
    title: "Assignment 5",
    content: `## Instructions\nDescribe a person using ASL descriptors covered in Week 3.\n\n## Requirements\n- Minimum 90 seconds\n- Use at least 8 vocabulary terms`,
  },
  project: {
    title: "Project Instructions",
    content: `## Final Project\nCreate a 5-minute ASL narrative.\n\n## Requirements\n- Original story\n- Use classifiers, spatial grammar, and directional verbs\n\n## Submission\nUpload to course portal by end of semester`,
  },
  vocab: {
    title: "Vocabulary List",
    content: `## Unit 3 Vocabulary\n- Family\n- Occupations\n- Descriptors\n- Time signs\n\n## Study Tips\n- Practice each sign 10x\n- Record yourself for review`,
  },
  exam: {
    title: "Exam Review",
    content: `## Midterm Topics\n- Handshapes (Units 1–3)\n- Classifiers\n- Spatial grammar\n\n## Format\n- 20 receptive questions\n- 2 expressive prompts`,
  },
  syllabus: {
    title: "ASL-201 Syllabus",
    content: `## Course Overview\nIntermediate American Sign Language.\n\n## Grading\n- Assignments: 40%\n- Participation: 20%\n- Midterm: 20%\n- Final: 20%\n\n## Policies\n- Attendance required\n- No late submissions`,
  },
  announce: {
    title: "Midterm Reminder",
    content: `## Announcement\nMidterm is next Thursday during regular class time.\n\nBring your student ID. No phones during the exam.\n\nOffice hours this week: Mon & Wed 2–4 PM.`,
  },
};

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("## ")) {
      return (
        <h3
          key={i}
          className="text-sm font-heading font-semibold text-foreground mt-4 mb-1 first:mt-0"
        >
          {line.replace("## ", "")}
        </h3>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li key={i} className="text-xs text-muted-foreground ml-3 list-disc">
          {line.replace("- ", "")}
        </li>
      );
    }
    if (line.trim() === "") return <div key={i} className="h-1" />;
    return (
      <p key={i} className="text-xs text-muted-foreground">
        {line}
      </p>
    );
  });
}

type TreeNode = {
  name: string;
  type: string;
  fileKey?: string;
  children?: TreeNode[];
};

function TreeNodeRow({
  node,
  depth,
  activeFile,
  onFileClick,
}: {
  node: TreeNode;
  depth: number;
  activeFile: string | null;
  onFileClick: (key: string) => void;
}) {
  const [open, setOpen] = useState(depth === 0);
  const isFile = node.type === "file";
  const isActive = isFile && activeFile === node.fileKey;

  if (isFile) {
    return (
      <button
        onClick={() => node.fileKey && onFileClick(node.fileKey)}
        className={`flex items-center gap-1.5 w-full text-left px-2 py-1 rounded-md text-xs transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        <FileText size={12} weight="duotone" className="shrink-0" />
        <span className="truncate">{node.name}</span>
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 w-full text-left px-2 py-1 rounded-md text-xs font-medium text-foreground hover:bg-muted transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {open ? (
          <CaretDown
            size={10}
            weight="duotone"
            className="shrink-0 text-muted-foreground"
          />
        ) : (
          <CaretRight
            size={10}
            weight="duotone"
            className="shrink-0 text-muted-foreground"
          />
        )}
        <FolderOpen
          size={13}
          weight="duotone"
          className="shrink-0 text-primary"
        />
        <span className="truncate">{node.name}</span>
      </button>
      {open && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNodeRow
              key={child.name}
              node={child}
              depth={depth + 1}
              activeFile={activeFile}
              onFileClick={onFileClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function HeroDemo() {
  const [activeFile, setActiveFile] = useState<string | null>("week3");
  const [demoVisible, setDemoVisible] = useState(false);

  const preview = activeFile ? mockPreviews[activeFile] : null;

  return (
    <section
      id="hero-demo"
      className="bg-card min-h-screen flex flex-col justify-center py-16 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Split layout */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16">
          {/* LEFT — Copy + CTAs */}
          <div className="flex-1 lg:max-w-[52%] flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.25rem] tracking-tight leading-tight text-foreground">
                Your Canvas course.{" "}
                <span className="text-primary">Organized.</span> Searchable.
                Yours to keep.
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-prose leading-relaxed">
                CourseVault turns course content you already have access to into
                a clean, searchable archive you can keep, study from, and use
                with note-taking or AI study tools.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 py-3 text-base font-semibold bg-primary text-primary-foreground transition-all duration-150 hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <a
                  href="#hero-demo"
                  onClick={(e) => {
                    e.preventDefault();
                    setDemoVisible(true);
                  }}
                >
                  See Demo
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-3 text-base font-semibold border border-border text-foreground bg-transparent hover:bg-muted transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <a href="#how-it-works-and-pilot">I'm Interested</a>
              </Button>
            </div>

            {/* Reassurance badge */}
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="rounded-full px-3 py-1 text-xs font-medium text-muted-foreground bg-muted border border-border flex items-center gap-1.5"
              >
                <LockSimple size={11} weight="duotone" />
                No Canvas password sharing required.
              </Badge>
            </div>

            {/* Mobile: show demo toggle hint */}
            <p className="text-xs text-muted-foreground lg:hidden">
              Tap <strong>See Demo</strong> to explore the interactive before →
              after below.
            </p>
          </div>

          {/* RIGHT — Interactive Demo */}
          <div
            className={`flex-1 lg:max-w-[48%] flex flex-col gap-4 ${
              demoVisible ? "block" : "hidden lg:flex"
            }`}
          >
            {/* BEFORE / AFTER label row */}
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest font-medium text-muted-foreground">
                Before
              </span>
              <div className="flex-1 h-px bg-border" />
              <div className="flex items-center gap-1 text-xs font-semibold text-primary uppercase tracking-widest">
                <ArrowRight size={13} weight="duotone" />
                CourseVault
              </div>
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs uppercase tracking-widest font-medium text-muted-foreground">
                After
              </span>
            </div>

            {/* Demo panels */}
            <div className="flex flex-col md:flex-row gap-3">
              {/* BEFORE panel */}
              <div className="flex-1 border border-border rounded-xl bg-background overflow-hidden">
                <div className="px-3 py-2 border-b border-border bg-muted flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground opacity-30" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground opacity-30" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground opacity-30" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono truncate">
                    ASL-201 — Canvas
                  </span>
                </div>
                <div className="p-3 flex flex-col gap-1 max-h-64 overflow-y-auto">
                  {beforeItems.map((section) => (
                    <div key={section.label} className="mb-1">
                      <div className="text-xs font-semibold text-foreground px-2 py-1 bg-muted rounded-md mb-0.5">
                        {section.label}
                      </div>
                      {section.sub.map((item) => (
                        <div
                          key={item}
                          className="text-xs text-muted-foreground px-3 py-0.5 truncate border-l border-border ml-2"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow divider — horizontal on mobile, vertical on md+ */}
              <div className="flex md:flex-col items-center justify-center gap-1 py-1 md:py-0">
                <div className="flex-1 h-px md:h-auto md:w-px bg-border md:flex-1" />
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground shrink-0">
                  <ArrowRight
                    size={14}
                    weight="duotone"
                    className="md:rotate-0"
                  />
                </div>
                <div className="flex-1 h-px md:h-auto md:w-px bg-border md:flex-1" />
              </div>

              {/* AFTER panel */}
              <div className="flex-1 border border-border rounded-xl bg-background overflow-hidden">
                <div className="px-3 py-2 border-b border-border bg-muted flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary opacity-60" />
                    <div className="w-2 h-2 rounded-full bg-primary opacity-40" />
                    <div className="w-2 h-2 rounded-full bg-primary opacity-20" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono truncate">
                    CourseVault — ASL-201/
                  </span>
                </div>
                <div className="p-2 max-h-64 overflow-y-auto">
                  {afterTree.map((node) => (
                    <TreeNodeRow
                      key={node.name}
                      node={node}
                      depth={0}
                      activeFile={activeFile}
                      onFileClick={setActiveFile}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Markdown preview pane */}
            {preview && (
              <div className="border border-border rounded-xl bg-background overflow-hidden">
                <div className="px-4 py-2 border-b border-border bg-muted flex items-center gap-2">
                  <FileText
                    size={13}
                    weight="duotone"
                    className="text-primary shrink-0"
                  />
                  <span className="text-xs font-mono text-foreground truncate">
                    {preview.title}
                  </span>
                  <button
                    onClick={() => setActiveFile(null)}
                    className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                    aria-label="Close preview"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-4">
                  <h2 className="text-sm font-heading font-bold text-foreground mb-3">
                    {preview.title}
                  </h2>
                  <ul className="flex flex-col gap-0.5">
                    {renderMarkdown(preview.content)}
                  </ul>
                </div>
              </div>
            )}

            {/* Tap hint */}
            {!activeFile && (
              <p className="text-xs text-muted-foreground text-center">
                Tap any file in the folder tree to preview its contents.
              </p>
            )}
            {activeFile && (
              <p className="text-xs text-muted-foreground text-center">
                Tap another file to switch previews.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
