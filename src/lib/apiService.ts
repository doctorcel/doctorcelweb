// lib/apiService.ts

export const fetcher = (url: string) => fetch(url).then(res => res.json());

// Funciones para Categorías
export async function getCategories() {
  const res = await fetch('/api/categories');
  if (!res.ok) {
    throw new Error('Error al obtener las categorías');
  }
  return res.json();
}

export async function createCategory(data: { name: string; active?: string }) {
  const res = await fetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al crear la categoría');
  }
  return res.json();
}

export async function updateCategory(id: number, data: Partial<{ name: string; active: string }>) {
  const res = await fetch(`/api/categories/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al actualizar la categoría');
  }
  return res.json();
}

export async function deleteCategory(id: number) {
  const res = await fetch(`/api/categories/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al eliminar la categoría');
  }
  return res.json();
}

// Funciones para Subcategorías
export async function getSubcategories() {
  const res = await fetch('/api/subcategories');
  if (!res.ok) {
    throw new Error('Error al obtener las subcategorías');
  }
  return res.json();
}

// Nueva función para obtener subcategorías filtradas por categoryId
export async function getSubcategoriesByCategory(categoryId: number) {
  const res = await fetch(`/api/subcategories?categoryId=${categoryId}`);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al obtener las subcategorías');
  }
  return res.json();
}

export async function createSubcategory(data: { name: string; categoryId: number; active?: string }) {
  const res = await fetch('/api/subcategories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al crear la subcategoría');
  }
  return res.json();
}

export async function updateSubcategory(id: number, data: Partial<{ name: string; active: string; categoryId: number }>) {
  const res = await fetch(`/api/subcategories/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al actualizar la subcategoría');
  }
  return res.json();
}

export async function deleteSubcategory(id: number) {
  const res = await fetch(`/api/subcategories/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al eliminar la subcategoría');
  }
  return res.json();
}

// Funciones para Bodegas (no modificar)
export async function getWarehouses() {
  const res = await fetch('/api/warehouses');
  if (!res.ok) {
    throw new Error('Error al obtener las bodegas');
  }
  return res.json();
}

// Asegúrate de que las funciones para bodegas estén en su propio servicio si no lo están
