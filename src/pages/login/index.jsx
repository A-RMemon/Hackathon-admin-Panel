import React, { useState } from 'react'
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from '../../../config/Firebase';
import Router, { useRouter } from 'next/router';
const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret,setSecret] = useState('')
  const loginBtn = async () => {
try {
  const querySnapshot = await getDocs(collection(db, "authlogin"));
querySnapshot.forEach((doc) => {
  if(doc.data()['email'] == email && doc.data()['password'] == password && doc.data()['secret'] == secret){
    console.log('login success')
    localStorage.setItem('login','true')
    router.push('/home')
  }else{
    alert('Please Enter a Valid Acc')
  }
});

} catch (error) {
  alert(error)
}
  }
  return (
    <div className="loginParent">
      <div className="loginChild">
      <div className="loginHeader">
      <h1>Log In</h1>
      </div>

       <div className="loginBody" style={{paddingTop:'20px'}}>
      <input type="email" placeholder='Email' name="" id="email" onChange={(e)=>setEmail(e.target.value)} autoComplete='off'/>
      <input type="password" placeholder='Password' name="" id="password" onChange={(e)=>setPassword(e.target.value)} autoComplete='off'/>
      <input type="password" id='secret' placeholder='Secret' onChange={(e)=>setSecret(e.target.value)} autoComplete='off'/>
      <button onClick={()=>loginBtn()}> Login</button>
    </div>
    </div>
    </div>
   
  )
}

export default Login