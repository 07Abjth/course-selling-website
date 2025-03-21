import React from 'react'

export const SideBar = () => {
  return (
    <div >

    <div className='bg-primary h-14 text-center py-4 w-full'>
        <h2 className='text-2xl font-semibold'>E Learn</h2>

        <div>
            <ul className='flex flex-col gap-2 px-2 my-7 '>
            <li className=' hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-2 rounded-lg cursor-pointer'>Courses</li>
            <li className=' hover:bg-slate-400 px-3 py-2 rounded-lg cursor-pointer'>Create-Course</li>
            <li className=' hover:bg-slate-400 px-3 py-2 rounded-lg cursor-pointer'>Profile</li>
            <li className=' hover:bg-slate-400 px-3 py-2 rounded-lg cursor-pointer'>User Management</li>
            <li className=' hover:bg-slate-400 px-3 py-2 rounded-lg cursor-pointer'>Track Progress</li>
            
            </ul>
            
        </div>
         
    </div>
    </div>
  )
}
