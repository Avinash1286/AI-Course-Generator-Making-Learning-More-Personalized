import { db } from "@/config/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req){
    const {courseId,studyType}=await req.json();

    if(studyType=='ALL'){
        const notes=await db.select().from(CHAPTER_NOTES_TABLE).where(eq(CHAPTER_NOTES_TABLE?.courseId,courseId))

        //Get ALL other study type records
        const contentList=await db.select().from(STUDY_TYPE_CONTENT_TABLE).where(eq(STUDY_TYPE_CONTENT_TABLE?.courseId,courseId));
        
        const result={
            notes:notes,
            flashcard:contentList?.find(item=>item.type=='flashcard')?.content?.cards,
            quiz:contentList?.find(item=>item.type=='quiz')?.content?.questions,
            qa:contentList?.find(item=>item.type=='qa')?.content?.qa_pairs
        }
        return NextResponse.json(result)
    }

    else if(studyType=='notes'){
     const notes=await db.select().from(CHAPTER_NOTES_TABLE).where(eq(CHAPTER_NOTES_TABLE?.courseId,courseId)).orderBy(CHAPTER_NOTES_TABLE?.chapterId)
     return NextResponse.json(notes)        
    }
}