"use client"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { RefreshCcw } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const MaterialCardItem = ({item, studyTypeContent, path,course, courseId,refreshData}) => {
  const [loading,setLoading]=useState(false);
  //console.log(studyTypeContent)
  
  const GenerateContent=async (type)=>{
    
    setLoading(true)
    let chapters='';
    course?.courseLayout.chapters.forEach((chapter)=>{
      chapters=chapters+','+chapter?.chapterTitle;
    })
    
    const result=await axios.post('/api/study-type-content',{
      chapters: chapters,
      courseId: course?.courseId,
      type:type
    })
    setLoading(false)
    refreshData(true)
  }

  return(
    <div className=
    {`border shadow-md rounded-lg flex flex-col items-center p-5 mt-2 
    ${studyTypeContent?.[item.type]?.length==null&&'grayscale'}`}>
      {studyTypeContent?.[item.type]?.length==null
      ?
      <h2 className='mb-3 p-1 px-2 bg-gray-500 text-white rounded-full text-[10px]'>Generate</h2>
      :
      <h2 className='mb-3 p-1 px-2 bg-green-500 text-white rounded-full text-[10px]'>Ready</h2>}
      <Image src={item.icon} width={50} height={50} alt='image'/>
      <h2 className='font-medium'>{item.name}</h2>
      <p className='text-gray-500 text-sm text-center'>{item.desc}</p>
      {studyTypeContent?.[item.type]?.length==null
      ?
      <Button disabled={loading} onClick={()=>GenerateContent(item.type)} className='mt-3  w-full' variant='outline'>{loading&&<RefreshCcw className='animate-spin'/>} Generate</Button>
      :
      <div className='w-full flex mt-3 items-center justify-center' >
      <Link className='w-full' href={path}>
      <Button className='w-full'  variant='outline'>View</Button>
      </Link>
      </div>
      }
    </div>
  )
}

export default MaterialCardItem
