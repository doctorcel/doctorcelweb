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
      <div className="relative overflow-hidden group">
        <Image
          src={article.imageUrl1 || '/placeholder.jpg'}
          alt={article.name}
          width={400}
          height={400}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <p className="text-white text-lg font-semibold">{article.name}</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2 text-gray-800 dark:text-gray-100">{article.brand}</h3>
        <p className="text-green-500 dark:text-green-400 font-bold text-2xl mb-4">Ahora: ${article.offerPrice.toLocaleString()}</p>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
          <div>
            <span className="font-semibold">Cámara:</span> {article.camera}
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
        <div className="bg-green-100 dark:bg-gray-700 p-3 rounded-lg mb-4">
          <p className="text-sm font-semibold text-green-800 dark:text-green-200 mb-2">Financiera: {article.financialEntity}</p>
          <div className="grid grid-cols-2 gap-2 text-xs text-green-700 dark:text-green-300">
            <div className="flex justify-between">
              <span>Inicial</span>
              <span className="font-bold">${article.Initial?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>8 Cuotas</span>
              <span className="font-bold">${article.price8?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>12 Cuotas</span>
              <span className="font-bold">${article.price12?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>16 Cuotas</span>
              <span className="font-bold">${article.price16?.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <Link href={`/article/${article.id}`} className="block bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-lg w-full text-center transition-colors duration-300">
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;