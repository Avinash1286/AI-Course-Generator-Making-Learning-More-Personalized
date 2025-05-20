import React from 'react'

const ChapterListCard = ({course}) => {
  const CHAPTERS=course?.courseLayout.chapters
  return (
    <div className='mt-5'>
      <h2 className='font-medium text-xl'>What you will learn?</h2>
      <div>
        {CHAPTERS?.map((chapter,index)=>(
          <div key={index} className='border p-2 m-2 hover:cursor-pointer hover:bg-gray-300 items-center rounded-lg shadow-md'>
            <h2>Chapter: {chapter?.chapterNumber} {chapter?.chapterTitle}</h2>
            <p className='text-sm text-gray-700'>{chapter?.chapterSummary}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChapterListCard
