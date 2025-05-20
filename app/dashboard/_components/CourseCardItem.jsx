import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RefreshCcw } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CourseCardItem = ({course}) => {
  return (
    <div className='border rounded-lg shadow-md p-4'>
      <div>
        <div className='flex justify-between items-center'>
            <Image src={'/knowledge.png'} alt='other' width={50} height={50}/>

            <h2 className='text-[10px] p-1 px-2 rounded-full bg-blue-500 text-white'>15 MAY 2025</h2>
        </div>
        <h2 className='mt-3 font-medium text-lg'>{course?.courseLayout?.courseTitle}</h2>
        <p className=' mt-2 text-xs line-clamp-2 text-gray-500'>{course?.courseLayout?.courseSummary}</p>

        <div className='mt-3'>
            <Progress value={0}/>
        </div>

        <div className='mt-3 flex justify-end'>
            {course.status=='Generating'
            ?
            <h2 className='text-sm p-1 px-2 rounded-full bg-gray-400 flex items-center text-white gap-2'><RefreshCcw className='h-5 w-5 animate-spin'/>Generating...</h2>
            :
            <Link href={`/course/${course.courseId}`}>
            <Button className='bg-blue-500'>View</Button>
            </Link>
            }
            
        </div>
      </div>
    </div>
  )
}

export default CourseCardItem
