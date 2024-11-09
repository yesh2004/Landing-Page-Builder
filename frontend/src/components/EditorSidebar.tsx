import React, { useState } from 'react'
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from './ui/card'
import { X, Plus } from 'lucide-react'

interface EditorSidebarProps {
    name: string;
    title: string;
    about: string;
    email: string;
    projects: Project[];
    experiences: Experience[];
    setName: React.Dispatch<React.SetStateAction<string>>;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setAbout: React.Dispatch<React.SetStateAction<string>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    addProjects: () => void;
    addExperiences: () => void;
    updateProjects: (index: number, field: keyof Project, value: string) => void;
    updateExperience: (index: number, field: keyof Experience, value: string) => void;
    removeExperience: (index: number) => void;
    removeProject: (index: number) => void;
    handleFileChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
  }
  interface Experience {
    title: string;
    company: string;
    period: string;
    description: string;
  }
  
  interface Project {
    title: string;
    description: string;
    
  }

const EditorSidebar: React.FC<EditorSidebarProps> = ({ name, title, about, email,experiences,projects,handleFileChange, setName, setTitle, setAbout, setEmail,addProjects,addExperiences,updateExperience,updateProjects,removeExperience,removeProject })=> {
    
  return (
    <div className="w-1/3 p-4 overflow-auto bg-white border-r">
        <h2 className="text-2xl font-bold mb-4">Website Editor</h2>
        <div className="space-y-4 ">
          <div>
          <Label htmlFor="avatar">Avatar:</Label>
          <Input id="avatar" type="file" className='cursor-pointer' accept='image/*' onChange={handleFileChange} />
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="about">About</Label>
            <Textarea id="about" value={about} onChange={(e) => setAbout(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <Button className="w-full">Save Changes</Button>
        </div>
        <div>
          <h3 className='text-lg font-semibold mb-2 mt-4'>Experience</h3>
          {experiences.map((job,index)=>(
              <Card className='mb-4 p-4' key={index}>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <Label className='font-bold'>Experience {index+1}</Label>
                  <Button variant={'ghost'} onClick={()=>removeExperience(index)} ><X className="h-4 w-4" /></Button>
                </div>
                <Input type='text' className='mt-2 mb-2' placeholder='Role' value={job.title}  onChange={(e)=>updateExperience(index,'title',e.target.value)} />
                <Input type='text' className='mt-2 mb-2' placeholder='Company Name' value={job.company} onChange={(e)=>updateExperience(index,'company',e.target.value)} />
                <Input type='text' className='mt-2 mb-2' placeholder='Duration' value={job.period}  onChange={(e)=>updateExperience(index,'period',e.target.value)} />
                <Textarea  className='' placeholder='Description...' value={job.description} onChange={(e)=>updateExperience(index,'description',e.target.value)} />
              </CardContent>
            </Card>
          ))}
          
          
          <Button className='w-full bg-black font-semibold' onClick={addExperiences} ><Plus/> Add Experience</Button>
        </div>
        <div>
          <h3 className='text-lg font-semibold mb-2 mt-4'>Projects</h3>
          {projects.map((project,index)=>(
            <Card className='mb-4 p-4' key={index}>
            <CardContent>
              <div className="flex justify-between items-center mb-2 ">
                <Label className='font-bold'>Project {index+1}</Label>
                <Button variant={'ghost'} onClick={()=>removeProject(index)}><X className="h-4 w-4" /></Button>
              </div>
              <Input type='text' className='mt-2 mb-2' placeholder='Project Name' value={project.title}  onChange={(e)=>updateProjects(index,'title',e.target.value)} />
              <Textarea  className='' placeholder='Project Description...' value={project.description}  onChange={(e)=> updateProjects(index,'description',e.target.value)}/>
            </CardContent>
          </Card>
          ))}
          
         
          <Button className='w-full bg-black font-semibold' onClick={addProjects} ><Plus/> Add Projects</Button>
        </div>
        
      </div>
  )
}

export default EditorSidebar