import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Profile = () => {
  return (
    <div className='mt-10'>
     <h2 className='text-lg font-medium'>Manage Your Profile</h2>
      <UserButton/>
    </div>
  )
}

export default Profile
