"use client"
import { CourseCountContext } from '@/app/_context/CourseCountContext'
import { Button } from '@/components/ui/button'
import { Progress } from "@/components/ui/progress"

import { LayoutDashboard, Shield, UserCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'

const Sidebar = () => {

  const path=usePathname();
   const {totalCourse, setTotalCourse}=useContext(CourseCountContext);
  
  const MenuList=[
    {
      name:'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard'
    },
    {
      name:'Upgrade',
      icon: Shield,
      path: '/dashboard/upgrade'
    },
    {
      name:'Profile',
      icon: UserCircle,
      path: '/dashboard/profile'
    },
  ]
  return (
    <div className='h-screen shadow-md p-5'>
      <div className='flex items-center gap-2'>
     
        <Image src={'/logo.svg'} alt='logo' width={40} height={40}/>
         <h2 className='font-bold text-2xl'>Easy Study</h2>
      </div>
      <div className='mt-10'>
      <Link href={'/create'}>
        <Button className='w-full bg-blue-700 hover:bg-blue-900'>+ Create New</Button>
      </Link>
        <div className='mt-5'>
          {MenuList.map((menu,index)=>(
            <Link key={index}  href={`${menu.path}`}>
            <div className={`flex gap-5 items-center p-3 hover:bg-slate-200 rounded-lg cursor-pointer mt-3 ${path==menu.path&&'bg-slate-200'}`}>
              <menu.icon/>
              <h2>{menu.name}</h2>
            </div>
            </Link>
          ))
          }
        </div>
      </div>
      <div className='border p-3 bg-slate-100 rounded-lg absolute bottom-10 w-[85%]'>
        <h2 className='text-lg mb-2'>Available Credits: 100</h2>
        <Progress value={(totalCourse/100)*100}/>
        <h2 className='text-sm mt-1'>{totalCourse} Out of 100 Credits</h2>
        <Link href={'/dashboard/upgrade'} className='text-blue-500  text-xs'>Upgrade for more</Link>
      </div>

    </div>
  )
}

export default Sidebar
