'use client'

import React from 'react'
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from 'next/navigation'
import { LogOut, Package, CreditCard, HeadphonesIcon, UserRoundCog } from "lucide-react"

export default function NavBarDashboard() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // Remove 'user' and 'token' from localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    
    // Redirect to the home page
    router.push('/')
  }

  return (
    <nav className="flex flex-col w-64 h-full bg-gray-900 text-gray-300">
      <div className="p-6">
        <Image 
          src="https://res.cloudinary.com/drwqsyyv5/image/upload/f_auto,q_auto/olu2pknu56b1pne2q5vi" 
          width={150} 
          height={150} 
          alt="logo"
          className="w-auto h-auto"
        />
      </div>
      <div className="flex-grow space-y-1 px-3">
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
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors duration-200"
        >
          <LogOut size={18} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </nav>
  )
}

function NavLink({ href, children, icon, isActive }: { href: string, children: React.ReactNode, icon: React.ReactNode, isActive: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
        ${isActive 
          ? 'bg-gray-800 text-white' 
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
        }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}