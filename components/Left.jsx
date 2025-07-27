import React, { createContext, useContext, useState } from 'react'
import { SectionProvider, useSection } from '../config/ContextApi'
import Router, { useRouter } from 'next/router';

const Left = () => {
    const router = useRouter()
    const logout = ( ) => {
      localStorage.setItem('login','false')
      router.push('/login')
    }
    const {setActiveSection,activeSection} = useSection()
  return (
    <div className='leftContainer'>
        <h1>Coffee</h1>
        <div className="leftChild">
            <button className='leftbtn' onClick={()=>setActiveSection('users')}>Users</button>
            <button className='leftbtn' onClick={()=>setActiveSection('orders')}>Appointments</button>
            <button className='leftbtn' onClick={()=>setActiveSection('help')}>Help</button>
            <button className='leftbtn' onClick={()=>setActiveSection('Products')}>Products</button>
            <button className='leftbtn' onClick={()=>logout()}>Logout</button>
        </div>
    </div>
  )
}

export default Left