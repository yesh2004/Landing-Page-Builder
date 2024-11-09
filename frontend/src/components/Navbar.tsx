'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, X } from 'lucide-react'

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center justify-between p-4 lg:px-8 rounded-full bg-white bg-opacity-80 backdrop-blur-md shadow-lg" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <svg className="h-8 w-auto text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700">
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <Link href="/" className="text-lg font-semibold leading-6 text-gray-900">
                    Home
                  </Link>
                  <Link href="/about" className="text-lg font-semibold leading-6 text-gray-900">
                    About
                  </Link>
                  <Link href="/services" className="text-lg font-semibold leading-6 text-gray-900">
                    Services
                  </Link>
                  <Link href="/contact" className="text-lg font-semibold leading-6 text-gray-900">
                    Contact
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link href="/" className="text-sm font-semibold leading-6 text-gray-900">
              Home
            </Link>
            <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
              About
            </Link>
            <Link href="/services" className="text-sm font-semibold leading-6 text-gray-900">
              Services
            </Link>
            <Link href="/contact" className="text-sm font-semibold leading-6 text-gray-900">
              Contact
            </Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Button variant="ghost" size="icon" className="text-gray-700" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <span className="sr-only">Search</span>
              <Search className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
        </nav>
      </div>
      {isSearchOpen && (
        <div className="absolute inset-x-0 top-full mt-4">
          <div className="mx-auto max-w-2xl transform rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5">
            <form className="flex">
              <Input
                type="text"
                className="w-full"
                placeholder="Search..."
                autoFocus
              />
              <Button type="submit" variant="ghost" size="icon" className="ml-2">
                <Search className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="ml-2" onClick={() => setIsSearchOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </header>
  )
}