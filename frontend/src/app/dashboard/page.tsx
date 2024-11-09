"use client"
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React, { useEffect,useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function page() {
  const [userId,setUserId]=useState("")
  const [username,setUserName]=useState("")
  
  const router=useRouter()

  useEffect(()=> {
    fetch('http://localhost:8000/api/user', {
      method: 'GET',
      credentials: 'include'
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Not authenticated');
        }
      })
      .then((data) => {
        // Set user data in state
        console.log(data)
        setUserId(data.id);
        
        setUserName(data.username);
        localStorage.setItem("username",data.username)
      })
      .catch((err) => {
        console.error(err);
        router.push("/login");
      });
  },[])
  return (
    <div className='p-5'>
        <h1 className='text-3xl font-bold mb-6 text-gray-800 uppercase'>Your Pages {username}</h1>
        <div className="">
          <Dialog>

          
            <Card className='h-[250px] w-[250px] flex justify-center content-center cursor-pointer hover:bg-gray-200 transition ease-in'>
                <CardContent className=' flex justify-center content-center'>
                <DialogTrigger> <Plus className='mt-auto mb-auto' size={100}/> </DialogTrigger>
                </CardContent>
                <DialogContent onInteractOutside={(e) => {e.preventDefault();}}>
                  <DialogHeader>
                    <DialogTitle>Create A Landing Page</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
            </Card>
            </Dialog>
            

        </div>
    </div>
  )
}

export default page