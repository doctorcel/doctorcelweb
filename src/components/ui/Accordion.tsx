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
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ 
  children, 
  type = "single", 
  collapsible = false,
  className = ""
}) => {
  const [activeItem, setActiveItem] = React.useState<string | null>(null);

  return (
    <AccordionContext.Provider value={{ activeItem, setActiveItem }}>
      <div className={`space-y-2 ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ children, value }) => {
  return <div className="border rounded-md">{children}</div>;
};

interface AccordionTriggerProps {
  children: React.ReactNode;
  value: string;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children, value }) => {
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

interface AccordionContentProps {
  children: React.ReactNode;
  value: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({ children, value }) => {
  const { activeItem } = React.useContext(AccordionContext);

  if (activeItem !== value) return null;

  return (
    <div className="px-4 py-2">
      {children}
    </div>
  );
};