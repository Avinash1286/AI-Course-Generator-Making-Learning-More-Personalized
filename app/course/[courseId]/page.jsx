"use client"
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseIntroCard from '@/app/course/_components/CourseIntroCard'
import ChapterListCard from '@/app/course/_components/ChapterListCard'
import StudyMatrialOptionCard from '@/app/course/_components/StudyMatrialOptionCard'

const Course = () => {
    const {courseId}=useParams();
    const [course,setCourse]=useState();
    useEffect(() => {
        GetCourse();
    }, []);
    const GetCourse=async ()=>{
        const result=await axios.get('/api/courses?courseId='+courseId)
        console.log(result)
        setCourse(result.data.result)
    }
  return (
    <div>
     
      <div className='mx-10  mt-10'>
      {/* course intro */}
      <CourseIntroCard course={course}/>
      {/* study materials options */}
       <StudyMatrialOptionCard course={course} courseId={courseId}/>
      {/* chapter list */}
      <ChapterListCard course={course}/>
      </div>
    </div>
  )
}

export default Course
