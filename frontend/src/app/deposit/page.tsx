"use client";

import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ShieldCheck } from "lucide-react";

export default function DepositPage() {
    const { user, updateUser } = useAuthStore();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            router.push("/login");
        } else if (user.depositPaid) {
            router.push("/dashboard");
        }
    }, [user, router]);

    const handlePayment = async () => {
        setIsLoading(true);
        try {
            // Create order
            const { data: order } = await api.post("/payment/create-order");

            // Razorpay options
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "test_key", // Replace with real key id
                amount: order.amount,
                currency: order.currency,
                name: "TheBookBarter",
                description: "Security Deposit",
                order_id: order.orderId,
                handler: async function (response: any) {
                    try {
                        await api.post("/payment/verify", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                        updateUser({ depositPaid: true });
                        toast.success("Deposit paid successfully! Welcome aboard.");
                        router.push("/dashboard");
                    } catch (err) {
                        toast.error("Payment verification failed.");
                    }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                    contact: user?.phone,
                },
                theme: {
                    color: "#16a34a",
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();

        } catch (error) {
            toast.error("Failed to initialize payment.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!user || user.depositPaid) return null;

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4 py-12 bg-gray-50">
            <div className="card w-full max-w-md p-8 text-center">
                <div className="bg-primary-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck size={40} className="text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Security Deposit Required</h2>
                <p className="text-gray-600 mb-8">
                    To ensure a trusted community and prevent fake listings, we require a one-time fully refundable security deposit of ₹500.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-8 flex justify-between items-center text-lg font-medium">
                    <span>Deposit Amount</span>
                    <span className="text-xl">₹500</span>
                </div>

                <button
                    onClick={handlePayment}
                    disabled={isLoading}
                    className="btn-primary w-full text-lg py-3"
                >
                    {isLoading ? "Processing..." : "Pay ₹500 Now"}
                </button>

                <p className="mt-4 text-xs text-gray-500">
                    Secured by Razorpay. You can request a refund at any time from your wallet if you have no pending exchanges.
                </p>
            </div>
        </div>
    );
}
