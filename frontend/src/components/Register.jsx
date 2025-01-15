import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Link,useNavigate } from 'react-router-dom'
import { useState,useActionState,useEffect } from 'react'
import { register } from '../Actions/userActions'


const Register = () => {
 const  navigate=useNavigate();
const [formData,setFormData]=useState({ email:'', password:''})
const [state,formAction,isPending]=useActionState(register,{
  success:null,
  error:null
})
useEffect(()=>{
  if(state.success){
    setTimeout(()=>{
navigate('/login')
console.log(state.success)
    },2000)

  }
},[state.success])

const handleChange=(event)=>{
 setFormData({...formData,[event.target.name]:event.target.value})
}
console.log(formData)
  return (
   <>
    <div className='h-screen flex justify-center items-center transform -translate-y-16'>
    <form action={formAction} className='flex flex-col gap-6 max-w-xl w-full px-8'>
      <div className='flex flex-col gap-2'>
      <Label>Email</Label>
      <Input type="email" name='email'
       placeholder='Enter email' 
       value={formData.email}
         onChange={handleChange}
      />
     </div>
     <div className='flex flex-col gap-2'>
      <Label>Password</Label>
      <Input type="password" name='password' 
      placeholder='Enter password' 
      value={formData.password}
      onChange={handleChange}
      />
     </div>
     {state.success?.message && (
            <span className="message successMsg">{state.success.message} {'Redirecting...'}</span>
          )}
          {state.error?.message && (
            <span className="message">{state.error.message}</span>
          )}
     <Button disabled={isPending}>
      {isPending?'Registering':'Register '}
     </Button>
     <span className='text-[#63657b] text-center'>
     Allready have an Account?{'  '}
      <Link to='/Login' className='transition ease-in-out hover:cursor-pointer hover:text-primary hover:underline'>Login</Link>
     </span>
    </form>

    </div>
   </>
  )
}

export default Register