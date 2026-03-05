"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { Check, X, Truck, PackageCheck } from "lucide-react";

export default function Requests() {
    const [requestsMade, setRequestsMade] = useState<any[]>([]);
    const [requestsReceived, setRequestsReceived] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'received' | 'made'>('received');

    const fetchRequests = async () => {
        setIsLoading(true);
        try {
            const { data } = await api.get("/exchanges/me");
            setRequestsMade(data.requestsMade);
            setRequestsReceived(data.requestsReceived);
        } catch (error) {
            toast.error("Failed to load requests");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const updateStatus = async (id: string, status: string) => {
        try {
            await api.put(`/exchanges/${id}/status`, { status });
            toast.success(`Exchange marked as ${status}`);
            fetchRequests(); // Refresh data to immediately reflect changes
        } catch (error: any) {
            toast.error(error.response?.data?.error || `Failed to update status to ${status}`);
        }
    };

    if (isLoading) {
        return <div className="animate-pulse space-y-4 max-w-4xl"><div className="h-40 bg-gray-200 rounded"></div></div>;
    }

    return (
        <div className="max-w-5xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Exchange Requests</h1>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveTab('received')}
                    className={`pb-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'received' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Requests Received ({requestsReceived.filter(r => r.status !== 'Completed' && r.status !== 'Rejected').length})
                </button>
                <button
                    onClick={() => setActiveTab('made')}
                    className={`pb-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'made' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Requests Made ({requestsMade.filter(r => r.status !== 'Completed' && r.status !== 'Rejected').length})
                </button>
            </div>

            <div className="space-y-4">
                {activeTab === 'received' && (
                    requestsReceived.length === 0 ? (
                        <div className="text-gray-500 text-center py-8">You haven't received any requests yet.</div>
                    ) : (
                        requestsReceived.map((req) => (
                            <RequestCard key={req.id} req={req} type="received" onUpdate={updateStatus} />
                        ))
                    )
                )}

                {activeTab === 'made' && (
                    requestsMade.length === 0 ? (
                        <div className="text-gray-500 text-center py-8">You haven't made any requests yet.</div>
                    ) : (
                        requestsMade.map((req) => (
                            <RequestCard key={req.id} req={req} type="made" onUpdate={updateStatus} />
                        ))
                    )
                )}
            </div>
        </div>
    );
}

function RequestCard({ req, type, onUpdate }: { req: any, type: 'made' | 'received', onUpdate: (id: string, s: string) => void }) {
    const isReceived = type === 'received';

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 text-xs font-bold rounded uppercase tracking-wide ${req.status === 'Requested' ? 'bg-yellow-100 text-yellow-800' :
                            req.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                                req.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                                    req.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                        'bg-red-100 text-red-800'
                        }`}>
                        {req.status}
                    </span>
                    <span className="text-sm text-gray-500">{new Date(req.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{req.book.title}</h3>
                <p className="text-gray-600">
                    {isReceived ? (
                        <>Requested by <span className="font-bold">{req.requester.name}</span> in {req.requester.location}</>
                    ) : (
                        <>From <span className="font-bold">{req.owner.name}</span> in {req.owner.location}</>
                    )}
                </p>
                <p className="text-yellow-600 font-bold mt-1 inline-flex items-center">
                    {req.coinValue} Magic Coins
                </p>
            </div>

            <div className="flex gap-2">
                {/* Owner Actions */}
                {isReceived && req.status === 'Requested' && (
                    <>
                        <button onClick={() => onUpdate(req.id, 'Rejected')} className="btn-secondary flex items-center gap-1 text-red-600 hover:bg-red-50 border-gray-200">
                            <X size={16} /> Reject
                        </button>
                        <button onClick={() => onUpdate(req.id, 'Approved')} className="btn-primary flex items-center gap-1">
                            <Check size={16} /> Approve
                        </button>
                    </>
                )}

                {isReceived && req.status === 'Approved' && (
                    <button onClick={() => onUpdate(req.id, 'Shipped')} className="btn-primary flex items-center gap-1">
                        <Truck size={16} /> Mark as Shipped / Handed Over
                    </button>
                )}

                {/* Requester Actions */}
                {!isReceived && req.status === 'Shipped' && (
                    <button onClick={() => onUpdate(req.id, 'Completed')} className="btn-primary bg-green-600 hover:bg-green-500 flex items-center gap-1">
                        <PackageCheck size={16} /> Mark as Received
                    </button>
                )}
            </div>
        </div>
    );
}
