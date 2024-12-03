'use client'

import React, { useState, useEffect } from 'react'
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from 'next/navigation'
import { LogOut, Package, CreditCard, HeadphonesIcon, UserRoundCog, Menu } from 'lucide-react'

export default function NavBarDashboard() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/')
  }

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>
      <nav className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed md:static top-0 left-0 z-10 flex flex-col w-64 h-full 
        bg-gray-300 dark:bg-gray-900 text-gray-800 dark:text-gray-200
        transition-transform duration-300 ease-in-out md:translate-x-0
      `}>
        <div className="p-6">
          <Image 
            src="https://res.cloudinary.com/drwqsyyv5/image/upload/f_auto,q_auto/olu2pknu56b1pne2q5vi" 
            width={150} 
            height={150} 
            alt="logo"
            className="w-auto h-auto"
          />
        </div>
        <div className="flex-grow space-y-1 px-3 ">
          <NavLink href="/dashboard/productsmanagement" icon={<Package size={18} />} isActive={pathname === '/dashboard/productsmanagement'}>
            Productos
          </NavLink>
          <NavLink href="/dashboard/invoice" icon={<CreditCard size={18} />} isActive={pathname === '/dashboard/billing'}>
            Facturación
          </NavLink>
          <NavLink href="/dashboard/techservice" icon={<HeadphonesIcon size={18} />} isActive={pathname === '/dashboard/techsupport'}>
            Servicio Técnico
          </NavLink>
          <NavLink href="/dashboard/users" icon={<UserRoundCog size={18} />} isActive={pathname === '/dashboard/users'}>
            Usuarios
          </NavLink>
        </div>
        <div className="p-4 mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm 
                       bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 
                       hover:bg-gray-300 dark:hover:bg-gray-700 
                       rounded-md transition-colors duration-200"
          >
            <LogOut size={18} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </nav>
    </>
  )
}

function NavLink({ href, children, icon, isActive }: { href: string, children: React.ReactNode, icon: React.ReactNode, isActive: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
        ${isActive 
          ? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white' 
          : 'text-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
        }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}

