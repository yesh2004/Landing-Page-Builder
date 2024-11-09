"use client"
import EditorSidebar from '@/components/EditorSidebar'
import Preview from '@/components/Preview'
import React,{useState} from 'react'

function Editor() {
  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [name, setName] = useState('Jane Doe')
  const [title, setTitle] = useState('Web Developer')
  const [about, setAbout] = useState('Passionate web developer with 5 years of experience in creating responsive and user-friendly websites.')
  const [email, setEmail] = useState('jane.doe@email.com')
  const [projects, setProjects] = useState([
    { title: "E-commerce Platform", description: "A fully responsive online store with secure payment integration and real-time inventory management." },
    { title: "Social Media Dashboard", description: "Centralized platform for managing multiple social media accounts with analytics and scheduling features." },
    { title: "Portfolio Website Generator", description: "Tool for creating personalized portfolio websites with customizable templates and easy content management." },
  ])
  const [experiences, setExperiences] = useState([
    { title: "Senior Developer", company: "Tech Innovators Inc.", period: "2020 - Present", description: "Lead developer for multiple high-profile projects, mentoring junior developers, and implementing best practices." },
    { title: "Full Stack Developer", company: "WebSolutions Co.", period: "2018 - 2020", description: "Developed and maintained various web applications using React and Node.js, improving performance and user experience." },
    { title: "Junior Developer", company: "StartUp Ventures", period: "2016 - 2018", description: "Assisted in the development of innovative web applications, focusing on front-end technologies and responsive design." },
  ])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile)); // Generate a preview URL
    }
  };
  const addProjects=()=>{
    setProjects([...projects,{title:"",description:""}])
  }
  
  const addExperiences=()=>{
    setExperiences([...experiences,{title:"",company:"",period:"",description:""}])
  }

  const updateProjects=(index: number, field: keyof typeof projects[number], value: string)=>{
    const updatedProject=[...projects]
    updatedProject[index][field]=value
    setProjects(updatedProject)

  }
  const updateExperience = (index: number, field: keyof typeof experiences[number], value: string) => {
    const updatedExperiences = [...experiences]
    updatedExperiences[index][field] = value
    setExperiences(updatedExperiences)
  }

  const removeExperience = (index:number) => {
    setExperiences(experiences.filter((_, i) => i !== index))
  }
  const removeProject = (index:number) => {
    setProjects(projects.filter((_, i) => i !== index))
  }
  return (
    <div className="flex h-screen bg-gray-100">
        <EditorSidebar name={name} title={title} about={about} email={email} experiences={experiences} projects={projects} handleFileChange={handleFileChange} setName={setName}  setTitle={setTitle} setAbout={setAbout} setEmail={setEmail} addProjects={addProjects} addExperiences={addExperiences} updateProjects={updateProjects} updateExperience={updateExperience} removeExperience={removeExperience} removeProject={removeProject} />
        <Preview previewURL={previewURL} name={name} title={title} about={about} email={email} projects={projects} experiences={experiences} />
    </div>
  )
}

export default Editor