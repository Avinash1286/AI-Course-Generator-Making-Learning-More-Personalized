"use client"
import React, { useState } from 'react'

import SelectOption from './_components/SelectOption'
import TopicInput from './_components/TopicInput'
import { Button } from '@/components/ui/button'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { toast } from "sonner"

const Create = () => {
  const [step, setStep]=useState(0);
  const [formData, setFormData]=useState([]);
  const {user}=useUser();
  const [loading, setLoading]=useState(false)
  const router=useRouter()
  const handleUserInput=(fieldName, fieldValue)=>{
     setFormData(prev=>({
      ...prev,[fieldName]:fieldValue
     }))
  }

   console.log(formData)
    const generateCourseOutline= async()=>{
    const courseId=uuidv4();
    setLoading(true)
    console.log("enter in the loop")

    const result= await axios.post('/api/generate-course-outline',{
      courseId:courseId,
      ...formData,
      createdBy: user?.primaryEmailAddress?.emailAddress
    })
    setLoading(false)
    router.replace('/dashboard')
    toast("Your course will be ready soon.")
  }

  return (
    <div className='flex flex-col items-center  p-5 md:px-24 lg:px-36 mt-20'>
      <h2 className='font-bold text-4xl text-blue-700'>Start Building Your Personal Study Material
      </h2>

      <p className='text-gray-500 text-lg'>Fill the details in order to generate study material for you
      </p>
    

     <div className='mt-10'>
      {step==0? <SelectOption selectedStudyType={(value)=>handleUserInput('studyType',value)}/>: <TopicInput
        setTopic={(value)=> handleUserInput('topic',value)}
        setDifficultyLevel={(value)=> handleUserInput('difficultyLevel',value)}
      />}
     </div>

     <div className='flex justify-between w-full mt-32'>
     {step!=0 ? <Button variant='outline' onClick={()=> setStep(step-1)}>Previous</Button>:'-'}

     {step==0 ? <Button className='bg-blue-700' onClick={()=> setStep(step+1)}>Next</Button>
     :
     <Button onClick={generateCourseOutline} disabled={loading}>{loading? <Loader className='animate-spin'/>:'Generate'}</Button>}
     </div>
    </div>
  )
}

export default Create
