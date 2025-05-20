import { text } from "drizzle-orm/gel-core";
import { integer, pgTable, varchar, boolean, serial, json } from "drizzle-orm/pg-core";

export const USER_TABLE= pgTable("users", {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
  isMember: boolean().default(false),
  customerId: varchar()
});


export const STUDY_MATERIAL_TABLE=pgTable('studyMaterial',{
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  courseType: varchar().notNull(),
  topic: varchar().notNull(),
  difficultyLevel: varchar().notNull(),
  courseLayout: json(),
  createdBy: varchar().notNull(),
  status: varchar().default('Generating')
})

export const CHAPTER_NOTES_TABLE=pgTable('chapterNotes',{
  id:serial().primaryKey(),
  courseId: varchar().notNull(),
  chapterId: integer().notNull(),
  notes: text()
})


export const STUDY_TYPE_CONTENT_TABLE=pgTable('studyTypeContent',{
  id: serial().primaryKey(),
  courseId:varchar().notNull(),
  content: json(),
  type:varchar().notNull(),
  status: varchar().default('Generating')
})


export const PAYMENT_RECORD_TABLE=pgTable('paymentRecord',{
  id:serial().primaryKey(),
  customerId: varchar(),
  sessionId: varchar()
})