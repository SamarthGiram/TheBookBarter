"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { Plus, Trash2, Edit } from "lucide-react";
import toast from "react-hot-toast";

export default function MyBooks() {
    const [books, setBooks] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // We fetch all user books by calling the profile endpoint which includes booksOwned
    const fetchMyBooks = async () => {
        setIsLoading(true);
        try {
            const { data } = await api.get("/users/me");
            // Since our getMyProfile doesn't include books, let's just fetch all books and filter by owner Id
            // Given our limited API, we can fetch all books if no direct endpoint exists, 
            // OR we can add a user filter. Let's assume we can fetch by calling get userById on our own ID
            const userRes = await api.get(`/users/${data.id}`);
            setBooks(userRes.data.booksOwned.map((b: any) => b.book));
        } catch (error: any) {
            toast.error("Failed to fetch your books");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMyBooks();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this listing?")) return;
        try {
            await api.delete(`/books/${id}`);
            toast.success("Book deleted");
            setBooks(books.filter((b) => b.id !== id));
        } catch (error) {
            toast.error("Failed to delete book");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Listed Books</h1>
                <Link href="/dashboard/books/add" className="btn-primary flex items-center gap-2">
                    <Plus size={18} /> Add New Book
                </Link>
            </div>

            {isLoading ? (
                <div className="animate-pulse space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>)}
                </div>
            ) : books.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No books listed yet</h3>
                    <p className="text-gray-500 mb-6">Start sharing your books with the community.</p>
                    <Link href="/dashboard/books/add" className="btn-primary">Listing Your First Book</Link>
                </div>
            ) : (
                <div>
                    {/* Mobile: Card list */}
                    <div className="md:hidden space-y-3">
                        {books.map((book) => (
                            <div key={book.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-start gap-3">
                                <div className="flex-grow min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${book.status === 'Available' ? 'bg-green-100 text-green-700' :
                                            book.status === 'Requested' ? 'bg-blue-100 text-blue-700' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                            {book.status}
                                        </span>
                                        <span className="text-xs text-gray-400">{book.condition}</span>
                                    </div>
                                    <p className="font-bold text-gray-900 text-sm leading-snug line-clamp-1">{book.title}</p>
                                    <p className="text-xs text-yellow-600 font-semibold mt-1">{book.coinValue} Coins</p>
                                </div>
                                <div className="flex gap-1 flex-shrink-0 mt-1">
                                    <button
                                        onClick={() => toast.error("Edit not implemented yet in MVP")}
                                        className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                    >
                                        <Edit size={17} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(book.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={17} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop: Table */}
                    <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="p-4 font-medium text-gray-600">Title</th>
                                    <th className="p-4 font-medium text-gray-600">Condition</th>
                                    <th className="p-4 font-medium text-gray-600">Value</th>
                                    <th className="p-4 font-medium text-gray-600">Status</th>
                                    <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {books.map((book) => (
                                    <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-medium text-gray-900">{book.title}</td>
                                        <td className="p-4 text-gray-600">{book.condition}</td>
                                        <td className="p-4 font-bold text-yellow-600">{book.coinValue} Coins</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${book.status === 'Available' ? 'bg-green-100 text-green-700' :
                                                book.status === 'Requested' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                {book.status}
                                            </span>
                                        </td>
                                        <td className="p-4 flex justify-end gap-2">
                                            <button onClick={() => toast.error("Edit not implemented yet in MVP")} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(book.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
