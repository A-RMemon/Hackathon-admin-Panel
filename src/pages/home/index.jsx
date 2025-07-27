import React, { useEffect } from 'react'
import Left from '../../../components/Left'
import Right from '../../../components/Right'
import { SectionProvider } from '../../../config/ContextApi'
import Router, { useRouter } from 'next/router';
const index = () => {
    const router = useRouter()
    useEffect(()=>{
        logincheck()
    },[])
    const logincheck = ( ) => {
        const login = localStorage.getItem('login')
        if(login == 'false' ){
            router.push('/login')
            return
        }
    }
    return (
        <div className="mainContainer">
            <SectionProvider>
                <Left />
                <Right />
            </SectionProvider>
        </div>
    )
}

export default index