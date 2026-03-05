"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        location: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const login = useAuthStore((state) => state.login);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data } = await api.post("/auth/register", formData);
            login(data.user, data.token);
            toast.success("Account created successfully!");
            router.push("/deposit"); // Force deposit after registration
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] py-12">
            <div className="card w-full max-w-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Create your account</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            name="name" type="text" required
                            className="input-field" placeholder="John Doe"
                            value={formData.name} onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            name="email" type="email" required
                            className="input-field" placeholder="you@example.com"
                            value={formData.email} onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            name="password" type="password" required
                            className="input-field" placeholder="••••••••"
                            value={formData.password} onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            name="phone" type="text" required
                            className="input-field" placeholder="+91 9876543210"
                            value={formData.phone} onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City / Location</label>
                        <input
                            name="location" type="text" required
                            className="input-field" placeholder="Mumbai, MH"
                            value={formData.location} onChange={handleChange}
                        />
                    </div>

                    <button type="submit" disabled={isLoading} className="btn-primary w-full mt-6">
                        {isLoading ? "Creating account..." : "Sign up"}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
