import React from 'react'
import ReactCardFlip from 'react-card-flip';

const FlashCardItem = ({isFlipped,handleClick, front, back}) => {
  return (
    <div onClick={handleClick}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className='p-4 bg-blue-500 text-white flex items-center justify-center rounded-lg cursor-pointer h-[250px] w-[200px] md:h-[350px] md:w-[300px] shadow-lg'>
          {front}
          {/* <button onClick={handleClick}>Click to flip</button> */}
        </div>

        <div className='p-4 bg-white text-blue-500 flex items-center justify-center rounded-lg cursor-pointer h-[250px] w-[200px] shadow-lg md:h-[350px] md:w-[300px]'>
          {back}
          {/* <button onClick={handleClick}>Click to flip</button> */}
        </div>
      </ReactCardFlip>
    </div>
  )
}

export default FlashCardItem
