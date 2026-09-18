/**
 * Data model for a captured course archive.
 *
 * The vault UI renders exclusively from these structures, so a real capture
 * pipeline can later produce the same shapes without any UI changes.
 */

/** The fixed set of top-level folders a course archive is organized into. */
export type VaultCollectionId =
  | "syllabus"
  | "modules"
  | "assignments"
  | "announcements"
  | "resources";

/** A labelled key/value pair shown alongside an item, e.g. "Due · Friday". */
export interface VaultItemDetail {
  label: string;
  value: string;
}

/** A single archived piece of course content. */
export interface VaultItem {
  /** Stable identifier, unique across the whole archive. */
  id: string;
  title: string;
  /** Name this item gets in a filesystem export. */
  fileName: string;
  /** ISO-8601 date of the content's last change in Canvas. */
  updatedAt: string;
  summary: string;
  details?: VaultItemDetail[];
  /** Markdown source of the item's content. */
  body: string;
}

/** One folder of the archive, holding items of a single kind. */
export interface VaultCollection {
  id: VaultCollectionId;
  /** Display name, e.g. "Assignments". */
  label: string;
  /** Folder name in a filesystem export, e.g. "assignments". */
  folderName: string;
  description: string;
  items: VaultItem[];
}

/** A complete archive of one course. */
export interface CourseArchive {
  id: string;
  courseCode: string;
  courseName: string;
  term: string;
  institution: string;
  instructor: string;
  /** ISO-8601 timestamp of when this archive was captured. */
  capturedAt: string;
  collections: VaultCollection[];
}
