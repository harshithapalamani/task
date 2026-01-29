export default function Footer() {
    return (
        <footer className="mt-16 bg-[#0b1450] text-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 py-12">
                <div>
                    <div className="flex items-center gap-3">
                        <img src="/images/logo.svg" alt="Brand" className="w-28" />
                    </div>
                    <p className="mt-3 text-sm text-white/80 max-w-xs">
                        We\'ve been helping families and individuals find their perfect spaces since 2021.
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                        <a href="#" aria-label="Facebook" className="grid place-items-center w-9 h-9 rounded bg-white/10 hover:bg-white/20">f</a>
                        <a href="#" aria-label="Twitter" className="grid place-items-center w-9 h-9 rounded bg-white/10 hover:bg-white/20">t</a>
                        <a href="#" aria-label="Instagram" className="grid place-items-center w-9 h-9 rounded bg-white/10 hover:bg-white/20">in</a>
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
                    <ul className="space-y-2 text-white/80 text-sm">
                        <li><a href="#" className="hover:text-white">Home</a></li>
                        <li><a href="#" className="hover:text-white">About us</a></li>
                        <li><a href="#contact" className="hover:text-white">Contact us</a></li>
                        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                        <li><a href="#" className="hover:text-white">Terms of use</a></li>
                        <li><a href="#" className="hover:text-white">Blogs</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-3">Popular Locations</h4>
                    <ul className="space-y-2 text-white/80 text-sm">
                        <li>Projects in Newtown</li>
                        <li>Projects in Rajarhat</li>
                        <li>Projects in New Alipore</li>
                        <li>Projects in Joka</li>
                        <li>Projects in Tollygunge</li>
                        <li>Projects in Madhyamgram</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-3">Contact Info</h4>
                    <ul className="space-y-3 text-white/80 text-sm">
                        <li className="flex items-center gap-3"><span className="inline-block w-8 h-8 rounded bg-white/10 grid place-items-center">📞</span> 7980678266</li>
                        <li className="flex items-center gap-3"><span className="inline-block w-8 h-8 rounded bg-white/10 grid place-items-center">✉</span> info@example.com</li>
                        <li className="flex items-center gap-3"><span className="inline-block w-8 h-8 rounded bg-white/10 grid place-items-center">📍</span> 52/A, Rajani Mukherjee Road, Sahapur, New Alipore, Kol - 38</li>
                    </ul>
                </div>
            </div>
            <div className="px-6 py-4 border-t border-white/10 text-center text-white/70">Copyright © 2026. All rights reserved.</div>
        </footer>
    );
}
