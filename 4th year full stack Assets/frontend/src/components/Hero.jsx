export default function Hero() {
    const inputBase = 'w-full rounded-xl border border-gray-300 pl-10 pr-3 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition';
    return (
        <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6 py-12">
                {/* Left: hero image */}
                <div className="relative">
                    <img src="/images/hero.svg" alt="Team collaboration" className="w-full h-full object-cover rounded-xl shadow-lg" />
                    {/* Decorative shapes */}
                    <img src="/shapes/ellipse-1.svg" alt="" className="pointer-events-none absolute -top-6 -left-6 w-24 opacity-60" />
                    <img src="/shapes/group.svg" alt="" className="pointer-events-none absolute -bottom-8 -right-10 w-28 opacity-40" />
                </div>

                {/* Right: consultation card */}
                <div className="bg-white text-gray-900 rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Get a Free Consultation</h3>
                    <form className="space-y-3">
                        <div className="relative">
                            <img src="/icons/Group.svg" alt="" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
                            <input className={inputBase} placeholder="Full Name" />
                        </div>
                        <div className="relative">
                            <img src="/icons/circle-dollar-sign.svg" alt="" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
                            <input className={inputBase} type="email" placeholder="Email" />
                        </div>
                        <div className="relative">
                            <img src="/icons/home.svg" alt="" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
                            <input className={inputBase} placeholder="Mobile" />
                        </div>
                        <div className="relative">
                            <img src="/icons/paintbrush-2.svg" alt="" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
                            <input className={inputBase} placeholder="City" />
                        </div>
                        <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-indigo-700 transition">Request Callback</button>
                    </form>
                    <p className="text-xs text-gray-500 mt-2">We’ll reach out within one business day.</p>
                </div>
            </div>
        </section>
    );
}
