"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import QuizCardItem from './_components/QuizCardItem';

const Quiz = () => {
  const { courseId } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [stepCount,setStepCount]=useState(0);

  useEffect(() => {
    GetQuiz();
  }, [])


  const GetQuiz = async () => {
       try {
        const result = await axios.post('/api/study-type', {
            courseId: courseId,
            studyType: 'ALL'
        });
        
        const quizData = result?.data?.quiz || [];
        setQuiz(quizData);
       
    } catch (error) {
        console.error('Error fetching quiz:', error);
    }
  }

  const manageState=(bType)=>{
      if(bType=='prev'){
        setStepCount(stepCount-1);
      }
      else if(bType=='next'){
        setStepCount(stepCount+1);
      }

  
}
                          

  return quiz &&(
    <div className='mt-10'>
      <div className='flex gap-5 text-center'>
      <div className=' ml-10 w-[100px]'>
      {stepCount!=0&&<Button onClick={()=> manageState('prev')} variant='outline' size="sm">Previous</Button>}
      </div>
       {quiz?.map((Item,index)=>(
        <div key={index} className={`flex-1 w-full h-2 rounded-full ${index<=stepCount? 'bg-blue-700':'bg-gray-200'}`}>
        </div>
       ))}
       <div className='mr-10 w-[100px]'>
       {stepCount!=(quiz.length-1)&&<Button onClick={()=> manageState('next')} variant='outline' size="sm">Next</Button>}
       </div>
      </div>


     <div className='w-full  flex justify-center items-center'>
      <QuizCardItem className='' quiz={quiz[stepCount]}/>
     </div>   

    </div>
  )
}

export default Quiz
