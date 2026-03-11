import Link from "next/link";
import Image from "next/image";
import { BookOpen, Users, Calendar, ArrowRight, ShieldCheck, Coins, Leaf, HeartHandshake, Wallet, Star, TrendingUp, Globe2, BadgeCheck, X, BookMarked, Search, MessageCircle, MapPin as MapPinIcon, Layers, Rocket, Sparkles, ChevronDown, BookHeart } from "lucide-react";
import heroBook from "@/assets/book.png";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
        {/* Book image — full background, smaller on mobile */}
        <div className="absolute inset-x-0 bottom-0 h-[45%] sm:inset-0 sm:h-auto">
          <Image
            src={heroBook}
            alt="Open book with mystical atmosphere"
            fill
            className="object-cover object-bottom"
            priority
            sizes="100vw"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent"></div>
        </div>

        {/* Text content — centered on mobile, upper-third on desktop */}
        <div className="relative z-10 min-h-screen flex flex-col justify-center sm:justify-start items-center text-center px-5 sm:px-6 sm:pt-[calc(3.5rem+8vh)] md:pt-[14vh]">
          <h1 className="text-[2.4rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4 sm:mb-6" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            Exchange Books,<br />Build Community
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-sm sm:max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Join <span className="text-orange-400 font-semibold">BookBarter</span> — the community-driven platform for exchanging
            physical books through local meetup events.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 w-full max-w-xs sm:max-w-none">
            <Link href="/register" className="flex items-center justify-center gap-2 text-sm sm:text-base px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-orange-500/20">
              Get Started <ArrowRight size={18} />
            </Link>
            <Link href="/marketplace" className="flex items-center justify-center text-sm sm:text-base px-8 py-3.5 bg-transparent text-white border border-gray-600 hover:border-gray-400 rounded-xl font-semibold transition-colors">
              Browse Books
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-[#111827] py-10 px-4 sm:px-6 relative z-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {[
            { value: "2,400+", label: "Books Listed", icon: BookOpen },
            { value: "850+", label: "Active Members", icon: Users },
            { value: "1,100+", label: "Exchanges Done", icon: TrendingUp },
            { value: "12", label: "Cities Active", icon: Globe2 },
            { value: "4.8★", label: "Average Rating", icon: Star },
            { value: "18k+", label: "Coins Circulating", icon: Coins },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon size={22} className="text-orange-400 mb-1" />
              <span className="text-2xl sm:text-3xl font-extrabold text-white">{value}</span>
              <span className="text-xs sm:text-sm text-gray-400 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Problem -> Solution Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Problem */}
            <div className="lg:w-1/2 w-full space-y-6">
              <span className="inline-block py-1 px-3 rounded-full bg-red-100 text-red-600 text-sm font-semibold tracking-wide">The Problem With Books Today</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Many readers face the same problem.
              </h2>
              <div className="space-y-5 mt-8">
                {[
                  "Books are expensive to keep buying new.",
                  "They pile up on shelves after being read just once.",
                  "Local libraries are often limited or outdated.",
                  "Finding readers with similar interests is difficult.",
                  "Thousands of perfectly good books sit unused."
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 bg-red-50 p-1 rounded-full text-red-500 flex-shrink-0"><X size={16} /></div>
                    <span className="text-gray-600 text-lg leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div className="lg:w-1/2 w-full">
              <div className="bg-[#111827] rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500 rounded-full blur-[80px] opacity-30"></div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                  BookBarter Changes That.
                </h3>
                <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                  Instead of letting books collect dust, BookBarter helps readers exchange books locally using a fair and transparent <span className="text-yellow-400 font-semibold">Magic Coin system</span>.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center p-4 rounded-2xl bg-gray-800/50 border border-gray-700">
                    <BookOpen size={28} className="text-orange-400 mx-auto mb-3" />
                    <span className="block text-white font-semibold">Read More</span>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-gray-800/50 border border-gray-700">
                    <Wallet size={28} className="text-orange-400 mx-auto mb-3" />
                    <span className="block text-white font-semibold">Spend Less</span>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-gray-800/50 border border-gray-700">
                    <Users size={28} className="text-orange-400 mx-auto mb-3" />
                    <span className="block text-white font-semibold">Connect</span>
                  </div>
                </div>
              </div>
            </div>
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

            <div className="relative z-10 bg-white p-6 sm:p-8 border border-gray-100 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group">
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gray-50 rounded-full blur-2xl group-hover:bg-indigo-50 transition-colors duration-500"></div>
              <div className="absolute top-2 right-4 font-black text-7xl sm:text-8xl text-gray-50/60 group-hover:scale-110 group-hover:text-gray-100 transition-all duration-500 select-none">1</div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center mb-5 sm:mb-8 shadow-sm group-hover:bg-[#111827] transition-colors duration-300 relative z-10">
                <BookOpen size={24} className="text-[#111827] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#111827] relative z-10">List Your Books</h3>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed text-left relative z-10">Add books you want to exchange to the active marketplace with details like condition, genre, and a brief description.</p>
            </div>

            <div className="relative z-10 bg-white p-6 sm:p-8 border border-gray-100 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group">
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gray-50 rounded-full blur-2xl group-hover:bg-indigo-50 transition-colors duration-500"></div>
              <div className="absolute top-2 right-4 font-black text-7xl sm:text-8xl text-gray-50/60 group-hover:scale-110 group-hover:text-gray-100 transition-all duration-500 select-none">2</div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center mb-5 sm:mb-8 shadow-sm group-hover:bg-[#111827] transition-colors duration-300 relative z-10">
                <Users size={24} className="text-[#111827] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#111827] relative z-10">Find Matches</h3>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed text-left relative z-10">Browse available books from others, get smart algorithmic suggestions, and send real-time swap requests securely.</p>
            </div>

            <div className="relative z-10 bg-white p-6 sm:p-8 border border-gray-100 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group">
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gray-50 rounded-full blur-2xl group-hover:bg-indigo-50 transition-colors duration-500"></div>
              <div className="absolute top-2 right-4 font-black text-7xl sm:text-8xl text-gray-50/60 group-hover:scale-110 group-hover:text-gray-100 transition-all duration-500 select-none">3</div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center mb-5 sm:mb-8 shadow-sm group-hover:bg-[#111827] transition-colors duration-300 relative z-10">
                <Calendar size={24} className="text-[#111827] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#111827] relative z-10">Meet & Exchange</h3>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed text-left relative z-10">Attend local community meetup events to exchange your books safely and meet fellow passionate book lovers nearby.</p>
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
              <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-lg border border-gray-100 relative overflow-hidden">
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

      {/* Platform Tools / Preview Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block py-1.5 px-3 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold tracking-wider uppercase mb-4">Platform Features</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mb-4">Everything You Need to Exchange Books</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-16">
            BookBarter provides powerful tools that make book exchanging simple, safe, and enjoyable.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[
              { icon: BookMarked, color: "text-blue-600 bg-blue-50", title: "Smart Book Listings", desc: "Add books with condition, genre, description, and photos." },
              { icon: Search, color: "text-indigo-600 bg-indigo-50", title: "Intelligent Search", desc: "Find books based on genre, distance, and availability." },
              { icon: MessageCircle, color: "text-green-600 bg-green-50", title: "Swap Requests", desc: "Send and receive exchange requests instantly." },
              { icon: MapPinIcon, color: "text-red-600 bg-red-50", title: "Local Meetups", desc: "Meet nearby readers in safe public locations." },
              { icon: Wallet, color: "text-yellow-600 bg-yellow-50", title: "Magic Coin Wallet", desc: "Track your earned and spent coins easily." },
              { icon: Star, color: "text-orange-600 bg-orange-50", title: "Community Ratings", desc: "Build trust with reviews from other readers." },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                <div className={`inline-flex p-3 rounded-xl mb-5 ${color}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
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

      {/* Community Impact Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(249,115,22,0.15)_0%,_transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block py-1.5 px-3 rounded-full bg-gray-800 border border-gray-700 text-orange-400 text-xs font-semibold tracking-wider uppercase mb-4">Our Mission</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">The Impact We're Creating</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-16">
            BookBarter isn't just a marketplace — it's a movement.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: Layers, title: "Books Reused", desc: "Thousands of books get a second life instead of being discarded." },
              { icon: Leaf, title: "Environmental Impact", desc: "Reducing demand for new prints saves paper and energy." },
              { icon: HeartHandshake, title: "Stronger Communities", desc: "Readers meet and connect in real life, forging new friendships." },
              { icon: BookOpen, title: "More People Reading", desc: "Removing the cost barrier encourages a broader reading culture." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center p-6 bg-gray-800/50 rounded-3xl border border-gray-700 hover:bg-gray-800 transition-colors">
                <div className="w-16 h-16 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center mb-6 text-orange-400">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-white rounded-full mb-6 text-green-600 shadow-sm border border-gray-100">
              <ShieldCheck size={40} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">A Trusted Community</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              To ensure a high-quality experience, all users provide a fully refundable security deposit.
              Our built-in rating system keeps the community honest, reliable, and friendly.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: BadgeCheck, color: "text-green-600 bg-green-50", title: "Verified Users", desc: "Every member is verified with a security deposit ensuring accountable exchanges." },
              { icon: Star, color: "text-yellow-500 bg-yellow-50", title: "Ratings & Reviews", desc: "Rate your exchange partner after every meetup to keep quality high." },
              { icon: ShieldCheck, color: "text-blue-600 bg-blue-50", title: "Secure Deposits", desc: "Your deposit is 100% refundable and held securely until exchange is confirmed." },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <div className={`inline-flex p-3 rounded-full mb-4 ${color}`}><Icon size={24} /></div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block py-1.5 px-3 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-semibold tracking-wider uppercase mb-4">What Readers Say</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Loved by Book Lovers</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Priya S.", city: "Bengaluru", stars: 5, text: "I've exchanged 14 books so far and made 3 new friends! BookBarter is the best thing that happened to my reading habit." },
              { name: "Rohan M.", city: "Mumbai", stars: 5, text: "The Magic Coin system is genius. I listed 5 old books and used the coins to get 6 new ones. Saved thousands of rupees!" },
              { name: "Ananya K.", city: "Hyderabad", stars: 5, text: "Super easy to use. Listed my book, someone requested it, we met at a café, and I walked home with a new read. Love it." },
              { name: "Dev P.", city: "Pune", stars: 5, text: "Finally an app that makes physical books social again. The community meetups are such a great idea." },
              { name: "Meena R.", city: "Chennai", stars: 5, text: "I was skeptical at first but the deposit system makes it trustworthy. Every exchange I've had has been smooth." },
              { name: "Arjun T.", city: "Delhi", stars: 5, text: "My bookshelf was overflowing. Now I cycle through books with zero cost. This platform is a gem." },
            ].map(({ name, city, stars, text }) => (
              <div key={name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{name}</p>
                    <p className="text-xs text-gray-400">{city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Genres */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Books for Every Reader</h2>
          <p className="text-gray-500 mb-8">Browse across genres — there's always something waiting for you.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Fiction", "Non-Fiction", "Science & Tech", "Self-Help", "Biography", "History", "Fantasy", "Mystery", "Philosophy", "Business", "Travel", "Comics"].map((genre) => (
              <Link key={genre} href="/marketplace"
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50 transition-colors shadow-sm">
                {genre}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block py-1.5 px-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wider uppercase mb-4">Support</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {[
              { q: "Is the ₹500 deposit refundable?", a: "Yes. The deposit is fully refundable and exists only to ensure accountability within the community and prevent fake profiles." },
              { q: "Do I need to ship books?", a: "No. BookBarter focuses on local meetups, making exchanges simple, safe, and courier-free." },
              { q: "How are Magic Coins calculated?", a: "Magic Coins are calculated using a simple formula: Magic Coins = Book MRP ÷ 10. For example, a ₹400 book gives you 40 Magic Coins." },
              { q: "Can I exchange books in different cities?", a: "Currently, exchanges happen within your local city, ensuring easy and safe in-person meetups." },
              { q: "What if someone doesn't show up for the meetup?", a: "Users rate each other after an exchange and can report issues. Repeated violations will affect account reputation and lead to bans." },
            ].map((faq, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
                  <span className="text-indigo-600 mt-1"><MessageCircle size={20} /></span>
                  {faq.q}
                </h3>
                <p className="text-gray-600 leading-relaxed ml-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-orange-50/50 border-t border-orange-100 text-center">
        <div className="max-w-3xl mx-auto">
          <BookHeart size={48} className="text-orange-500 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Georgia', serif" }}>Our Vision</h2>
          <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed mb-8 italic">
            "We believe books should circulate, not collect dust."
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            TheBookBarter was created to make reading more accessible while building meaningful connections between readers.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            By combining technology with community values, we aim to create India's largest peer-to-peer book exchange network.
          </p>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block py-1.5 px-3 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-semibold tracking-wider uppercase mb-4">Future</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What's Coming Next</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Our journey has just begun. Here is what we are building next.</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: Rocket, color: "bg-blue-100 text-blue-600", title: "Mobile App", desc: "Native iOS and Android apps." },
              { icon: MapPinIcon, color: "bg-red-100 text-red-600", title: "Smart Locations", desc: "Automated safe public meetup spots." },
              { icon: Sparkles, color: "bg-yellow-100 text-yellow-600", title: "Personalized AI", desc: "AI-driven book recommendations." },
              { icon: Globe2, color: "bg-green-100 text-green-600", title: "City Expansion", desc: "Expanding to 50+ new cities." },
              { icon: Search, color: "bg-indigo-100 text-indigo-600", title: "Reading Goals", desc: "Community gamification." }
            ].map(({ icon: Icon, color, title, desc }, i) => (
              <div key={i} className="flex flex-col items-center text-center p-5 rounded-2xl border border-gray-100 shadow-sm bg-gray-50">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${color}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-[1.05rem] font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#111827] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.15)_0%,_transparent_70%)]"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
            Exchange books, discover new stories, and meet fellow readers in your city.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register" className="flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors text-base shadow-lg shadow-orange-500/20">
              Create Free Account <ArrowRight size={18} />
            </Link>
            <Link href="/marketplace" className="flex items-center justify-center px-8 py-4 bg-transparent text-white border border-gray-600 hover:border-gray-400 rounded-xl font-semibold transition-colors text-base">
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
