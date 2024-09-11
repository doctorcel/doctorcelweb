export interface Subcategory {
  id: number;
  name: string;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

export interface Article {
  id?: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  warehouseId: number;
  camera?: string;
  createdAt?: Date;
  price12?: number | null;
  price16?: number | null;
  Initial?: number | null;
  price8?: number | null;
  processor?: string;
  ram?: string;
  storage?: string;
  updatedAt?: Date;
  imageUrl1?: string;
  imageUrl2?: string;
  imageUrl3?: string;
  imageUrl4?: string;
  brand?: string;
  frontCamera?: string;
  screenSize?: string;
  batteryCapacity?: string;
  financialEntity?: string;
  offerPrice: number;
}