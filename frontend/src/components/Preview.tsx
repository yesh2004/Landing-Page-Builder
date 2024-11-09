import React,{useState} from 'react'
import { Github, Linkedin, Mail, Twitter, ExternalLink,ArrowRight,Briefcase } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

interface PreviewProps {
  previewURL:string | null;
  name: string;
  title: string;
  about: string;
  email: string;
  projects: Project[];
  experiences: Experience[];
}

  

const Preview: React.FC<PreviewProps> =({previewURL,name,title,about,email,projects,experiences}) =>{
    
  
  return (
    <div className="w-2/3 p-8 overflow-auto bg-gradient-to-b from-yellow-100 to-yellow-200">
    <div className="max-w-4xl mx-auto">
      <Card className="w-full overflow-hidden relative">
        <div className="absolute inset-0 border-[16px] border-black rounded-2xl" style={{ maskImage: 'url("data:image/svg+xml,%3Csvg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="100%" height="100%" fill="none" stroke="black" stroke-width="32" stroke-dasharray="16,16" stroke-dashoffset="0" stroke-linecap="round"/%3E%3C/svg%3E")', maskSize: '100% 100%' }}></div>
        <CardContent className="p-8 space-y-12 relative z-10">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
              <Image
                src={previewURL? previewURL:'./placeholder.svg'}
                alt={name}
                width={160}
                height={160}
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">{name}</h1>
              <p className="text-2xl text-gray-600 mt-2">{title}</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">About Me</h2>
            <p className="text-lg text-gray-600">{about}</p>
          </div>

          <div>
            {experiences.length>0? 
            <>
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Experience</h2>
            <div className="space-y-6">
              {experiences.map((job, index) => (
                <Card key={index} className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Briefcase className="w-6 h-6 mt-1 mr-4 text-yellow-600" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                        <p className="text-gray-600">{job.company} | {job.period}</p>
                        <p className="mt-2 text-gray-700">{job.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            </>
            
            
            :<></>}

            
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Projects</h2>
            <div className="grid gap-6">
              {
                projects.length>0?
                <>
                {projects.map((project, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors duration-300">{project.title}</h3>
                        <p className="text-gray-600 mt-2">{project.description}</p>
                      </div>
                      <ArrowRight className="text-gray-400 group-hover:text-yellow-600 transition-colors duration-300" />
                    </div>
                  </CardContent>
                </Card>
              ))}
                </>
                :
                <>
                </>
              }

              
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Contact</h2>
            <p className="text-xl text-gray-600">{email}</p>
          </div>

          <div className="flex justify-center space-x-6 pt-8 border-t border-gray-300">
            <Button size="lg" variant="outline" className="rounded-full">
              <Github className="h-5 w-5 mr-2" />
              GitHub
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              <Linkedin className="h-5 w-5 mr-2" />
              LinkedIn
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              <Twitter className="h-5 w-5 mr-2" />
              Twitter
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              <Mail className="h-5 w-5 mr-2" />
              Email
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
  )
}

export default Preview