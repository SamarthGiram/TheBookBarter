"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddBook() {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "Fiction",
        mrp: "",
        condition: "Good",
        location: "",
        images: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const payload = {
                ...formData,
                images: formData.images ? formData.images.split('\n').map(l => l.trim()).filter(l => l) : []
            };

            await api.post("/books", payload);
            toast.success("Book listed successfully!");
            router.push("/dashboard/books");
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Failed to list book");
        } finally {
            setIsLoading(false);
        }
    };

    const calculatedCoins = formData.mrp ? Math.floor(parseInt(formData.mrp) / 10) : 0;

    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">List a New Book</h1>

            <div className="card p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
                            <input name="title" type="text" required className="input-field" value={formData.title} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                            <input name="author" type="text" required className="input-field" value={formData.author} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                            <select name="genre" required className="input-field" value={formData.genre} onChange={handleChange}>
                                <option value="Fiction">Fiction</option>
                                <option value="Non-Fiction">Non-Fiction</option>
                                <option value="Sci-Fi">Sci-Fi</option>
                                <option value="Biography">Biography</option>
                                <option value="Self-Help">Self-Help</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                            <select name="condition" required className="input-field" value={formData.condition} onChange={handleChange}>
                                <option value="New">New</option>
                                <option value="Like New">Like New</option>
                                <option value="Good">Good</option>
                                <option value="Acceptable">Acceptable</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Original MRP (₹)</label>
                            <input name="mrp" type="number" min="10" required className="input-field" value={formData.mrp} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Magic Coins Value</label>
                            <div className="input-field bg-gray-50 text-gray-500 font-bold border-gray-200 cursor-not-allowed flex items-center">
                                {calculatedCoins} Coins <span className="font-normal text-xs ml-2">(Automatically calculated)</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location (City, Area)</label>
                        <input name="location" type="text" required className="input-field" value={formData.location} onChange={handleChange} placeholder="e.g. Andheri West, Mumbai" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URLs (one per line)</label>
                        <textarea
                            name="images"
                            className="input-field"
                            rows={3}
                            placeholder="https://example.com/cover.jpg"
                            value={formData.images}
                            onChange={handleChange}
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-1">Paste links to images. We will support direct uploads soon.</p>
                    </div>

                    <button type="submit" disabled={isLoading} className="btn-primary w-full py-3">
                        {isLoading ? "Listing Book..." : "List Book"}
                    </button>
                </form>
            </div>
        </div>
    );
}
