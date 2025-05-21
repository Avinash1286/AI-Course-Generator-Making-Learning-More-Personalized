import React from 'react'
import WelcomeBanner from '@/app/dashboard/_components/WelcomeBanner'
import CourseList from '@/app/dashboard/_components/CourseList'

const Dashboard = () => {
  return (
    <div>
      <WelcomeBanner/>
      <CourseList/>
    </div>
  )
}

export default Dashboard
