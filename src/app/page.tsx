'use client'

import * as React from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet"
import CategoryMenu from '../components/ui/CategoryMenu'
import SearchBar from '../components/ui/SearchBar'
import ArticleCard from '../components/ui/ArticleCard'
import FilterMenu from '../components/ui/FilterMenu'
import { useCategories } from '@/hooks/useCategories'
import { useArticles } from '@/hooks/useArticles'

export default function TechStoreHomepage() {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const totalSlides = 5
  const { categories } = useCategories()
  const { articles, isLoading, error } = useArticles()
  const [filteredArticles, setFilteredArticles] = React.useState(articles)

  React.useEffect(() => {
    setFilteredArticles(articles)
  }, [articles])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    if (checked) {
      setFilteredArticles(articles.filter(article => {
        switch(category) {
          case 'Marca':
            return article.brand === value;
          case 'RAM':
            return article.ram === value;
          case 'Almacenamiento':
            return article.storage === value;
          case 'Cámara':
            return article.camera === value;
          default:
            return true;
        }
      }));
    } else {
      setFilteredArticles(articles);
    }
  }

  const handleSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    setFilteredArticles(
      articles.filter(article =>
        article.name.toLowerCase().includes(lowercaseQuery) ||
        article.description.toLowerCase().includes(lowercaseQuery)
      )
    )
  }

  const filters = [
    {
      name: 'Marca',
      options: [
        { label: 'Samsung', value: 'samsung' },
        { label: 'Apple', value: 'apple' },
        { label: 'Xiaomi', value: 'xiaomi' },
      ]
    },
    {
      name: 'RAM',
      options: [
        { label: '4GB', value: '4gb' },
        { label: '6GB', value: '6gb' },
        { label: '8GB', value: '8gb' },
      ]
    },
    {
      name: 'Almacenamiento',
      options: [
        { label: '64GB', value: '64gb' },
        { label: '128GB', value: '128gb' },
        { label: '256GB', value: '256gb' },
      ]
    },
    {
      name: 'Cámara',
      options: [
        { label: '12MP', value: '12mp' },
        { label: '48MP', value: '48mp' },
        { label: 'Triple, 108mp + 2mp + 2mp', value: 'Triple, 108mp + 2mp + 2mp' },
      ]
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <header className="flex justify-center sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <CategoryMenu categories={categories} />
              </SheetContent>
            </Sheet>
            <Link className="flex items-center space-x-2" href="#">
              <span className="text-2xl font-bold text-green-600">Doctor Cel</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            {/* <CategoryMenu categories={categories} /> */}
          </nav>
          <div className="flex items-center space-x-4">
            {/* <SearchBar onSearch={handleSearch} /> */}
            <Link href="/login">
              <Button variant="outline" size="sm">
                <User className="h-5 w-5 mr-2" />
                Iniciar sesión
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-green-600 text-white">
          <div className="flex justify-center container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Descubre la Última Tecnología
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                Explora nuestra amplia selección de celulares y gadgets de última generación.
              </p>
              <Button className="bg-white text-green-600 hover:bg-gray-100">Ver Productos</Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Productos Destacados</h2>
            <div className="flex">
              <div className="w-1/4 pr-4">
                <FilterMenu filters={filters} onFilterChange={handleFilterChange} />
              </div>
              <div className="w-3/4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={prevSlide}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextSlide}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="relative overflow-hidden">
                  <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {[...Array(5)].map((_, index) => (
                      <div key={index} className="w-full flex-shrink-0 px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {filteredArticles.slice(index * 6, (index + 1) * 6).map((article) => (
                            <ArticleCard key={article.id} article={article} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex justify-center align-center w-full py-6 bg-green-800 text-white">
      <p>&copy; 2024 Doctor Cel. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}