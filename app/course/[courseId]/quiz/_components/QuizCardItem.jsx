"use client"
import { Button } from '@/components/ui/button';
import { CheckCircle, CircleMinusIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const QuizCardItem = ({quiz}) => {
    
    const [correct, setCorrect]=useState(null);
    const [selected,setSelectedOption]=useState();
     const [disabled, setDisabled]=useState(false); 
   
    const handleOptions=(is_correct, item)=>{
        if(disabled) return;
       setCorrect(is_correct)
       setSelectedOption(item)
       setDisabled(true)
    }
    useEffect(()=>{
     setCorrect(null)
     setSelectedOption()
     setDisabled(false)
    },[quiz])
    useEffect(() => {
        console.log(correct)
    }, [correct]);
  return (
    <div className='mt-10 p-5 flex flex-col justify-center items-center text-center'>
      <h2 className='mb-10 font-medium text-3xl'>{quiz?.question_text}</h2>
        <div className='grid grid-cols-2 gap-5'>
          {quiz?.options.map((item,index)=>(
            <h2 
              onClick={()=> handleOptions(item.is_correct,item)} 
              key={index} 
              className={`w-full border rounded-lg p-5 
                ${selected==item ? 'bg-blue-500 text-white' : ''}
                ${disabled ? 
                  'opacity-70 cursor-not-allowed' : 
                  'hover:bg-gray-400 hover:cursor-pointer'
                }`} 
              variant='outline'
            >
              {item.option_text}
            </h2>
          ))}
        </div>

  {(correct==true)?
    <div className='mt-10 flex items-center justify-center gap-5 text-white bg-green-500 border rounded-lg p-5 w-[700px]'>
      <CheckCircle/> Congratulation!!! 
    </div>
   :
   (correct==false)?
<div className='mt-10 flex items-center justify-center gap-5 text-white bg-red-500 border rounded-lg p-5 w-[700px]'>
      <CircleMinusIcon/> Oops!! 
    </div>
    : ""}
    
    </div>

    
  )
}

export default QuizCardItem
