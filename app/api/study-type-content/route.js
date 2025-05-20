import { db } from "@/config/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/config/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
    const {chapters,courseId,type}=await req.json();
    const PROMPT=`Generate the ${type} on topics : ${chapters}`
    const result=await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
        courseId:courseId,
        type:type
    }).returning({id:STUDY_TYPE_CONTENT_TABLE.id})
   

   const r=await inngest.send({
        name:'studyType.content',
        data: {
            studyType:type,
            prompt:PROMPT,
            courseId:courseId,
            recordId: result[0].id
        }
    })
    
    console.log("Value of R: "+r)
    return NextResponse.json(result[0].id)
    
}

