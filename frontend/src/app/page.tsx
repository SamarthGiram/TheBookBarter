import Link from "next/link";
import { BookOpen, RefreshCw, Star, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Exchange Books, <span className="text-primary-600">Share Magic.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Join the ultimate peer-to-peer physical book exchange platform. Turn your reading history into Magic Coins and discover your next adventure without spending cash.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register" className="btn-primary text-lg px-8 py-3">
              Get Started
            </Link>
            <Link href="/marketplace" className="btn-secondary text-lg px-8 py-3">
              Browse Books
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">How TheBookBarter Works</h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. List Your Books</h3>
              <p className="text-gray-600">Add books you've read to the marketplace. The system automatically calculates their value in Magic Coins.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <RefreshCw size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Earn Magic Coins</h3>
              <p className="text-gray-600">When someone requests and receives your book, Magic Coins are credited securely to your wallet.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Discover New Reads</h3>
              <p className="text-gray-600">Use your earned Magic Coins to request books from other readers in your community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full mb-6 text-primary-600 shadow-sm border border-gray-100">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">A Trusted Community</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            To ensure a high-quality experience, all users provide a fully refundable security deposit.
            Our built-in rating system keeps the community honest, reliable, and friendly.
          </p>
        </div>
      </section>
    </div>
  );
}
