// components/ui/CategoryMenu.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface Subcategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

interface CategoryMenuProps {
  categories: Category[];
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ categories }) => {
  const [openCategory, setOpenCategory] = useState<number | null>(null);

  const toggleCategory = (categoryId: number) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  return (
    <nav className="flex space-x-4">
      {categories.map((category) => (
        <div key={category.id} className="relative group">
          <button
            onClick={() => toggleCategory(category.id)}
            className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <span>{category.name}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          {openCategory === category.id && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              {category.subcategories.map((subcategory) => (
                <Link 
                  key={subcategory.id}
                  href={`/category/${category.id}/subcategory/${subcategory.id}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {subcategory.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default CategoryMenu;