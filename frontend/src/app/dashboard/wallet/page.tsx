"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { ArrowUpRight, ArrowDownLeft, RefreshCcw, Wallet as WalletIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function Wallet() {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWallet = async () => {
            try {
                const { data } = await api.get("/users/wallet");
                setBalance(data.balance);
                setTransactions(data.transactions);
            } catch (error) {
                toast.error("Failed to load wallet data");
            } finally {
                setIsLoading(false);
            }
        };
        fetchWallet();
    }, []);

    if (isLoading) {
        return <div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-4 py-1"> <div className="h-40 bg-gray-200 rounded"></div> <div className="space-y-2"><div className="h-4 bg-gray-200 rounded"></div><div className="h-4 bg-gray-200 rounded w-5/6"></div></div></div></div>;
    }

    return (
        <div className="max-w-4xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Wallet</h1>

            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white shadow-lg mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <WalletIcon size={200} />
                </div>
                <div className="relative z-10">
                    <h2 className="text-primary-100 text-lg font-medium mb-2">Available Balance</h2>
                    <div className="text-5xl font-extrabold flex items-baseline gap-2">
                        {balance} <span className="text-2xl font-medium text-primary-200">Magic Coins</span>
                    </div>
                </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-4">Transaction History</h3>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {transactions.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No transactions yet. Start exchanging books to earn coins!
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-100">
                        {transactions.map((t) => (
                            <li key={t.id} className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-full ${t.type === 'Earned' ? 'bg-green-100 text-green-600' : t.type === 'Spent' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                        {t.type === 'Earned' ? <ArrowDownLeft size={20} /> : t.type === 'Spent' ? <ArrowUpRight size={20} /> : <RefreshCcw size={20} />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">{t.type} Magic Coins</p>
                                        <p className="text-sm text-gray-500">
                                            {t.exchange?.book?.title ? `For book: ${t.exchange.book.title}` : t.type}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">{new Date(t.createdAt).toLocaleDateString()} at {new Date(t.createdAt).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                                <div className={`text-lg font-bold ${t.type === 'Earned' ? 'text-green-600' : t.type === 'Spent' ? 'text-red-600' : 'text-blue-600'}`}>
                                    {t.type === 'Earned' ? '+' : t.type === 'Spent' ? '-' : ''}{t.coins}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
