import React, { useState, useEffect } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion"
import { Checkbox } from "@/components/ui/Checkbox"
import { Button } from "@/components/ui/Button"
import { Article } from '@/types'

interface FilterMenuProps {
  articles: Article[]
  onApplyFilters: (filters: Record<string, Record<string, boolean>>) => void
}

const categoryTranslations: Record<string, string> = {
  brand: 'Marca',
  ram: 'RAM',
  storage: 'Almacenamiento',
  camera: 'Cámara',
  processor: 'Procesador',
  batteryCapacity: 'Capacidad de batería'
}

const FilterMenu: React.FC<FilterMenuProps> = ({ articles, onApplyFilters }) => {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [selectedFilters, setSelectedFilters] = useState<Record<string, Record<string, boolean>>>({});

  useEffect(() => {
    generateFilters()
  }, [articles])

  const generateFilters = () => {
    const newFilters: Record<string, Set<string>> = {}
    articles.forEach(article => {
      Object.keys(categoryTranslations).forEach(field => {
        if (article[field as keyof Article]) {
          if (!newFilters[field]) {
            newFilters[field] = new Set()
          }
          newFilters[field].add(String(article[field as keyof Article]))
        }
      })
    })

    const finalFilters: Record<string, string[]> = {}
    Object.entries(newFilters).forEach(([key, value]) => {
      finalFilters[key] = Array.from(value).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    })

    if (JSON.stringify(filters) !== JSON.stringify(finalFilters)) {
      setFilters(finalFilters)
      resetFilters(finalFilters)
    }
  }

  const handleCheckboxChange = (category: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [value]: !prev[category]?.[value]
      }
    }))
  }

  const handleApplyFilters = () => {
    onApplyFilters(selectedFilters)
  }

  const resetFilters = (newFilters: Record<string, string[]> = filters) => {
    const resetFilters = Object.keys(newFilters).reduce((acc, key) => {
      acc[key] = {}
      return acc
    }, {} as Record<string, Record<string, boolean>>)

    setSelectedFilters(resetFilters)
    onApplyFilters(resetFilters)
  }

  // Ordenar las categorías alfabéticamente
  const sortedCategories = Object.keys(filters).sort((a, b) => 
    categoryTranslations[a].localeCompare(categoryTranslations[b])
  )

  return (
    <div className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <Accordion type="single" collapsible className="space-y-2">
        {sortedCategories.map((category) => (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger value={category}>
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {categoryTranslations[category] || category}
              </span>
            </AccordionTrigger>
            <AccordionContent value={category}>
              <div className="space-y-2 pl-4">
                {filters[category].map(option => (
                  <div key={option} className="flex items-center">
                    <Checkbox
                      id={`${category}-${option}`}
                      checked={selectedFilters[category]?.[option] || false}
                      onCheckedChange={() => handleCheckboxChange(category, option)}
                    />
                    <label
                      htmlFor={`${category}-${option}`}
                      className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="flex space-x-2 pt-4">
        <Button onClick={handleApplyFilters} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
          Aplicar Filtros
        </Button>
        <Button onClick={() => resetFilters()} variant="outline" className="flex-1">
          Restaurar Filtros
        </Button>
      </div>
    </div>
  )
}

export default FilterMenu;