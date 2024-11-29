// services/articleService.ts
import { Article } from '@/models/article'; // Asegúrate de tener el modelo de 'article' en tu proyecto

export const getArticles = async (): Promise<Article[]> => {
  try {
    const response = await fetch('/api/articles');
    if (!response.ok) {
      throw new Error('Error al obtener los artículos');
    }
    const data: Article[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error en getArticles:', error);
    throw error;
  }
};
