import React from 'react'

const QuizPannel = ({question, optionA, optionB, optionC, optionD, correctId}) => {

    
  return (
    <div className='flex flex-col text-center gap-5'>
      <h1 className='text-lg text-black'>
       {question}
      </h1>

      <div className='flex flex-row justify-between'>
        <h2 className='border rounded-lg flex-1 p-3 m-2'>{optionA}</h2>
        <h2 className='border rounded-lg flex-1 p-3 m-2'>{optionB}</h2>
      </div>

      
      <div className='flex flex-row justify-between'>
        <h2 className='border rounded-lg flex-1 p-3 m-2'>{optionC}</h2>
        <h2 className='border rounded-lg flex-1 p-3 m-2'>{optionD}</h2>
      </div>

      <div className='p-5 border rounded-lg'>
       You are correct
      </div>

    </div>
  )
}

export default QuizPannel
