import React from 'react'
import { Outlet } from 'react-router-dom'


function App() {

  return (
   <>
    <div className='w-full flex flex-col'>
      <Outlet/>
    </div>
    </>
  )
}

export default App
