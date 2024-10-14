import React, { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { Article } from '../../types'
import { Button } from "@/components/ui/button/buttoncard"
import { Phone, Camera, HardDrive, Database, Battery, Cpu, Monitor, ChevronLeft, ChevronRight, X, MessageCircle } from 'lucide-react'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isWhatsAppOptionsOpen, setIsWhatsAppOptionsOpen] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const modalContentRef = useRef<HTMLDivElement>(null)

  const images = [article.imageUrl1, article.imageUrl2, article.imageUrl3, article.imageUrl4].filter(Boolean)

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }, [images.length])

  const startProgressAnimation = useCallback(() => {
    if (progressRef.current) {
      progressRef.current.style.transition = 'none'
      progressRef.current.style.width = '0%'
      setTimeout(() => {
        if (progressRef.current) {
          progressRef.current.style.transition = 'width 3s linear'
          progressRef.current.style.width = '100%'
        }
      }, 10)
    }
  }, [])

  useEffect(() => {
    if (isModalOpen && images.length > 1 && !isFullscreen) {
      startProgressAnimation()
      timeoutRef.current = setTimeout(nextImage, 3000)
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
    }
  }, [isModalOpen, images.length, nextImage, isFullscreen, startProgressAnimation, currentImageIndex])

  // Prevent auto-scroll when image changes
  useEffect(() => {
    if (modalContentRef.current) {
      const scrollPosition = modalContentRef.current.scrollTop
      modalContentRef.current.style.overflow = 'hidden'
      setTimeout(() => {
        if (modalContentRef.current) {
          modalContentRef.current.style.overflow = 'auto'
          modalContentRef.current.scrollTop = scrollPosition
        }
      }, 100)
    }
  }, [currentImageIndex])

  const ImageSlider = () => (
    <div className='flex h-full items-center'>
      <div className="relative w-full h-64 md:h-96 group bg-transparent">
        {images.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <Image
              src={src || '/placeholder.svg?height=400&width=400'}
              alt={`${article.name} - Image ${index + 1}`}
              layout="fill"
              objectFit="contain"
              className="rounded-lg cursor-pointer"
              onClick={() => setIsFullscreen(true)}
            />
          </div>
        ))}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 z-20">
              <div
                ref={progressRef}
                className="h-full bg-green-500 transition-all duration-300 ease-linear"
              ></div>
            </div>
          </>
        )}
      </div>
    </div>
  )

  const FullscreenImage = () => {
    if (typeof window === 'undefined') return null;

    return createPortal(
      <div
        className="fixed inset-0 bg-black bg-opacity-75 z-[9999] flex items-center justify-center"
        onClick={() => setIsFullscreen(false)}
      >
        <div
          className="relative w-full h-full max-w-4xl max-h-4xl p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={images[currentImageIndex] || '/placeholder.svg?height=800&width=800'}
            alt={`${article.name} - Fullscreen`}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200 ease-in-out z-[10000]"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>,
      document.body
    );
  }

  const handleWhatsAppClick = (number: string) => {
    const message = encodeURIComponent(`Hola, estoy interesado en el ${article.brand} ${article.name}. ¿Podrían darme más información?`)
    window.open(`https://wa.me/${number}?text=${message}`, '_blank')
    setIsWhatsAppOptionsOpen(false)
  }

  const toggleWhatsAppOptions = () => {
    setIsWhatsAppOptionsOpen(!isWhatsAppOptionsOpen)
  }

  const WhatsAppOptions = () => (
    <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transition-all duration-300 w-auto">
      <button
        onClick={() => handleWhatsAppClick('+573004001077')}
        className="w-full text-gray-800 dark:text-white dark:bg-gray-700 text-left px-4 py-2 hover:bg-gray-100 hover:dark:bg-gray-900 transition-colors duration-200"
      >
        Sede Itagui
      </button>
      <button
        onClick={() => handleWhatsAppClick('+573504089988')}
        className="w-full text-left text-gray-800 dark:text-white dark:bg-gray-700 px-4 py-2 hover:bg-gray-100 hover:dark:bg-gray-900 transition-colors duration-200"
      >
        Sede San Antonio de Prado
      </button>
    </div>
  )

  const Modal = () => {
    if (typeof window === 'undefined') return null;

    return createPortal(
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={() => setIsModalOpen(false)}
      >
        <div
          ref={modalContentRef}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-4 md:mb-0">
              <ImageSlider />
            </div>
            <div className="flex flex-col md:w-1/2 md:pl-4">
              <h2 className="text-xl font-bold mb-4 text-green-700 dark:text-green-300 text-center md:text-center">{article.brand} {article.name}</h2>
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div className="flex items-center"><Camera className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" /> <span className="truncate">Cámara: {article.camera}</span></div>
                <div className="flex items-center"><Camera className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" /> <span className="truncate">Frontal: {article.frontCamera}</span></div>
                <div className="flex items-center"><HardDrive className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" /> <span className="truncate">Almacenamiento: {article.storage}</span></div>
                <div className="flex items-center"><Database className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" /> <span className="truncate">RAM: {article.ram}</span></div>
                <div className="flex items-center"><Monitor className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" /> <span className="truncate">Pantalla: {article.screenSize}</span></div>
                <div className="flex items-center"><Battery className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" /> <span className="truncate">Batería: {article.batteryCapacity}</span></div>
                <div className="col-span-2 flex items-center"><Cpu className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" /> <span className="truncate">Procesador: {article.processor}</span></div>
              </div>
              <div className="flex justify-between items-center mb-2 text-sm">
                <div>
                  Antes: <span className="text-gray-500 line-through">${article.price.toLocaleString()}</span>  
                </div>
                <div>
                  Oferta:
                  <span className="text-green-600 dark:text-green-400 font-bold md:text-2xl ml-1">${article.offerPrice.toLocaleString()}</span>
                </div>
              </div>
              <div className="text-sm mb-2">¿No tienes el dinero? ¡No te preocupes, llévalo ahora a crédito!</div>
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mb-4">
                <h3 className="font-semibold mb-1 text-green-700 dark:text-green-300 text-sm">Financiación: {article.financialEntity}</h3>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div>Inicial: <span className="font-bold">${article.Initial?.toLocaleString()}</span></div>
                  <div>8 Cuotas: <span className="font-bold">${article.price8?.toLocaleString()}</span></div>
                  <div>12 Cuotas: <span className="font-bold">${article.price12?.toLocaleString()}</span></div>
                  <div>16 Cuotas: <span className="font-bold">${article.price16?.toLocaleString()}</span></div>
                </div>
              </div>
              <div className="relative">
                <Button 
                  onClick={toggleWhatsAppOptions} 
                  className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center text-sm py-2"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contáctanos
                </Button>
                {isWhatsAppOptionsOpen && <WhatsAppOptions />}
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  return (
    <>
      <div className="bg-white mt-2 mb-2 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-green-200 dark:border-green-700">
        <div className="flex p-4">
          <div className="w-1/3 relative">
            <Image
              src={article.imageUrl1 || '/placeholder.svg?height=200&width=200'}
              alt={article.name}
              width={200}
              height={200}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-2/3 pl-4 text-center">
            <h3 className="font-bold text-xl mb-1 text-green-700 dark:text-green-300">{article.brand}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{article.name}</p>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              <div className="flex justify-between mb-1"><Camera className="w-4 h-4 mr-2 text-green-500" /> {article.camera}</div>
              <div className="flex justify-between mb-1"><HardDrive className="w-4 h-4 mr-2 text-green-500" /> {article.storage}</div>
              <div className="flex justify-between"><Database className="w-4 h-4 mr-2 text-green-500" /> {article.ram}</div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 dark:text-gray-400">Precio:</span>
              <span className="text-green-600 dark:text-green-400 font-bold text-lg">${article.offerPrice.toLocaleString()}</span>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="w-full bg-green-500 hover:bg-green-600 text-white">
              Ver detalles
            </Button>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal />}
      {isFullscreen && <FullscreenImage />}
    </>
  )
}