"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const login = useAuthStore((state) => state.login);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data } = await api.post("/auth/login", { email, password });
            login(data.user, data.token);
            toast.success("Welcome back to TheBookBarter!");

            if (!data.user.depositPaid) {
                router.push("/deposit");
            } else {
                router.push("/dashboard");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="card w-full max-w-md p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Sign in to your account</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="input-field"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="input-field"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" disabled={isLoading} className="btn-primary w-full mt-4">
                        {isLoading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/register" className="font-medium text-primary-600 hover:text-primary-500">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
