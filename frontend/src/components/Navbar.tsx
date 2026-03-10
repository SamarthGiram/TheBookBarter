"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { BookOpen, UserCircle, Wallet, LogOut, Menu, X, ChevronDown, ChevronUp, LayoutDashboard, Clock, User } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const dashboardLinks = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/wallet", label: "Wallet", icon: Wallet },
    { href: "/dashboard/books", label: "My Books", icon: BookOpen },
    { href: "/dashboard/requests", label: "Requests", icon: Clock },
    { href: "/dashboard/profile", label: "Profile", icon: User },
];

export default function Navbar() {
    const { user, logout } = useAuthStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [dashboardOpen, setDashboardOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => { setMounted(true); }, []);

    const closeMenu = () => { setIsMenuOpen(false); setDashboardOpen(false); };
    const isOnDashboard = pathname.startsWith("/dashboard");

    return (
        <>
        {/* ── Main Navbar ── */}
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
                        <BookOpen size={22} className="text-indigo-600" />
                        <span className="font-bold text-lg tracking-tight text-gray-900">BookBarter</span>
                    </Link>

                    {/* Desktop Nav — centered */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
                        <Link href="/#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 font-semibold transition-colors">
                            How it Works
                        </Link>
                        <Link href="/marketplace" className="text-sm text-gray-600 hover:text-gray-900 font-semibold transition-colors">
                            Browse Books
                        </Link>
                    </div>

                    {/* Desktop Auth */}
                    <div className="hidden md:flex items-center gap-4 ml-auto">
                        {mounted && user ? (
                            <div className="flex items-center gap-5">
                                <Link href="/dashboard/wallet" className="flex items-center gap-1.5 text-gray-600 hover:text-yellow-500 font-medium transition-colors text-sm">
                                    <Wallet size={16} className="text-yellow-500" />
                                    <span>{user.coins} Coins</span>
                                </Link>
                                <Link href="/dashboard/books/add" className="flex items-center gap-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors">
                                    <BookOpen size={15} /> List Book
                                </Link>
                                <div className="relative group">
                                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                                        <UserCircle size={26} />
                                        <span className="font-medium text-sm">{user.name.split(' ')[0]}</span>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 py-2">
                                        <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg mx-1">Dashboard</Link>
                                        <Link href="/dashboard/requests" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg mx-1">Requests</Link>
                                        <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 rounded-lg mx-1 flex items-center gap-2">
                                            <LogOut size={15} /> Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : mounted ? (
                            <>
                                <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 font-semibold transition-colors">Login</Link>
                                <Link href="/register" className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-1.5 rounded-lg transition-colors">Sign Up</Link>
                            </>
                        ) : null}
                    </div>

                    {/* Mobile hamburger */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none p-2 -mr-2 rounded-lg transition-colors"
                            aria-label="Open menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Dashboard sub-nav (mobile, only on dashboard pages) ── */}
            {mounted && isOnDashboard && (
                <div className="md:hidden bg-gray-50 border-t border-gray-200">
                    <div className="flex overflow-x-auto gap-1 px-3 py-2 scrollbar-hide">
                        {dashboardLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                                        isActive
                                            ? "bg-indigo-600 text-white"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>

        {/* ── Mobile Full-Screen Overlay Menu ── */}
        {isMenuOpen && (
            <div className="md:hidden fixed inset-0 z-[100] bg-gray-900 flex flex-col">
                {/* Top bar */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700">
                    <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
                        <BookOpen size={22} className="text-indigo-400" />
                        <span className="font-bold text-lg tracking-tight text-white">BookBarter</span>
                    </Link>
                    <button onClick={closeMenu} className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors" aria-label="Close menu">
                        <X size={26} />
                    </button>
                </div>

                {/* Nav links */}
                <div className="flex-1 flex flex-col items-center justify-center gap-1 px-6">
                    {/* Dashboard accordion (logged-in only) */}
                    {mounted && user && (
                        <div className="w-full">
                            <button
                                onClick={() => setDashboardOpen(!dashboardOpen)}
                                className="w-full flex items-center justify-center gap-2 text-2xl font-extrabold text-white py-4 rounded-xl hover:bg-gray-800 active:bg-gray-700 transition-colors tracking-wide"
                            >
                                Dashboard
                                {dashboardOpen ? <ChevronUp size={22} className="text-indigo-400" /> : <ChevronDown size={22} className="text-indigo-400" />}
                            </button>

                            {dashboardOpen && (
                                <div className="bg-gray-800 rounded-xl mb-2 overflow-hidden">
                                    {dashboardLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={closeMenu}
                                            className="flex items-center justify-center gap-2 text-base font-semibold text-gray-300 hover:text-white hover:bg-gray-700 py-3 transition-colors"
                                        >
                                            <link.icon size={17} className="text-indigo-400" />
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <Link href="/#how-it-works" onClick={closeMenu}
                        className="w-full text-center text-2xl font-extrabold text-white py-4 rounded-xl hover:bg-gray-800 active:bg-gray-700 transition-colors tracking-wide">
                        How it Works
                    </Link>
                    <Link href="/marketplace" onClick={closeMenu}
                        className="w-full text-center text-2xl font-extrabold text-white py-4 rounded-xl hover:bg-gray-800 active:bg-gray-700 transition-colors tracking-wide">
                        Browse Books
                    </Link>

                    {mounted && !user && (
                        <>
                            <Link href="/login" onClick={closeMenu}
                                className="w-full text-center text-2xl font-extrabold text-white py-4 rounded-xl hover:bg-gray-800 active:bg-gray-700 transition-colors tracking-wide">
                                Login
                            </Link>
                            <Link href="/register" onClick={closeMenu}
                                className="w-full text-center text-2xl font-extrabold text-indigo-400 py-4 rounded-xl hover:bg-gray-800 active:bg-gray-700 transition-colors tracking-wide">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Bottom: user info + logout */}
                {mounted && user && (
                    <div className="px-6 pb-8 border-t border-gray-700 pt-4 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-semibold text-white text-sm leading-tight">{user.name}</p>
                                <Link href="/dashboard/wallet" onClick={closeMenu} className="text-xs text-yellow-400 font-semibold flex items-center gap-1 mt-0.5">
                                    <Wallet size={12} /> {user.coins} Magic Coins
                                </Link>
                            </div>
                        </div>
                        <button
                            onClick={() => { logout(); closeMenu(); }}
                            className="flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold text-sm transition-colors"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                )}
            </div>
        )}
        </>
    );
}
