// models/article.ts
export interface Article {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    subcategories: string;
    warehouse: string;
    // Añade aquí más propiedades según el modelo del API
  }
  