import Link from "next/link";
import { BookOpen, Users, Calendar, ArrowRight, ShieldCheck, Coins, CheckCircle2, ChevronRight, Package, MapPin, Star, Wallet } from "lucide-react";

export default function HowItWorksPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Header */}
            <section className="bg-gray-50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#111827] tracking-tight mb-6" style={{ fontFamily: "'Georgia', serif" }}>
                        How BookBarter Works
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Welcome to the community-driven platform where books never gather dust. Read more, spend nothing, and meet fellow readers.
                    </p>
                </div>
            </section>

            {/* Main Steps */}
            <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Step 1 */}
                    <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
                        <div className="md:w-1/2 order-2 md:order-1">
                            <div className="inline-flex bg-indigo-50 text-indigo-600 p-3 rounded-full mb-6 font-bold text-xl w-14 h-14 items-center justify-center">1</div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">List Your Old Books</h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Take those books you've already read and give them a second life. Listing a book takes less than a minute.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={20} />
                                    <span className="text-gray-700">Scan or search for the book title to quickly autofill details.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={20} />
                                    <span className="text-gray-700">Set the condition (New, Good, or Acceptable).</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={20} />
                                    <span className="text-gray-700">Your book is immediately added to the local marketplace!</span>
                                </li>
                            </ul>
                        </div>
                        <div className="md:w-1/2 order-1 md:order-2">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100 aspect-video flex items-center justify-center border border-gray-200">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-50 opacity-50"></div>
                                <BookOpen size={80} className="text-indigo-400 relative z-10" />
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
                        <div className="md:w-1/2">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100 aspect-video flex items-center justify-center border border-gray-200">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-yellow-50 opacity-50"></div>
                                <Users size={80} className="text-orange-400 relative z-10" />
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="inline-flex bg-orange-50 text-orange-600 p-3 rounded-full mb-6 font-bold text-xl w-14 h-14 items-center justify-center">2</div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Matches & Request</h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Browse thousands of books and use your earned <span className="font-semibold text-yellow-600">Magic Coins</span> to request the ones you want to read next.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={20} />
                                    <span className="text-gray-700">Filter books by genre, distance, and condition.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={20} />
                                    <span className="text-gray-700">A user accepts your request, locking the Magic Coins safely in escrow.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 order-2 md:order-1">
                            <div className="inline-flex bg-green-50 text-green-600 p-3 rounded-full mb-6 font-bold text-xl w-14 h-14 items-center justify-center">3</div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet & Exchange</h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Connect with the owner to arrange a safe, local meetup to hand over the book.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={20} />
                                    <span className="text-gray-700">Chat safely within the app to decide a public meeting spot.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={20} />
                                    <span className="text-gray-700">Exchange the Physical copies in person!</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={20} />
                                    <span className="text-gray-700">Click "Received", releasing the Magic Coins to the provider. Both parties drop a rating.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="md:w-1/2 order-1 md:order-2">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100 aspect-video flex items-center justify-center border border-gray-200">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-50 opacity-50"></div>
                                <Calendar size={80} className="text-green-400 relative z-10" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Magic Coin Explanation */}
            <section className="bg-[#111827] py-20 px-4 sm:px-6 lg:px-8 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <Coins size={48} className="text-yellow-400 mx-auto mb-6" />
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">Understanding Magic Coins</h2>
                    <p className="text-lg text-gray-300 mb-12">
                        Magic Coins are the lifeblood of BookBarter. They ensure every exchange is equitable. <br />
                        <strong>1 Magic Coin = ₹10</strong> (based on the original MRP of a book).
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
                            <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2"><ArrowRight size={20} /> Earning Coins</h3>
                            <p className="text-gray-300 leading-relaxed mb-4">When you give a book to someone, you earn its Magic Coin value (MRP ÷ 10). If you give away a ₹400 book, 40 Coins instantly enter your wallet.</p>
                        </div>
                        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
                            <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2"><ArrowRight size={20} /> Spending Coins</h3>
                            <p className="text-gray-300 leading-relaxed mb-4">When you request a book from someone else, those coins are deducted. You can request any book as long as you have enough Coins in your wallet.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Security Info */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
                    <ShieldCheck size={48} className="text-blue-600 mb-6" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Safety & Trust First</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mb-12">
                        Community trust is essential. That's why we’ve implemented a strict verification process.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-8 w-full max-w-4xl text-left">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                            <div className="mt-1"><Wallet className="text-blue-500" /></div>
                            <div>
                                <h4 className="font-bold text-gray-900">Security Deposit</h4>
                                <p className="text-sm text-gray-600 mt-1">Every active member pays a 100% refundable ₹500 security deposit. This prevents fake profiles and ensures everyone is committed.</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                            <div className="mt-1"><Star className="text-yellow-500" /></div>
                            <div>
                                <h4 className="font-bold text-gray-900">Peer Ratings</h4>
                                <p className="text-sm text-gray-600 mt-1">After every exchange, both parties rate each other. Consistent poor ratings lead to platform bans.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-16 sm:py-20 text-center px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to exchange?</h2>
                <Link href="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors shadow-lg">
                    Join the Community <ChevronRight size={20} />
                </Link>
            </section>
        </div>
    );
}
