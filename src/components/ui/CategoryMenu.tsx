// components/CategoryMenu.tsx
import React from 'react';
import Link from 'next/link';

export interface Category {
  id: number;
  name: string;
}

interface CategoryMenuProps {
  categories: Category[];
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ categories }) => {
  return (
    <nav>
      <ul className="flex space-x-4">
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/category/${category.id}`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryMenu;