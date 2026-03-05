"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { BookOpen, UserCircle, Wallet, LogOut, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const { user, logout } = useAuthStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="glass-nav">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-primary-600 text-white p-2 rounded-lg">
                            <BookOpen size={24} />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900">TheBookBarter</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/marketplace" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                            Marketplace
                        </Link>
                        <Link href="/how-it-works" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                            How it works
                        </Link>
                    </div>

                    {/* User Auth Menu (Desktop) */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-6">
                                <Link href="/dashboard/wallet" className="flex items-center gap-1.5 text-gray-600 hover:text-yellow-600 font-medium transition-colors">
                                    <Wallet size={18} className="text-yellow-500" />
                                    <span>{user.coins} Coins</span>
                                </Link>

                                <Link href="/dashboard/books/add" className="btn-primary py-1.5 px-3 text-sm flex items-center gap-1">
                                    <BookOpen size={16} /> List Book
                                </Link>

                                <div className="relative group">
                                    <button className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors">
                                        <UserCircle size={28} />
                                        <span className="font-medium text-sm">{user.name.split(' ')[0]}</span>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 py-2">
                                        <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Dashboard</Link>
                                        <Link href="/dashboard/requests" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Requests</Link>
                                        <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Login</Link>
                                <Link href="/register" className="btn-primary">Sign up</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-4 shadow-lg absolute w-full">
                    <Link href="/marketplace" className="block text-gray-700 font-medium">Marketplace</Link>
                    <Link href="/how-it-works" className="block text-gray-700 font-medium">How it works</Link>
                    <hr className="border-gray-100" />
                    {user ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-gray-700">
                                <UserCircle size={24} /> <span className="font-medium">{user.name}</span>
                            </div>
                            <Link href="/dashboard/wallet" className="flex items-center gap-2 text-yellow-600 font-medium">
                                <Wallet size={20} /> {user.coins} Magic Coins
                            </Link>
                            <Link href="/dashboard" className="block text-gray-700">Dashboard</Link>
                            <Link href="/dashboard/books/add" className="block text-primary-600 font-medium">List a Book</Link>
                            <button onClick={logout} className="text-red-600 flex items-center gap-2 w-full text-left">
                                <LogOut size={20} /> Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 pt-2">
                            <Link href="/login" className="btn-secondary text-center w-full">Login</Link>
                            <Link href="/register" className="btn-primary text-center w-full">Sign up</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
