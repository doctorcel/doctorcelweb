import React, { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'

const FloatingWhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const handleWhatsAppClick = (number: string) => {
    const message = encodeURIComponent(`Hola, estoy interesado en un articulo que vi en el sitio web www.doctorcel.co ¿Podrían darme más información?`)
    window.open(`https://wa.me/${number}?text=${message}`, '_blank')
  }

  const toggleOptions = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div 
      className={`fixed bottom-20 right-4 z-50 transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <button
        onClick={toggleOptions}
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
        aria-label="Contactar por WhatsApp"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full animate-pulse">
          2
        </span>
      </button>
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transition-all duration-300 w-64">
          <button
            onClick={() => handleWhatsAppClick('+573004001077')}
            className="w-full text-gray-800 dark:text-white dark:bg-gray-700 text-left px-4 py-3 hover:bg-gray-100 hover:dark:bg-gray-900 transition-colors duration-200 flex items-center"
          >
            <MessageCircle className="w-5 h-5 mr-2 text-green-500" />
            <span className="whitespace-normal">Sede Itagui</span>
          </button>
          <button
            onClick={() => handleWhatsAppClick('+573504089988')}
            className="w-full text-left text-gray-800 dark:text-white dark:bg-gray-700 px-4 py-3 hover:bg-gray-100 hover:dark:bg-gray-900 transition-colors duration-200 flex items-center"
          >
            <MessageCircle className="w-5 h-5 mr-2 text-green-500" />
            <span className="whitespace-normal">Sede San Antonio de Prado</span>
          </button>
        </div>
      )}
      {!isOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          ¡Contáctanos!
        </div>
      )}
    </div>
  )
}

export default FloatingWhatsAppButton