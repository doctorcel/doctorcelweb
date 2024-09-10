export interface Category {
    id: number;
    name: string;
  }
  

export interface Article {
  id?: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  warehouseId: number;
  camera?: string;
  ram?: string;
  storage?: string;
  processor?: string;
  imageUrl1?: string;
  imageUrl2?: string;
  imageUrl3?: string;
  imageUrl4?: string;
  price4Months?: number;
  price8Months?: number;
  price12Months?: number;
  price16Months?: number;
}