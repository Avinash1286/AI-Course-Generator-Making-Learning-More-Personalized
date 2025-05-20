import { db } from "@/config/db";
import { inngest } from "./client";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from '@/config/schema'
import { eq } from "drizzle-orm";
import { generate_course_notes, generate_study_type } from "@/config/AIModel";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const CreateNewUser=inngest.createFunction(
  {id:'create-user'},
  {event: 'user.create'},
  async ({event,step})=>{
    const result= await step.run("Check and Create new user", async ()=>{
      const result = await db.select().from(USER_TABLE).where(eq(USER_TABLE.email, event.data?.user?.primaryEmailAddress?.emailAddress))
        console.log(result)

        if (result?.length == 0) {
            const userResp = await db.insert(USER_TABLE).values({
                name: event.data?.user?.fullName,
                email: event.data?.user?.primaryEmailAddress?.emailAddress
            }).returning({ id: USER_TABLE.id })
            return userResp
        }
        return result
    })

    return result
  }

  // steps is to send welcome email

  //steps to send email notification
)

export const GenerateNotes=inngest.createFunction(
  {id: 'generate-course'},
  {event: 'notes.generate'},
  async ({event,step})=>{
    const {course}=event.data;

    const notesResult= await step.run('Generate Chater Notes', async()=>{
      const Chapters=course?.courseLayout?.chapters;
      const studyType=course?.courseType
      const difficultyLevel=course?.difficultyLevel
      
      Chapters.forEach(async (chapter) => {
        console.log(chapter)
       const result= await generate_course_notes(JSON.stringify(chapter),studyType,difficultyLevel)
       await db.insert(CHAPTER_NOTES_TABLE).values({
        chapterId:chapter.chapterNumber,
        courseId: course?.courseId,
        notes: result
       })
      });
      return 'complete'
    })
    
    //update generating status to generated
    const updateCourseStatusResult=await step.run('Update Course Status', async()=>{
      const result = await db.update(STUDY_MATERIAL_TABLE).set({
        status:'Ready'
      }).where(eq(STUDY_MATERIAL_TABLE.courseId,course?.courseId))
      return 'Success'
    })
  }
)
const generateWithRetries=async (prompt, studyType)=>{
  const maxRetries = 5;
  let attempts = 0;
  
  while (attempts < maxRetries) {
    try {
      const result = await generate_study_type(prompt, studyType);
      const parsedResult = JSON.parse(result);
      return parsedResult; // Successfully parsed, return the result
    } catch (error) {
      attempts++;
      console.log(`Attempt ${attempts} failed: ${error.message}`);
      
      if (attempts >= maxRetries) {
        console.error("Maximum retry attempts reached. Could not parse valid JSON.");
        throw new Error("Failed to parse valid JSON after maximum retries");
      }
      
      // Optional: Add a small delay between retries
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}
export const GenerateStudyTypeContent=inngest.createFunction(
  {id:'Generate Study Type Content'},
  {event: 'studyType.content'},

  async({event, step})=>{
    const {studyType, prompt, courseId,recordId}=event.data;
    const content=await step.run('Generating flashcard', async()=>{
    const parsedResult = await generateWithRetries(prompt, studyType);
    return parsedResult;
    })

    const dbResult= await step.run('Save flashcard Result', async()=>{
      const result= await db.update(STUDY_TYPE_CONTENT_TABLE).set({
        content: content,
        status:'Ready'
      }).where(eq(STUDY_TYPE_CONTENT_TABLE.id,recordId))
      return true;
    })

   return true;
  }


)