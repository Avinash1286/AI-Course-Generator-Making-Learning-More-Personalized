"use client"
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FlashCardItem from '@/app/course/[courseId]/flashcards/_components/FlashCardItem'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const FlashCard = () => {
  const { courseId } = useParams();
  const [flash, setFlash] = useState([[]]);
  const [flipped, setFlipped] = useState(false);
  const [api, setApi] = useState()

  useEffect(() => {
    GetFlash();

  }, [])

  const GetFlash = async () => {
    const result = await axios.post('/api/study-type', {
      courseId: courseId,
      studyType: 'ALL'
    })
    
    setFlash(result?.data.flashcard);     

  }

    
  useEffect(() => {
    if (!api) {
      return
    }
    api.on('select',()=>{
      manageFlip()
    })
  }, [setApi]);
  
  
  const manageFlip=()=>{
    setFlipped(!flipped)
  }

  return flash && (

       <>      

      <div className='mt-20 flex items-center justify-center text-center'>

        <Carousel setApi={setApi}>
                <CarouselContent className='relative w-full max-w-xl mx-auto'>
                  {flash?.map((item,index)=>(
                  <CarouselItem key={index} className='flex items-center justify-center'>
                     <FlashCardItem  isFlipped={flipped} handleClick={manageFlip} front={item.front} back={item.back}/>
                  </CarouselItem>

                  ))}
                </CarouselContent>
                <CarouselPrevious />
                 <CarouselNext />
         </Carousel>


      </div>
</>
  )
}

export default FlashCard
