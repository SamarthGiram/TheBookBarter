"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { LayoutDashboard, Wallet, BookOpen, Clock, User } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        } else if (!user.depositPaid) {
            router.push("/deposit");
        }
    }, [user, router]);

    if (!user || !user.depositPaid) return null;

    const links = [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard/wallet", label: "Wallet", icon: Wallet },
        { href: "/dashboard/books", label: "My Books", icon: BookOpen },
        { href: "/dashboard/requests", label: "Requests", icon: Clock },
        { href: "/dashboard/profile", label: "Profile", icon: User },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8 min-h-[70vh]">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                    <div className="p-6 bg-primary-50 border-b border-primary-100 flex flex-col items-center">
                        <div className="w-16 h-16 bg-primary-200 text-primary-700 rounded-full flex items-center justify-center text-xl font-bold mb-3">
                            {user.name.charAt(0)}
                        </div>
                        <h3 className="font-bold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.location}</p>
                    </div>
                    <nav className="p-4 space-y-1">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive
                                            ? "bg-primary-50 text-primary-700 font-bold"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <Icon size={20} className={isActive ? "text-primary-600" : "text-gray-400"} />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow">
                {children}
            </main>
        </div>
    );
}
