"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { Wallet, BookOpen, Clock, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function DashboardOverview() {
    const { user, updateUser } = useAuthStore();
    const [stats, setStats] = useState({ books: 0, requests: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [{ data: me }, { data: ex }] = await Promise.all([
                    api.get('/users/me'),
                    api.get('/exchanges/me')
                ]);
                if (me) updateUser(me);

                let activeReqs = 0;
                if (ex) {
                    activeReqs += ex.requestsMade.filter((r: any) => r.status !== 'Completed' && r.status !== 'Rejected').length;
                    activeReqs += ex.requestsReceived.filter((r: any) => r.status !== 'Completed' && r.status !== 'Rejected').length;
                }

                setStats({ books: 0, requests: activeReqs }); // Mocked book count for now, would ideally come from me endpoint
            } catch (err) { }
        };
        fetchStats();
    }, [updateUser]);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name.split(' ')[0]}</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {/* Wallet Card */}
                <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-100 shadow-sm relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-10"><Wallet size={120} /></div>
                    <div className="relative z-10">
                        <h3 className="text-yellow-800 font-medium mb-1">Magic Coins</h3>
                        <div className="text-4xl font-extrabold text-yellow-600 mb-4">{user?.coins}</div>
                        <Link href="/dashboard/wallet" className="text-sm font-bold text-yellow-700 flex items-center gap-1 hover:gap-2 transition-all">
                            View Transactions <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>

                {/* My Books Card */}
                <div className="card p-6 flex flex-col justify-between hover:border-primary-200">
                    <div>
                        <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center mb-4"><BookOpen size={20} /></div>
                        <h3 className="text-gray-900 font-bold mb-1">My Books</h3>
                        <p className="text-gray-500 text-sm">Manage your listed books</p>
                    </div>
                    <Link href="/dashboard/books" className="text-sm font-bold text-primary-600 flex items-center gap-1 mt-6 hover:gap-2 transition-all">
                        Manage Books <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Requests Card */}
                <div className="card p-6 flex flex-col justify-between hover:border-primary-200">
                    <div>
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4"><Clock size={20} /></div>
                        <h3 className="text-gray-900 font-bold mb-1">Exchange Requests</h3>
                        <p className="text-gray-500 text-sm">{stats.requests} Active requests</p>
                    </div>
                    <Link href="/dashboard/requests" className="text-sm font-bold text-blue-600 flex items-center gap-1 mt-6 hover:gap-2 transition-all">
                        View Requests <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center mt-8">
                <h3 className="text-xl font-bold mb-3">Ready to share a book?</h3>
                <p className="text-gray-600 mb-6 max-w-lg mx-auto">List a book you've read, earn Magic Coins when someone takes it, and use those coins to get new books to read.</p>
                <Link href="/dashboard/books/add" className="btn-primary px-8">
                    List a Book Now
                </Link>
            </div>
        </div>
    );
}
