import React from 'react'
import Users from './Users'
import { useSection } from '../config/ContextApi'
import Orders from './Orders'
import Products from './Products'
import Help from './Help'

const Right = () => {
    const {setActiveSection,activeSection} = useSection()
  return (
    <div className='rightContainer'>

        {activeSection == 'users'?<Users/> :
        activeSection== 'orders'? <Orders/>:
        activeSection == "Products"? <Products/> :
        activeSection == "help"? <Help/> : ""
        }

    </div>
  )
}

export default Right