'use client'

import * as React from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/Button"
import SearchBar from './SearchBar'
import ArticleCard from './ArticleCard'
import SkeletonCard from './SkeletonCard'
import FilterMenu from './FilterMenu'
import { useArticles } from '@/hooks/useArticles'
import FloatingThemeToggle from '@/components/ui/DarkModeButton'
import FloatingWhatsAppButton from "./FloatingWhatsappButton"
import { Article } from '@/types'

const CELLPHONES_CATEGORY_ID = 2; // Asumimos que este es el ID de la categoría de celulares

export default function TechStoreHomepage() {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const totalSlides = 5
    const { articles, isLoading, error } = useArticles()
    const [filteredArticles, setFilteredArticles] = React.useState<Article[]>([])
    const [mounted, setMounted] = React.useState(false)
    const [activeFilters, setActiveFilters] = React.useState<Record<string, Record<string, boolean>>>({})

    React.useEffect(() => {
        setMounted(true);
    }, []);

    React.useEffect(() => {
        applyFilters(activeFilters);
    }, [articles, activeFilters])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    }

    const applyFilters = (filters: Record<string, Record<string, boolean>>) => {
        const newFilteredArticles = articles.filter(article => {
            if (article.categoryId !== CELLPHONES_CATEGORY_ID) return false;

            return Object.entries(filters).every(([category, options]) => {
                // If no option is selected for this category, don't filter on this category
                if (Object.values(options).every(value => !value)) return true;
                
                // Check if the article matches any of the selected options for this category
                const articleValue = String(article[category as keyof Article]);
                return options[articleValue] === true;
            });
        });

        setFilteredArticles(newFilteredArticles);
    };

    const handleApplyFilters = (filters: Record<string, Record<string, boolean>>) => {
        setActiveFilters(filters);
    };

    const renderCards = () => {
        if (isLoading) {
            return [...Array(6)].map((_, index) => (
                <SkeletonCard key={`skeleton-${index}`} />
            ))
        }
        return filteredArticles.slice(currentSlide * 6, (currentSlide + 1) * 6).map((article) => (
            <ArticleCard key={article.id} article={article} />
        ))
    }

    if (!mounted) return null

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
            <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-gray-800 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-800/60">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link className="flex-shrink-0" href="/">
                                <span className="text-2xl font-bold text-green-800 dark:text-green-400">Doctor Cel</span>
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link className="text-sm font-medium text-green-800 dark:text-green-600 transition-colors hover:text-green-800 dark:hover:text-green-200" href="/">
                                    Celulares
                                </Link>
                                <Link className="text-sm font-medium text-green-800 dark:text-green-600 transition-colors hover:text-green-800 dark:hover:text-green-200" href="/">
                                    Computadores
                                </Link>
                                <Link className="text-sm font-medium text-green-800 dark:text-green-600 transition-colors hover:text-green-800 dark:hover:text-green-200" href="/">
                                    Videojuegos
                                </Link>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <Link href="/login">
                                <Button variant="outline" size="sm" className="bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 border-green-600 dark:border-green-400 hover:bg-green-50 dark:hover:bg-green-900">
                                    <User className="h-5 w-5 mr-2" />
                                    Iniciar sesión
                                </Button>
                            </Link>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                type="button"
                                className="bg-white dark:bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-green-800 dark:text-green-400 hover:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden" id="mobile-menu">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link className="text-green-800 dark:text-green-600 hover:bg-green-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/">
                                Celulares
                            </Link>
                            <Link className="text-green-800 dark:text-green-600 hover:bg-green-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/">
                                Computadores
                            </Link>
                            <Link className="text-green-800 dark:text-green-600 hover:bg-green-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/">
                                Videojuegos
                            </Link>
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-700">
                            <div className="flex items-center px-5">
                                <Link href="/login">
                                    <Button variant="outline" size="sm" className="w-full bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 border-green-600 dark:border-green-400 hover:bg-green-50 dark:hover:bg-green-900">
                                        <User className="h-5 w-5 mr-2" />
                                        Iniciar sesión
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <main className="flex-1">
                <section className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-green-600 dark:bg-green-800 text-white transition-colors duration-300">
                    <div className="flex justify-center container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                Descubre la Última Tecnología
                            </h1>
                            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                                Explora nuestra amplia selección de celulares y gadgets de última generación.
                            </p>
                            <Button className="bg-white text-green-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700">Ver Productos</Button>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800 transition-colors duration-300">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-green-600 dark:text-green-400">
                            Encuentra tu nuevo Smartphone
                        </h2>
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/4 pr-0 md:pr-4 mb-6 md:mb-0">
                                <FilterMenu articles={articles.filter(article => article.categoryId === CELLPHONES_CATEGORY_ID)} onApplyFilters={handleApplyFilters} />
                            </div>
                            <div className="w-full md:w-3/4">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="icon" onClick={prevSlide} className="bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 border-green-600 dark:border-green-400 hover:bg-green-50 dark:hover:bg-green-900">
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" onClick={nextSlide} className="bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 border-green-600 dark:border-green-400 hover:bg-green-50 dark:hover:bg-green-900">
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {renderCards()}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex justify-center align-center w-full py-6 bg-green-800 dark:bg-gray-900 text-white transition-colors duration-300">
                <p>&copy; 2024 Doctor Cel. Todos los derechos reservados.</p>
            </footer>
            <FloatingWhatsAppButton />
            <FloatingThemeToggle />
        </div>
    )
}

