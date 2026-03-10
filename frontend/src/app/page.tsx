import Link from "next/link";
import { BookOpen, Users, Calendar, ArrowRight, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mt-4 sm:mt-8 md:mt-12 mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight mb-4 sm:mb-6">
            Exchange Books, Build Community
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-8 sm:mb-10 font-normal">
            Join BookBarter - the community-driven platform for exchanging physical books through local meetup events.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <Link href="/register" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 text-sm sm:text-base px-6 py-3.5 bg-[#1f2937] hover:bg-[#111827] border border-transparent rounded-lg text-white font-medium transition-colors">
              Get Started <ArrowRight size={18} />
            </Link>
            <Link href="/marketplace" className="btn-secondary w-full sm:w-auto flex items-center justify-center text-sm sm:text-base px-6 py-3.5 bg-white text-[#111827] border border-gray-200 rounded-lg hover:bg-gray-50 font-medium transition-colors">
              Browse Books
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-[#111827] mb-8 sm:mb-12">How It Works</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="card p-6 md:p-8 border border-gray-200 rounded-xl shadow-sm text-left hover:shadow-md transition-shadow">
              <BookOpen size={28} className="text-[#111827] mb-4" />
              <h3 className="text-lg font-bold mb-2 text-[#111827]">List Your Books</h3>
              <p className="text-sm text-gray-500 leading-relaxed text-left">Add books you want to exchange with details like condition, genre, and description.</p>
            </div>

            <div className="card p-6 md:p-8 border border-gray-200 rounded-xl shadow-sm text-left hover:shadow-md transition-shadow">
              <Users size={28} className="text-[#111827] mb-4" />
              <h3 className="text-lg font-bold mb-2 text-[#111827]">Find Matches</h3>
              <p className="text-sm text-gray-500 leading-relaxed text-left">Browse books from others, get smart suggestions, and send swap requests.</p>
            </div>

            <div className="card p-6 md:p-8 border border-gray-200 rounded-xl shadow-sm text-left hover:shadow-md transition-shadow">
              <Calendar size={28} className="text-[#111827] mb-4" />
              <h3 className="text-lg font-bold mb-2 text-[#111827]">Meet & Exchange</h3>
              <p className="text-sm text-gray-500 leading-relaxed text-left">Attend local meetup events to exchange books and meet fellow book lovers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
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
