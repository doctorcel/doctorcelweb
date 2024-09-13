import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg max-w-sm transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
      <div className="relative overflow-hidden group bg-gray-200 dark:bg-gray-600">
        <Image
          src={article.imageUrl1 || '/placeholder.jpg'}
          alt={article.name}
          width={200}
          height={200}
          className="w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="">
          
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-2xl mb-2 text-gray-800 dark:text-gray-100 text-center">{article.brand}</h3>
        <p className="text-gray-700 dark:text-gray-100 text-lg font-semibold text-center">{article.name}</p>
        <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300 h-52 text-center mt-3">
          <div>
            <span className="font-semibold">Camara principal:</span> {article.camera}
          </div>
          <div>
            <span className="font-semibold">Frontal:</span> {article.frontCamera}
          </div>
          <div>
            <span className="font-semibold">Almacenamiento:</span> {article.storage}
          </div>
          <div>
            <span className="font-semibold">RAM:</span> {article.ram}
          </div>
          <div>
            <span className="font-semibold">Pantalla:</span> {article.screenSize}
          </div>
          <div>
            <span className="font-semibold">Batería:</span> {article.batteryCapacity}
          </div>
          <div className="col-span-2">
            <span className="font-semibold">Procesador:</span> {article.processor}
          </div>
        </div>
        <p className="text-green-500 dark:text-green-400 font-extrabold text-2xl mb-4 text-right">Ahora: ${article.offerPrice.toLocaleString()}</p>
        <div className="bg-green-100 dark:bg-gray-700 p-3 rounded-lg mb-4">
          <p className="text-sm font-semibold text-green-800 dark:text-green-200 mb-2">Financiera: {article.financialEntity}</p>
          <div className="grid grid-cols-2 gap-2 text-xs text-green-700 dark:text-green-300">
            <div className="flex justify-between items-center">
              <span>Inicial</span>
              <span className="font-bold text-sm">${article.Initial?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>8 Cuotas</span>
              <span className="font-bold text-sm">${article.price8?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>12 Cuotas</span>
              <span className="font-bold text-sm">${article.price12?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>16 Cuotas</span>
              <span className="font-bold text-sm">${article.price16?.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className='mb-0'>
          <Link href={`/article/${article.id}`} className="block bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-lg w-full text-center transition-colors duration-300">
            Ver detalles
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ArticleCard;