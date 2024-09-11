'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, Laptop } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function FloatingThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const cycleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('system')
    } else {
      setTheme('dark')
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={cycleTheme}
        className="bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900 rounded-full shadow-lg"
        aria-label="Cambiar tema"
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : theme === 'light' ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Laptop className="h-5 w-5" />
        )}
      </Button>
    </div>
  )
}