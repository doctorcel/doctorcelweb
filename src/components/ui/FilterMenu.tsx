// components/ui/FilterMenu.tsx
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion"
import { Checkbox } from "@/components/ui/Checkbox"

interface FilterOption {
  label: string;
  value: string;
}

interface FilterCategory {
  name: string;
  options: FilterOption[];
}

interface FilterMenuProps {
  filters: FilterCategory[];
  onFilterChange: (category: string, value: string, checked: boolean) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ filters, onFilterChange }) => {
  return (
    <Accordion type="multiple" className="w-full">
      {filters.map((category, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger value={`item-${index}`}>{category.name}</AccordionTrigger>
          <AccordionContent value={`item-${index}`}>
            {category.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                <Checkbox 
                  id={`${category.name}-${option.value}`} 
                  onCheckedChange={(checked) => onFilterChange(category.name, option.value, checked)}
                />
                <label 
                  htmlFor={`${category.name}-${option.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FilterMenu;