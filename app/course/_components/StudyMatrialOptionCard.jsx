"use client"
import React, { useEffect, useState } from 'react'
import MaterialCardItem from './MaterialCardItem';
import axios from 'axios';
import Link from 'next/link';

const StudyMatrialOptionCard = ({courseId,course}) => {
  const [studyTypeContent, setStudyTypeContent]=useState()
  const MaterialList=[
    {
      name: 'Notes',
      desc: 'Friendly personalized notes',
      icon:'/notes.png',
      path: '/notes',
      type: 'notes'
    },
    {
      name: 'Flashcard',
      desc: 'Remeber through flashes of memory',
      icon:'/flashcard.png',
      path: '/flashcards',
      type: 'flashcard'
    },
    {
      name: 'Quiz',
      desc: 'Great way to test your knowledge',
      icon:'/quiz.png',
      path: '/quiz',
      type: 'quiz'
    },

  ]

  useEffect(() => {
     GetStudyMaterial()   
   }, []);

  const GetStudyMaterial=async ()=>{
    const result= await axios.post('/api/study-type',{
      courseId:courseId,
      studyType: 'ALL'
    })
   
    setStudyTypeContent(result?.data)
  }
  return (
    <div className='mt-5 w-full'>
    <div className='w-full flex flex-col items-center justify-center'>
    <h2 className='font-medium text-xl'>Study Materials</h2>

      <div className='grid  grid-cols-2 md:grid-cols-3 gap-5'>
      {MaterialList.map((item,index)=>(
      <MaterialCardItem key={index} course={course} courseId={courseId} item={item} studyTypeContent={studyTypeContent} path={'/course/'+courseId+item.path} refreshData={GetStudyMaterial}/>
        ))
      }
    </div>
      </div>
    </div>
  )
}

export default StudyMatrialOptionCard
