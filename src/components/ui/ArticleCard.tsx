import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Article } from '../../types'; // Asegúrate de que esto apunte a la definición correcta de Article
import ModalContent from './ModalContent'; // Importa el ModalContent
import { X } from 'lucide-react';
import { Camera, HardDrive, Database, Battery, Cpu, Monitor } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const images = [article.imageUrl1, article.imageUrl2, article.imageUrl3, article.imageUrl4].filter(Boolean);

  // Componente de la galería de imágenes
  const ImageGallery = () => (
    <div className='flex flex-col h-full items-center'>
      <div className="relative w-full h-64 md:h-96 mb-4">
        <Image
          src={images[currentImageIndex] || '/placeholder.svg?height=400&width=400'}
          alt={`${article.name} - Image ${currentImageIndex + 1}`}
          layout="fill"
          objectFit="contain"
          className="rounded-lg cursor-pointer"
          onClick={() => setIsFullscreen(true)}
        />
      </div>
      <div className="flex space-x-2 overflow-x-auto w-full">
        {images.map((src, index) => (
          <div
            key={src}
            className={`relative w-16 h-16 flex-shrink-0 cursor-pointer ${index === currentImageIndex ? 'ring-2 ring-green-500' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          >
            <Image
              src={src || '/placeholder.svg?height=64&width=64'}
              alt={`${article.name} - Thumbnail ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );

  // Componente de la imagen en pantalla completa
  const FullscreenImage = () => {
    if (typeof window === 'undefined') return null;

    return createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-75 z-[9999] flex items-center justify-center" onClick={() => setIsFullscreen(false)}>
        <div className="relative w-full h-full max-w-4xl max-h-4xl p-4" onClick={(e) => e.stopPropagation()}>
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
  };

  // Modal principal
  const Modal = () => {
    if (typeof window === 'undefined') return null;

    return createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-4 md:mb-0">
              <ImageGallery />
            </div>
            <div className="flex flex-col justify-center md:w-1/2 md:pl-4">
              <h2 className="text-xl font-bold mb-4 text-green-700 dark:text-green-300 text-center">{article.brand} {article.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-6">
                <div className="flex items-center"><Camera className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" /> <span>Cámara: {article.camera}</span></div>
                <div className="flex items-center"><Camera className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" /> <span>Frontal: {article.frontCamera}</span></div>
                <div className="flex items-center"><HardDrive className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" /> <span>Almacenamiento: {article.storage}</span></div>
                <div className="flex items-center"><Database className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" /> <span>RAM: {article.ram}</span></div>
                <div className="flex items-center"><Monitor className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" /> <span>Pantalla: {article.screenSize}</span></div>
                <div className="flex items-center"><Battery className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" /> <span>Batería: {article.batteryCapacity}</span></div>
                <div className="md:col-span-2 flex items-center"><Cpu className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" /> <span>Procesador: {article.processor}</span></div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center mb-2 text-sm">
                <div className="mb-2 sm:mb-0">
                  Antes: <span className="text-gray-500 line-through">${article.price.toLocaleString()}</span>  
                </div>
                <div>
                  Oferta:
                  <span className="text-green-600 dark:text-green-400 font-bold text-xl sm:text-2xl ml-1">${article.offerPrice.toLocaleString()}</span>
                </div>
              </div>
              <div className="text-sm mb-2 text-center sm:text-left">
                ¿No tienes el dinero? ¡No te preocupes, llévalo ahora a crédito!
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mb-4">
                <h3 className="font-semibold mb-1 text-green-700 dark:text-green-300 text-sm text-center sm:text-left">
                  Financiación: {article.financialEntity}
                </h3>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div>Inicial: <span className="font-bold">${article.Initial?.toLocaleString()}</span></div>
                  <div>8 Cuotas: <span className="font-bold">${article.price8?.toLocaleString()}</span></div>
                  <div>12 Cuotas: <span className="font-bold">${article.price12?.toLocaleString()}</span></div>
                  <div>16 Cuotas: <span className="font-bold">${article.price16?.toLocaleString()}</span></div>
                </div>
              </div>
              {/* Aquí es donde se utiliza el componente ModalContent */}
              <ModalContent article={article} />
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

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
              <span className="text-green-600 dark:text-green-400 font-bold">
                ${article.offerPrice}
              </span>
            </div>
            <button
              className="bg-green-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-green-600 transition duration-200"
              onClick={() => setIsModalOpen(true)}
            >
              Ver detalles
            </button>
          </div>
        </div>
      </div>

      {/* Renderizar el modal si está abierto */}
      {isModalOpen && <Modal />}
      {/* Renderizar la imagen en pantalla completa si está activada */}
      {isFullscreen && <FullscreenImage />}
    </>
  );
}

