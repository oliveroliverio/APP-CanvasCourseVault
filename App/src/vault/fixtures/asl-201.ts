import type { CourseArchive } from "../types";

/**
 * Deterministic sample archive used by the /vault workspace until real capture
 * exists. Dates are fixed literals so the UI renders identically on every run.
 */
export const asl201Archive: CourseArchive = {
  id: "archive-asl-201-fall-2025",
  courseCode: "ASL-201",
  courseName: "Intermediate American Sign Language",
  term: "Fall 2025",
  institution: "Riverside Community College",
  instructor: "Prof. D. Ruiz",
  capturedAt: "2025-10-14T09:12:00Z",
  collections: [
    {
      id: "syllabus",
      label: "Syllabus",
      folderName: "syllabus",
      description: "Course policies, grading, and schedule.",
      items: [
        {
          id: "syllabus-asl-201",
          title: "ASL-201 Syllabus",
          fileName: "ASL-201_Syllabus.md",
          updatedAt: "2025-08-22",
          summary: "Grading breakdown, attendance policy, and unit schedule.",
          details: [
            { label: "Credits", value: "4" },
            { label: "Meets", value: "Mon / Wed 10:00–11:50" },
            { label: "Office hours", value: "Mon / Wed 2:00–4:00" },
          ],
          body: `## Course Overview
Intermediate American Sign Language. Builds on ASL-101 and ASL-102 with
classifiers, spatial grammar, and extended narrative work.

## Grading
- Assignments: 40%
- Participation: 20%
- Midterm: 20%
- Final project: 20%

## Unit Schedule
- Units 1–2: review of handshapes and fingerspelling
- Unit 3: describing people and places
- Unit 4: classifiers and spatial grammar
- Unit 5: narrative construction

## Policies
- Attendance is required; two unexcused absences lower the participation grade.
- Late submissions are not accepted without prior arrangement.
- Voice-off during all in-class activities.`,
        },
      ],
    },
    {
      id: "modules",
      label: "Modules",
      folderName: "modules",
      description: "Weekly lecture material and in-class notes.",
      items: [
        {
          id: "module-week-02",
          title: "Week 2 — Handshapes & Fingerspelling",
          fileName: "Week_02_Handshapes.md",
          updatedAt: "2025-09-05",
          summary: "Handshape review drills and fingerspelling practice.",
          details: [{ label: "Unit", value: "1" }],
          body: `## Topics
- Handshape inventory review
- Fingerspelling at conversational speed
- Numbers 1–100

## In-Class Practice
- Handshape drills in pairs
- Fingerspelled name practice
- Receptive number dictation

## Homework
- 15 minutes of fingerspelling drills
- Review Unit 1 vocabulary video`,
        },
        {
          id: "module-week-03",
          title: "Week 3 — Describing People",
          fileName: "Week_03_Describing_People.md",
          updatedAt: "2025-09-12",
          summary: "Descriptor vocabulary and non-manual markers.",
          details: [{ label: "Unit", value: "3" }],
          body: `## Topics
- Physical descriptors
- Personality and role vocabulary
- Non-manual markers for degree

## Key Vocabulary
- Height, build, hair, eyes
- Occupations
- Family relationships

## Homework
- Describe three family members on video
- Read Unit 3 grammar notes`,
        },
        {
          id: "module-week-04",
          title: "Week 4 — Classifiers & Spatial Grammar",
          fileName: "Week_04_Classifiers.md",
          updatedAt: "2025-09-19",
          summary: "Classifier handshapes, spatial referencing, directional verbs.",
          details: [{ label: "Unit", value: "4" }],
          body: `## Topics
- Classifiers in ASL
- Spatial grammar and scene setup
- Directional verbs

## Key Vocabulary
- CL-1, CL-3, CL-5, CL-B
- Spatial referencing and reference shifting

## In-Class Practice
- Describe a parking lot using CL-3
- Narrate movement between two established locations

## Homework
- Practice classifier sentences
- Video submission due Friday`,
        },
      ],
    },
    {
      id: "assignments",
      label: "Assignments",
      folderName: "assignments",
      description: "Graded submissions with instructions and rubrics.",
      items: [
        {
          id: "assignment-05",
          title: "Assignment 5 — Person Description",
          fileName: "Assignment_05.md",
          updatedAt: "2025-09-15",
          summary: "90-second video describing a person using Unit 3 descriptors.",
          details: [
            { label: "Due", value: "2025-09-19" },
            { label: "Points", value: "25" },
            { label: "Submission", value: "Video upload" },
          ],
          body: `## Instructions
Record a signed description of one person using the descriptors covered in
Week 3. Voice-off.

## Requirements
- Minimum 90 seconds
- At least 8 vocabulary terms from Unit 3
- Appropriate non-manual markers for degree

## Rubric
- Vocabulary accuracy: 40%
- Grammar and non-manual markers: 35%
- Fluency: 25%`,
        },
        {
          id: "assignment-06",
          title: "Assignment 6 — Classifier Narrative",
          fileName: "Assignment_06.md",
          updatedAt: "2025-09-22",
          summary: "Two-minute video using at least five Week 4 classifiers.",
          details: [
            { label: "Due", value: "2025-09-26" },
            { label: "Points", value: "25" },
            { label: "Submission", value: "Video upload" },
          ],
          body: `## Instructions
Record a two-minute narrative that uses at least five classifiers introduced
in Week 4. Establish your spatial references before describing movement.

## Requirements
- Five or more distinct classifiers
- Consistent spatial referencing throughout
- At least two directional verbs

## Rubric
- Classifier accuracy: 40%
- Spatial consistency: 30%
- Fluency: 30%`,
        },
        {
          id: "assignment-final-project",
          title: "Final Project Instructions",
          fileName: "Final_Project.md",
          updatedAt: "2025-10-02",
          summary: "Five-minute original ASL narrative for the end of term.",
          details: [
            { label: "Due", value: "2025-12-05" },
            { label: "Points", value: "100" },
            { label: "Submission", value: "Video upload + outline" },
          ],
          body: `## Final Project
Create a five-minute original ASL narrative.

## Requirements
- Original story, not a translation of an existing text
- Uses classifiers, spatial grammar, and directional verbs
- Includes at least one reference shift
- Written English outline submitted alongside the video

## Milestones
- Outline due week 10
- Draft video due week 13
- Final video due week 15`,
        },
      ],
    },
    {
      id: "announcements",
      label: "Announcements",
      folderName: "announcements",
      description: "Instructor posts, newest first.",
      items: [
        {
          id: "announcement-midterm-reminder",
          title: "Midterm Reminder",
          fileName: "2025-10-06_Midterm_Reminder.md",
          updatedAt: "2025-10-06",
          summary: "Midterm format, date, and what to bring.",
          details: [{ label: "Posted", value: "2025-10-06" }],
          body: `## Announcement
The midterm is next Thursday during regular class time.

Bring your student ID. Phones stay in bags for the full period.

The receptive section is played twice; the expressive section is recorded
one student at a time in the back of the room.

Office hours this week are Monday and Wednesday, 2:00–4:00.`,
        },
        {
          id: "announcement-office-hours-change",
          title: "Office Hours Moved This Week",
          fileName: "2025-09-29_Office_Hours_Change.md",
          updatedAt: "2025-09-29",
          summary: "Wednesday office hours shifted to Thursday morning.",
          details: [{ label: "Posted", value: "2025-09-29" }],
          body: `## Announcement
Wednesday office hours are cancelled this week due to a department meeting.

Replacement slot: Thursday 9:00–11:00 in Building C, room 214.

Email ahead if you need the full hour for final project planning.`,
        },
      ],
    },
    {
      id: "resources",
      label: "Resources",
      folderName: "resources",
      description: "Reference material and study aids.",
      items: [
        {
          id: "resource-vocabulary-list",
          title: "Unit 3 Vocabulary List",
          fileName: "Unit_03_Vocabulary.md",
          updatedAt: "2025-09-10",
          summary: "Descriptor, occupation, and family vocabulary with study tips.",
          body: `## Unit 3 Vocabulary
- Family relationships
- Occupations
- Physical descriptors
- Time signs

## Study Tips
- Practice each sign ten times facing a mirror
- Record yourself and review for handshape accuracy
- Drill receptively with a partner before class`,
        },
        {
          id: "resource-exam-review",
          title: "Midterm Exam Review",
          fileName: "Midterm_Review.md",
          updatedAt: "2025-10-08",
          summary: "Topic list and exam format for the midterm.",
          body: `## Midterm Topics
- Handshapes, Units 1–3
- Classifiers introduced in Unit 4
- Spatial grammar and reference shifting
- Numbers 1–100

## Format
- 20 receptive questions
- 2 expressive prompts

## Preparation
- Review each week's homework video
- Re-watch the Unit 4 classifier demonstration`,
        },
        {
          id: "resource-grammar-reference",
          title: "Grammar Reference Sheet",
          fileName: "Grammar_Reference.md",
          updatedAt: "2025-09-19",
          summary: "One-page reference for word order and non-manual markers.",
          body: `## Word Order
- Topic–comment structure
- Time markers come first
- Rhetorical questions for emphasis

## Non-Manual Markers
- Raised brows for yes/no questions
- Furrowed brows for wh-questions
- Head tilt for conditionals

## Classifier Quick List
- CL-1: a single upright person or thin object
- CL-3: vehicles
- CL-5: crowds and volume
- CL-B: flat surfaces`,
        },
      ],
    },
  ],
};
