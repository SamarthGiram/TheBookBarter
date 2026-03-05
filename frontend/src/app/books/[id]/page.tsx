"use client";

import { useEffect, useState, use } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Star, MapPin, BookOpen, Clock, UserCheck } from "lucide-react";

export default function BookDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [book, setBook] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRequesting, setIsRequesting] = useState(false);

    const { user } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const { data } = await api.get(`/books/${id}`);
                setBook(data);
            } catch (error) {
                toast.error("Failed to load book details");
                router.push("/marketplace");
            } finally {
                setIsLoading(false);
            }
        };
        fetchBook();
    }, [id, router]);

    const handleRequest = async () => {
        if (!user) {
            toast.error("Please login to request a book");
            router.push("/login");
            return;
        }

        if (!user.depositPaid) {
            toast.error("Please pay the security deposit first");
            router.push("/deposit");
            return;
        }

        if (user.coins < book.coinValue) {
            toast.error("Insufficient Magic Coins");
            return;
        }

        setIsRequesting(true);
        try {
            await api.post("/exchanges/request", { bookId: book.id });
            toast.success("Exchange request sent successfully!");
            router.push("/dashboard/requests");
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Failed to send request");
        } finally {
            setIsRequesting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin text-primary-600"><BookOpen size={48} /></div>
            </div>
        );
    }

    if (!book) return null;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">

                {/* Book Image */}
                <div className="md:w-1/2 bg-gray-100 relative min-h-[400px]">
                    {book.images && book.images.length > 0 ? (
                        <img src={book.images[0]} alt={book.title} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-primary-300">
                            <BookOpen size={100} />
                        </div>
                    )}
                </div>

                {/* Book Details */}
                <div className="md:w-1/2 p-8 flex flex-col">
                    <div className="text-sm font-bold text-primary-600 uppercase tracking-wider mb-2">{book.genre}</div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{book.title}</h1>
                    <p className="text-xl text-gray-600 mb-6">by {book.author}</p>

                    <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-gray-100">
                        <div className="bg-yellow-50 text-yellow-800 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                            <span className="text-2xl">{book.coinValue}</span>
                            <span className="text-sm font-medium uppercase tracking-wider">Magic Coins</span>
                        </div>
                        <div className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 border border-gray-200">
                            <span className="text-sm uppercase tracking-wider">MRP:</span>
                            <span>₹{book.mrp}</span>
                        </div>
                    </div>

                    <div className="space-y-4 mb-8 flex-grow">
                        <div className="flex items-center gap-3 text-gray-700">
                            <Clock size={20} className="text-gray-400" />
                            <span className="font-medium w-24">Condition:</span>
                            <span>{book.condition}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <MapPin size={20} className="text-gray-400" />
                            <span className="font-medium w-24">Location:</span>
                            <span>{book.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <UserCheck size={20} className="text-gray-400" />
                            <span className="font-medium w-24">Owner:</span>
                            <div className="flex items-center gap-1">
                                <span>{book.owner.name}</span>
                                <span className="text-gray-300 mx-1">|</span>
                                <Star size={16} className="text-yellow-500 fill-current" />
                                <span className="font-bold">{book.owner.rating.toFixed(1)}</span>
                            </div>
                        </div>
                    </div>

                    {book.status === 'Available' ? (
                        user?.id === book.ownerId ? (
                            <button disabled className="btn-secondary w-full py-4 text-lg bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200">
                                This is your book
                            </button>
                        ) : (
                            <button
                                onClick={handleRequest}
                                disabled={isRequesting}
                                className="btn-primary w-full py-4 text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                            >
                                {isRequesting ? "Sending Request..." : "Request to Exchange"}
                            </button>
                        )
                    ) : (
                        <button disabled className="btn-secondary w-full py-4 text-lg bg-red-50 text-red-600 border-red-200 font-bold cursor-not-allowed border outline-none">
                            Currently {book.status}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
