"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/config/db'
import { USER_TABLE } from '@/config/schema'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

const Payment = () => {

  return (
    <div className='mt-20'>
    <h2 className='text-lg font-medium'>Comming soon, Till enjoy for free!!</h2>
    </div>
  )
}

export default Payment
