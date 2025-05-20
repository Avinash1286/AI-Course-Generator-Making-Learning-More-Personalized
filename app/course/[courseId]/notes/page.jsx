"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ViewNotes = () => {
    const {courseId}=useParams();
    const [notes, setNotes]=useState();
    const [stepCount,setStepCount]=useState(0);
    useEffect(()=>{
      GetNotes();
    },[])
    const GetNotes=async ()=>{
    const result=await axios.post('/api/study-type',{
        courseId: courseId,
        studyType: 'notes'
    })
    console.log(result?.data);
    setNotes(result?.data);
    }
  
    return notes&&(
    <div className='m-5'>
      <div className='flex gap-5 text-center'>
      {stepCount!=0&&<Button onClick={()=> setStepCount(stepCount-1)} variant='outline' size="sm">Previous</Button>}
       {notes?.map((Item,index)=>(
        <div key={index} className={`w-full h-2 rounded-full ${index<=stepCount? 'bg-blue-700':'bg-gray-200'}`}>
        </div>
       ))}
       {stepCount!=(notes.length-1)&&<Button onClick={()=> setStepCount(stepCount+1)} variant='outline' size="sm">Next</Button>}
      </div>

      <div className='mt-5'>
        <div dangerouslySetInnerHTML={{__html:(notes[stepCount]?.notes)?.replace('```html','')}}>
            
        </div>
      </div>
    </div>
  )
}

export default ViewNotes
