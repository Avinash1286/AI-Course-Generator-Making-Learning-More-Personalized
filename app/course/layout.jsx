import React from 'react'
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader'

const layout = ({children}) => {
  return (
    <div>
       <DashboardHeader/>
      <div>
        {children}
      </div>
    </div>
  )
}

export default layout
