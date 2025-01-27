import React from 'react'
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger } from './ui/dropdown-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'



const LOCAL_URL = "http://localhost:5000";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://mongo-todo-authentication.netlify.app";
const BACKEND_URL = import.meta.env.MODE === "production" ? VITE_BACKEND_URL : LOCAL_URL;


const Profile = () => {
  const navigate=useNavigate();
  async function handleLogout() {
    
    try{
      const respones=await fetch(`${BACKEND_URL}/api/user/logout`,{
        //const res = await fetch(`${BACKEND_URL}/api/user/register`
        method:'POST',
        credentials:'include'
      })

      if(!respones.ok){
        throw new Error ('logout  failed. please try again.')
      }
      navigate('/login')
      
    }
    catch(error){
        toast.error(error.message)
    }
  }
  return (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <FontAwesomeIcon icon={faCircleUser} className='transition ease-in hover:cursor-pointer size-7'/>
<DropdownMenuContent>
  <DropdownMenuItem>
    Profile
  </DropdownMenuItem>
  <DropdownMenuItem onClick={handleLogout}>
Logout
  </DropdownMenuItem>
</DropdownMenuContent>
    </DropdownMenuTrigger>
  </DropdownMenu>
  )
}

export default Profile;