"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ShieldAlert, Users, BookOpen, Trash2, Ban, Activity } from "lucide-react";

export default function AdminDashboard() {
    const { user } = useAuthStore();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<'users' | 'books' | 'transactions'>('users');
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Basic protection - hardcoded admin email here for MVP
        if (!user || user.email !== 'admin@thebookbarter.com') {
            router.push('/');
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const { data: resData } = await api.get(`/admin/${activeTab}`);
                setData(resData);
            } catch (error) {
                toast.error(`Failed to load ${activeTab}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user, router, activeTab]);

    const handleBanUser = async (id: string) => {
        if (!confirm("Are you sure you want to ban/delete this user?")) return;
        try {
            await api.delete(`/admin/users/${id}/ban`);
            setData(data.filter(u => u.id !== id));
            toast.success("User banned successfully");
        } catch (error) {
            toast.error("Failed to ban user");
        }
    };

    const handleDeleteBook = async (id: string) => {
        if (!confirm("Are you sure you want to remove this listing?")) return;
        try {
            await api.delete(`/admin/books/${id}`);
            setData(data.filter(b => b.id !== id));
            toast.success("Book removed successfully");
        } catch (error) {
            toast.error("Failed to remove book");
        }
    };

    if (!user || user.email !== 'admin@thebookbarter.com') return null;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-red-100 text-red-600 p-3 rounded-xl"><ShieldAlert size={28} /></div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Admin Command Center</h1>
                    <p className="text-gray-500">Manage platform integrity, users, and transactions.</p>
                </div>
            </div>

            <div className="flex gap-4 border-b border-gray-200 mb-8">
                {[
                    { id: 'users', icon: Users, label: 'Platform Users' },
                    { id: 'books', icon: BookOpen, label: 'Book Listings' },
                    { id: 'transactions', icon: Activity, label: 'Transactions History' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`pb-4 px-4 font-medium text-sm transition-all flex items-center gap-2 border-b-2 ${activeTab === tab.id ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <tab.icon size={18} /> {tab.label}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {isLoading ? (
                    <div className="p-12 text-center text-gray-400 animate-pulse">Loading data...</div>
                ) : data.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">No {activeTab} found.</div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                {activeTab === 'users' && (
                                    <>
                                        <th className="p-4 font-medium text-gray-600">User</th>
                                        <th className="p-4 font-medium text-gray-600">Location</th>
                                        <th className="p-4 font-medium text-gray-600 text-center">Coins</th>
                                        <th className="p-4 font-medium text-gray-600 text-center">Deposit</th>
                                        <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
                                    </>
                                )}
                                {activeTab === 'books' && (
                                    <>
                                        <th className="p-4 font-medium text-gray-600">Book Title</th>
                                        <th className="p-4 font-medium text-gray-600">Owner</th>
                                        <th className="p-4 font-medium text-gray-600 text-center">Value</th>
                                        <th className="p-4 font-medium text-gray-600 text-center">Status</th>
                                        <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
                                    </>
                                )}
                                {activeTab === 'transactions' && (
                                    <>
                                        <th className="p-4 font-medium text-gray-600">Date</th>
                                        <th className="p-4 font-medium text-gray-600">User</th>
                                        <th className="p-4 font-medium text-gray-600">Type</th>
                                        <th className="p-4 font-medium text-gray-600 text-right">Coins</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {data.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    {activeTab === 'users' && (
                                        <>
                                            <td className="p-4">
                                                <div className="font-bold text-gray-900">{item.name}</div>
                                                <div className="text-gray-500 text-xs">{item.email}</div>
                                            </td>
                                            <td className="p-4 text-gray-600">{item.location}</td>
                                            <td className="p-4 text-center font-bold font-mono">{item.coins}</td>
                                            <td className="p-4 text-center">
                                                {item.depositPaid ? <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-bold">Paid</span> : <span className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-bold">Unpaid</span>}
                                            </td>
                                            <td className="p-4 flex justify-end">
                                                <button onClick={() => handleBanUser(item.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Ban User">
                                                    <Ban size={18} />
                                                </button>
                                            </td>
                                        </>
                                    )}

                                    {activeTab === 'books' && (
                                        <>
                                            <td className="p-4 font-medium text-gray-900 max-w-[200px] truncate">{item.title}</td>
                                            <td className="p-4 text-gray-600">{item.owner?.name}</td>
                                            <td className="p-4 text-center font-bold text-yellow-600">{item.coinValue}</td>
                                            <td className="p-4 text-center text-xs">{item.status}</td>
                                            <td className="p-4 flex justify-end">
                                                <button onClick={() => handleDeleteBook(item.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove Listing">
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </>
                                    )}

                                    {activeTab === 'transactions' && (
                                        <>
                                            <td className="p-4 text-gray-500 text-xs">{new Date(item.createdAt).toLocaleString()}</td>
                                            <td className="p-4 font-medium text-gray-900">{item.user?.name}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${item.type === 'Earned' ? 'bg-green-100 text-green-700' :
                                                        item.type === 'Spent' ? 'bg-red-100 text-red-700' :
                                                            'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {item.type}
                                                </span>
                                            </td>
                                            <td className={`p-4 text-right font-bold text-lg ${item.type === 'Earned' ? 'text-green-600' :
                                                    item.type === 'Spent' ? 'text-red-600' :
                                                        'text-blue-600'
                                                }`}>
                                                {item.type === 'Earned' ? '+' : item.type === 'Spent' ? '-' : ''}{item.coins}
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
