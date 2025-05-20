import { generate_course_outline } from "@/config/AIModel"
import { db } from "@/config/db";
import { STUDY_MATERIAL_TABLE } from "@/config/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server"

export async function POST(req){
    try {
        const {courseId, topic, studyType, difficultyLevel, createdBy} = await req.json()
        console.log(topic, studyType, difficultyLevel, createdBy, courseId)
        
        // Implement retry logic for JSON parsing
        let parsedResult = null;
        let error = null;
        let maxRetries = 3;
        let retryCount = 0;
        
        while (retryCount < maxRetries) {
            try {
                const result = await generate_course_outline(topic, difficultyLevel, studyType)
                parsedResult = JSON.parse(result)
                // If parsing succeeded, break out of the retry loop
                console.log(`Successfully parsed JSON on attempt ${retryCount + 1}`)
                break;
            } catch (err) {
                // JSON parsing failed, increment retry counter
                retryCount++;
                error = err;
                
                console.log(`Attempt ${retryCount}: Failed to parse JSON. Error: ${err.message}`)
                
                // If we've reached max retries, log the final failure
                if (retryCount === maxRetries) {
                    console.error(`Failed to parse valid JSON after ${maxRetries} attempts.`)
                } else {
                    console.log(`Retrying... (${retryCount}/${maxRetries})`)
                }
            }
        }
        
        // Check if we successfully parsed the JSON
        if (parsedResult) {
            // Save the result along with User Input
            const dbResult=await db.insert(STUDY_MATERIAL_TABLE).values({
                courseId: courseId,
                courseType: studyType,
                createdBy: createdBy,
                difficultyLevel: difficultyLevel,
                topic: topic,
                courseLayout: parsedResult
            }).returning({resp:STUDY_MATERIAL_TABLE})
            
            const result=await inngest.send({
                name:'notes.generate',
                data:{
                    course:dbResult[0].resp
                }
            })

            return NextResponse.json({result:dbResult[0]})
        } else {
            // If all retries failed, return an error response
            console.error("All attempts to parse JSON failed:", error?.message)
            return NextResponse.json({ 
                error: "Failed to generate valid course outline. Please try again.", 
                details: error?.message 
            }, { status: 500 })
        }
    } catch (error) {
        console.error("Error in POST request handler:", error)
        return NextResponse.json({ 
            error: "Server error processing request", 
            details: error.message 
        }, { status: 500 })
    }
}