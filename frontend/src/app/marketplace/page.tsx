"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import BookCard from "@/components/BookCard";
import { Filter, Search, X, ChevronDown, ChevronUp } from "lucide-react";

export default function Marketplace() {
    const [books, setBooks] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    // Filters
    const [genre, setGenre] = useState("");
    const [city, setCity] = useState("");
    const [condition, setCondition] = useState("");
    const [maxCoins, setMaxCoins] = useState("");

    const fetchBooks = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            if (genre) params.append("genre", genre);
            if (city) params.append("city", city);
            if (condition) params.append("condition", condition);
            if (maxCoins) params.append("maxCoins", maxCoins);

            const { data } = await api.get(`/books?${params.toString()}`);
            setBooks(data);
        } catch (error) {
            console.error("Failed to fetch books", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [genre, city, condition, maxCoins]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Marketplace</h1>
                    <p className="text-gray-500 text-sm sm:text-base">Discover books available for exchange in your community.</p>
                </div>

                {/* Mobile: search + filter toggle row */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="flex-1 flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm border border-gray-100">
                        <Search size={18} className="text-gray-400 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Search by city..."
                            className="border-none outline-none focus:ring-0 bg-transparent text-sm w-full py-1"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        {city && (
                            <button onClick={() => setCity('')} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                                <X size={16} />
                            </button>
                        )}
                    </div>
                    {/* Filter toggle — mobile only */}
                    <button
                        className="lg:hidden flex items-center gap-1.5 px-3 py-2.5 bg-white rounded-xl border border-gray-200 shadow-sm text-sm font-semibold text-gray-700 whitespace-nowrap flex-shrink-0"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter size={16} />
                        Filters
                        {showFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <div className={`w-full lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden'} lg:block`}>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                            <Filter size={18} /> Filters
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category / Genre</label>
                                <select
                                    className="input-field text-sm"
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                >
                                    <option value="">All Genres</option>
                                    <option value="Fiction">Fiction</option>
                                    <option value="Non-Fiction">Non-Fiction</option>
                                    <option value="Sci-Fi">Sci-Fi</option>
                                    <option value="Biography">Biography</option>
                                    <option value="Self-Help">Self-Help</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                                <select
                                    className="input-field text-sm"
                                    value={condition}
                                    onChange={(e) => setCondition(e.target.value)}
                                >
                                    <option value="">Any Condition</option>
                                    <option value="New">New</option>
                                    <option value="Like New">Like New</option>
                                    <option value="Good">Good</option>
                                    <option value="Acceptable">Acceptable</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Max Coins Required</label>
                                <input
                                    type="number"
                                    className="input-field text-sm"
                                    placeholder="e.g. 50"
                                    value={maxCoins}
                                    onChange={(e) => setMaxCoins(e.target.value)}
                                />
                            </div>

                            <button
                                onClick={() => { setGenre(''); setCity(''); setCondition(''); setMaxCoins(''); }}
                                className="w-full py-2 text-sm text-gray-600 font-medium hover:text-primary-600 transition-colors bg-gray-50 rounded-lg border border-gray-200"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div className="flex-grow">
                    {isLoading ? (
                        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="animate-pulse bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-96 flex flex-col justify-end gap-3">
                                    <div className="bg-gray-200 h-48 w-full rounded-lg mb-4"></div>
                                    <div className="bg-gray-200 h-6 w-3/4 rounded"></div>
                                    <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
                                    <div className="bg-gray-200 h-10 w-full rounded mt-auto"></div>
                                </div>
                            ))}
                        </div>
                    ) : books.length > 0 ? (
                        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
                            {books.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                            <div className="text-gray-400 mb-4 flex justify-center"><Filter size={48} /></div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No books found</h3>
                            <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
