"use client";

import { useAuthStore } from "@/store/authStore";
import { User, Mail, Phone, MapPin, Star } from "lucide-react";

export default function Profile() {
    const { user } = useAuthStore();

    if (!user) return null;

    return (
        <div className="max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-primary-600 h-32 relative"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-start -mt-12 mb-6">
                        <div className="w-24 h-24 bg-white rounded-full p-1 shadow-md">
                            <div className="w-full h-full bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-4xl font-bold">
                                {user.name.charAt(0)}
                            </div>
                        </div>
                        {user.rating !== undefined && (
                            <div className="mt-14 flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full border border-yellow-200 font-bold">
                                <Star size={16} className="fill-current" /> {user.rating.toFixed(1)} Rating
                            </div>
                        )}
                    </div>

                    <h2 className="text-3xl font-extrabold text-gray-900 mb-1">{user.name}</h2>

                    <div className="space-y-4 mt-8">
                        <div className="flex items-center gap-3 text-gray-700 pb-4 border-b border-gray-50">
                            <Mail size={20} className="text-gray-400" />
                            <span className="font-medium w-24">Email</span>
                            <span className="text-gray-900">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700 pb-4 border-b border-gray-50">
                            <Phone size={20} className="text-gray-400" />
                            <span className="font-medium w-24">Phone</span>
                            <span className="text-gray-900">***********</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700 pb-4 border-b border-gray-50">
                            <MapPin size={20} className="text-gray-400" />
                            <span className="font-medium w-24">Location</span>
                            <span className="text-gray-900">{user.location}</span>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button disabled className="btn-secondary text-gray-400 cursor-not-allowed">Edit Profile (Coming Soon)</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
