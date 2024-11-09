"use client"
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
function Login() {
    const [username,setUserName]=useState("");
    const [password,setPassword]=useState("");

    const router=useRouter()
    async function SignIn(e:FormEvent){
        e.preventDefault()
        const data={
            username:username,
            password:password
        }

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data),
          })
          if(response.ok){
            router.push("/dashboard")
          }else{
            alert("Username or password incorrect")
          }
       
    }
  return (
    <div className='flex justify-center content-center pt-[250px] h-auto '>
        <Card className='w-[500px] p-7'>
            <CardHeader className='text-center text-3xl font-extrabold uppercase'>
                Login
            </CardHeader>
            <CardContent>
            <form >
          <div className="grid w-full items-center gap-7">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="username" type='text' value={username} onChange={(e)=>setUserName(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="password" type='password' value={password} onChange={(e)=> setPassword(e.target.value)} />
            </div>
           
          </div>
        </form>
            </CardContent>
            <CardFooter className='flex content-center justify-center p-3'>
                <Button className='text-xl font-bold uppercase p-3' type='submit' onClick={SignIn}>Login</Button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default Login