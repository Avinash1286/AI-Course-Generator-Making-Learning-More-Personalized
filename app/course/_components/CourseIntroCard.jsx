import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import React from 'react'

const CourseIntroCard = ({course}) => {
    
    return (
    <div className='flex gap-5 items-center p-5 border shadow-md rounded-lg'>
      <Image className='hidden lg:block md:block' src={'/knowledge.png'} alt='others' width={70} height={70}/>
      <div className='flex flex-col gap-3'>
      <h2 className='font-bold text-2xl'>{course?.courseLayout.courseTitle}</h2>
      <p className='text-sm text-gray-700'>{course?.courseLayout.courseSummary}</p>
      <p className='text-sm flex flex-col text-gray-700'>Total Chapters: {course?.courseLayout.chapters.length}
      <span className='bg-gray-300 text-gray-900 mt-1 w-fit px-2 rounded-full'>{course?.difficultyLevel}</span>
      </p>
      
      </div>
    </div>
  )
}

export default CourseIntroCard
