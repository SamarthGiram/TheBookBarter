import Link from "next/link";
import { Star, MapPin } from "lucide-react";

interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    coinValue: number;
    condition: string;
    images: string[];
    location: string;
    status: string;
    owner: {
        name: string;
        rating: number;
        location: string;
    };
}

export default function BookCard({ book }: { book: Book }) {
    return (
        <div className="card group flex flex-col h-full">
            <div className="relative h-64 bg-gray-200 overflow-hidden">
                {book.images && book.images.length > 0 ? (
                    <img
                        src={book.images[0]}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-500 font-bold text-2xl">
                        {book.title.charAt(0)}
                    </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-yellow-600 shadow-sm flex items-center gap-1">
                    {book.coinValue} <span className="text-xs font-normal text-gray-600">Coins</span>
                </div>
            </div>

            <div className="p-5 flex-grow flex flex-col">
                <div className="text-xs text-primary-600 font-medium mb-1 uppercase tracking-wider">{book.genre}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-1 leading-snug line-clamp-1" title={book.title}>{book.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-1">{book.author}</p>

                <div className="mt-auto pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span className="truncate">{book.location}</span>
                    </div>
                    <div className="flex items-center gap-1 justify-end">
                        <Star size={14} className="text-yellow-500" fill="currentColor" />
                        <span>{book.owner.rating.toFixed(1)} / Owner</span>
                    </div>
                </div>

                <Link
                    href={`/books/${book.id}`}
                    className="mt-4 block w-full text-center bg-gray-50 hover:bg-primary-50 text-primary-700 font-medium py-2 rounded-lg transition-colors border border-gray-200"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
