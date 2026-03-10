import Link from "next/link";
import { BookOpen, Users, Calendar, ArrowRight, ShieldCheck, Coins, Leaf, HeartHandshake, Wallet } from "lucide-react";

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
      <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block py-1.5 px-3 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-xs font-semibold tracking-wider uppercase mb-4">Simple Process</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827]">How It Works</h2>
            <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">Start exchanging books in three simple steps. Our platform handles the math, you handle the reading.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0"></div>

            <div className="relative z-10 bg-white p-8 border border-gray-100 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group">
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gray-50 rounded-full blur-2xl group-hover:bg-indigo-50 transition-colors duration-500"></div>
              <div className="absolute top-2 right-4 font-black text-8xl text-gray-50/60 group-hover:scale-110 group-hover:text-gray-100 transition-all duration-500 select-none">1</div>
              <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-[#111827] transition-colors duration-300 relative z-10">
                <BookOpen size={28} className="text-[#111827] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#111827] relative z-10">List Your Books</h3>
              <p className="text-base text-gray-500 leading-relaxed text-left relative z-10">Add books you want to exchange to the active marketplace with details like condition, genre, and a brief description.</p>
            </div>

            <div className="relative z-10 bg-white p-8 border border-gray-100 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group">
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gray-50 rounded-full blur-2xl group-hover:bg-indigo-50 transition-colors duration-500"></div>
              <div className="absolute top-2 right-4 font-black text-8xl text-gray-50/60 group-hover:scale-110 group-hover:text-gray-100 transition-all duration-500 select-none">2</div>
              <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-[#111827] transition-colors duration-300 relative z-10">
                <Users size={28} className="text-[#111827] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#111827] relative z-10">Find Matches</h3>
              <p className="text-base text-gray-500 leading-relaxed text-left relative z-10">Browse available books from others, get smart algorithmic suggestions, and send real-time swap requests securely.</p>
            </div>

            <div className="relative z-10 bg-white p-8 border border-gray-100 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group">
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gray-50 rounded-full blur-2xl group-hover:bg-indigo-50 transition-colors duration-500"></div>
              <div className="absolute top-2 right-4 font-black text-8xl text-gray-50/60 group-hover:scale-110 group-hover:text-gray-100 transition-all duration-500 select-none">3</div>
              <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-[#111827] transition-colors duration-300 relative z-10">
                <Calendar size={28} className="text-[#111827] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#111827] relative z-10">Meet & Exchange</h3>
              <p className="text-base text-gray-500 leading-relaxed text-left relative z-10">Attend local community meetup events to exchange your books safely and meet fellow passionate book lovers nearby.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Magic Coin System Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="md:w-1/2">
              <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-2xl mb-6 text-yellow-600 shadow-sm">
                <Coins size={32} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Currency of Readers:<br /> <span className="text-yellow-500">Magic Coins</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe books have inherent value based on the knowledge they share, not just cash. That's why your books are converted into our virtual currency: Magic Coins.
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-yellow-100 p-1 rounded-full text-yellow-600"><ArrowRight size={14} /></div>
                  <span><strong>Fair Valuation:</strong> A book's Magic Coin value is automatically calculated based on its original MRP.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-yellow-100 p-1 rounded-full text-yellow-600"><ArrowRight size={14} /></div>
                  <span><strong>Earn by Sharing:</strong> When someone receives your book, its Magic Coin value is instantly transferred to your wallet.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-yellow-100 p-1 rounded-full text-yellow-600"><ArrowRight size={14} /></div>
                  <span><strong>Explore for Free:</strong> Use your earned coins to request any book from the marketplace without spending real money.</span>
                </li>
              </ul>
            </div>

            {/* Visual Representation of Coins */}
            <div className="md:w-1/2 w-full">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-yellow-50 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>

                <h3 className="text-xl font-bold text-center text-gray-900 mb-8 relative z-10">How It Adds Up</h3>

                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="w-1/3 text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-1">₹499</div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Book MRP</div>
                  </div>
                  <div className="w-1/3 flex justify-center text-gray-300">
                    <ArrowRight size={24} />
                  </div>
                  <div className="w-1/3 text-center">
                    <div className="text-3xl font-bold text-yellow-500 mb-1 flex items-center justify-center gap-1"><Coins size={24} /> 50</div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Magic Coins</div>
                  </div>
                </div>

                <div className="w-full bg-gray-100 rounded-xl p-4 text-center mt-8 relative z-10 border border-gray-200">
                  <p className="text-sm font-medium text-gray-600">Formula: <span className="text-gray-900 font-bold">MRP ÷ 10</span> = Magic Coins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why BookBarter Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose BookBarter?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
            More than just an exchange platform, it's a movement to read more, spend less, and build connections.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow text-center">
              <div className="inline-flex bg-green-100 text-green-600 p-4 rounded-full mb-4">
                <Leaf size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">Give books a second life. Reduce paper waste and the environmental impact of printing physical books.</p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow text-center">
              <div className="inline-flex bg-blue-100 text-blue-600 p-4 rounded-full mb-4">
                <Wallet size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Save Money</h3>
              <p className="text-gray-600">Why buy new when you can read for free? Access hundreds of titles using just the books you've already read.</p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow text-center sm:col-span-2 lg:col-span-1">
              <div className="inline-flex bg-purple-100 text-purple-600 p-4 rounded-full mb-4">
                <HeartHandshake size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Local Connections</h3>
              <p className="text-gray-600">Meet people who share your reading interests. BookBarter fosters real-world communities through local meetups.</p>
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
