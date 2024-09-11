import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm">
      <div className="bg-gradient-to-b from-gray-100 to-gray-200 p-4">
        <h3 className="font-bold text-xl mb-2">{article.brand}</h3>
        <h4 className="text-lg">{article.name}</h4>
        <Image
          src={article.imageUrl1 || '/placeholder.jpg'}
          alt={article.name}
          width={200}
          height={200}
          className="mx-auto object-contain h-48"
        />
      </div>
      <div className="p-4">
        <ul className="text-sm space-y-1">
          <li>
            <span className="material-icons-outlined text-gray-500 mr-1">Camara principal:</span>
            {article.camera}
          </li>
          <li>
            <span className="material-icons-outlined text-gray-500 mr-1">Camara frontal:</span>
            {article.frontCamera}
          </li>
          <li>
            <span className="material-icons-outlined text-gray-500 mr-1">Capacidad:</span>
            {article.storage}
          </li>
          <li>
            <span className="material-icons-outlined text-gray-500 mr-1">Memoria RAM:</span>
            {article.ram}
          </li>
          <li>
            <span className="material-icons-outlined text-gray-500 mr-1">Pantalla:</span>
            {article.screenSize}
          </li>
          <li>
            <span className="material-icons-outlined text-gray-500 mr-1">Capacidad de bateria:</span>
            {article.batteryCapacity}
          </li>
          <li>
            <span className="material-icons-outlined text-gray-500 mr-1">Procesador:</span>
            {article.processor}
          </li>
        </ul>
        <div className="mt-4">
          <p className="text-orange-500 font-bold text-2xl">Ahora: ${article.offerPrice.toLocaleString()}</p>
          <div className="bg-purple-100 p-2 rounded mt-2">
            <p className="text-sm font-semibold">Financiera: {article.financialEntity}</p>
            <div className="flex justify-between text-xs mt-1">
              <span>Inicial</span>
              <span className="font-bold">${article.Initial?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>8 Cuotas</span>
              <span className="font-bold">${article.price8?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>12 Cuotas</span>
              <span className="font-bold">${article.price12?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>16 Cuotas</span>
              <span className="font-bold">${article.price16?.toLocaleString()}</span>
            </div>
          </div>
        </div>
{/* ``        <Link href={`/article/${article.id}`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded w-full text-center">
          Ver detalles
        </Link>`` */}
      </div>
    </div>
  );
};

export default ArticleCard;