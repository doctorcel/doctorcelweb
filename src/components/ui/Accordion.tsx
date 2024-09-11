// components/ui/accordion.tsx
import * as React from "react"
import { ChevronDown } from "lucide-react"

const AccordionContext = React.createContext<{
  activeItem: string | null;
  setActiveItem: React.Dispatch<React.SetStateAction<string | null>>;
}>({ activeItem: null, setActiveItem: () => {} });

interface AccordionProps {
  children: React.ReactNode;
  type?: "single" | "multiple";
  collapsible?: boolean;
  className?: string;  // Añadimos la prop className
}

export const Accordion: React.FC<AccordionProps> = ({ 
  children, 
  type = "single", 
  collapsible = false,
  className = ""  // Proporcionamos un valor por defecto
}) => {
  const [activeItem, setActiveItem] = React.useState<string | null>(null);

  return (
    <AccordionContext.Provider value={{ activeItem, setActiveItem }}>
      <div className={`space-y-2 ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem = ({ children, value }: { children: React.ReactNode; value: string }) => {
  return <div className="border rounded-md">{children}</div>;
};

export const AccordionTrigger = ({ children, value }: { children: React.ReactNode; value: string }) => {
  const { activeItem, setActiveItem } = React.useContext(AccordionContext);

  const handleClick = () => {
    setActiveItem(prevItem => prevItem === value ? null : value);
  };

  return (
    <button
      className="flex justify-between w-full px-4 py-2 text-left"
      onClick={handleClick}
      aria-expanded={activeItem === value}
    >
      {children}
      <ChevronDown className={`w-4 h-4 transition-transform ${activeItem === value ? 'transform rotate-180' : ''}`} />
    </button>
  );
};

export const AccordionContent = ({ children, value }: { children: React.ReactNode; value: string }) => {
  const { activeItem } = React.useContext(AccordionContext);

  if (activeItem !== value) return null;

  return (
    <div className="px-4 py-2">
      {children}
    </div>
  );
};