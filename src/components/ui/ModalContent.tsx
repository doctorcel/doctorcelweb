import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button/buttoncard';
import WhatsAppOptions from './WhatsappOptions';

interface ModalContentProps {
  article: any; // Define el tipo de article según tu estructura de datos
}

const ModalContent: React.FC<ModalContentProps> = ({ article }) => {
  const [isWhatsAppOptionsOpen, setIsWhatsAppOptionsOpen] = useState(false);

  const handleWhatsAppClick = (number: string) => {
    const message = encodeURIComponent(`Hola, estoy interesado en el ${article.brand} ${article.name}. ¿Podrían darme más información?`);
    window.open(`https://wa.me/${number}?text=${message}`, '_blank');
    setIsWhatsAppOptionsOpen(false);
  };

  const toggleWhatsAppOptions = () => {
    setIsWhatsAppOptionsOpen(!isWhatsAppOptionsOpen);
  };

  return (
    <div className="relative">
      <Button
        onClick={toggleWhatsAppOptions}
        className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center text-sm py-2"
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        Contáctanos
      </Button>
      {isWhatsAppOptionsOpen && <WhatsAppOptions onClick={handleWhatsAppClick} />}
    </div>
  );
};

export default ModalContent;
