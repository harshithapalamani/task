import { useEffect, useState, useRef } from 'react';
import api from '../lib/api';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import ClientCard from '../components/ClientCard';
import ContactForm from '../components/ContactForm';
import Newsletter from '../components/Newsletter';
import IntroSection from '../components/IntroSection';
import GallerySection from '../components/GallerySection';
import AboutSection from '../components/AboutSection';
import FooterCTA from '../components/FooterCTA';

export default function Landing() {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const projectsRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [showDragHint, setShowDragHint] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const [projRes, clientRes] = await Promise.all([
                    api.get('/projects'),
                    api.get('/clients'),
                ]);
                setProjects(projRes.data || []);
                setClients(clientRes.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        const el = projectsRef.current;
        if (!el) return;
        const updateScrollState = () => {
            const left = el.scrollLeft;
            const maxLeft = el.scrollWidth - el.clientWidth;
            setCanScrollLeft(left > 0);
            setCanScrollRight(left < maxLeft - 1);
            if (showDragHint && left > 0) {
                setShowDragHint(false);
                try { localStorage.setItem('projectsDragHintSeen', '1'); } catch { }
            }
        };
        updateScrollState();
        el.addEventListener('scroll', updateScrollState, { passive: true });
        window.addEventListener('resize', updateScrollState);
        return () => {
            el.removeEventListener('scroll', updateScrollState);
            window.removeEventListener('resize', updateScrollState);
        };
    }, [showDragHint]);

    useEffect(() => {
        try {
            const seen = localStorage.getItem('projectsDragHintSeen');
            if (!seen) {
                setShowDragHint(true);
                const t = setTimeout(() => setShowDragHint(false), 3000);
                return () => clearTimeout(t);
            }
        } catch { }
    }, []);

    return (
        <div className="space-y-10">
            {/* Hero */}
            <Hero />

            {/* Intro */}
            <IntroSection />

            {/* Why Choose Us */}
            <WhyChooseUs />
            {/* Our Projects (Horizontal Scroll) */}
            <section id="projects" className="relative">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Our Projects</h2>
                    <div className="hidden md:flex items-center gap-2">
                        <button aria-label="Scroll left" className="h-9 w-9 rounded-full bg-white shadow ring-1 ring-gray-200 grid place-items-center cursor-pointer hover:bg-gray-50" onClick={() => projectsRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}>‹</button>
                        <button aria-label="Scroll right" className="h-9 w-9 rounded-full bg-white shadow ring-1 ring-gray-200 grid place-items-center cursor-pointer hover:bg-gray-50" onClick={() => projectsRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}>›</button>
                    </div>
                </div>
                {loading && <p>Loading...</p>}
                <div className="relative">
                    {/* Left edge fade */}
                    {canScrollLeft && (
                        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white/95 to-white/0"></div>
                    )}
                    {/* Right edge fade */}
                    {canScrollRight && (
                        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white/95 to-white/0"></div>
                    )}
                    {/* Drag hint */}
                    {showDragHint && (
                        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-2 md:top-0 z-10">
                            <div className="px-3 py-1 rounded-full bg-white shadow ring-1 ring-gray-200 text-xs text-gray-700 animate-pulse">Drag to scroll ↔</div>
                        </div>
                    )}
                    <div
                        ref={projectsRef}
                        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 no-scrollbar"
                    >
                        {projects.map((p) => (
                            <ProjectCard key={p._id} project={p} onClick={setSelectedProject} className="min-w-[280px] snap-start" />
                        ))}
                    </div>
                </div>
                <img src="/shapes/Ellipse%2024.svg" alt="" className="absolute -top-6 -left-6 w-20 opacity-30" />
                <img src="/shapes/Ellipse%2025.svg" alt="" className="absolute -bottom-8 -right-10 w-16 opacity-20" />
            </section>

            {/* Happy Clients */}
            <section className="relative">
                <h2 className="text-2xl font-bold mb-4">Happy Clients</h2>
                {loading && <p>Loading...</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {clients.map((c, i) => (
                        <ClientCard key={c._id || i} client={c} index={i} />
                    ))}
                </div>
                <img src="/shapes/Ellipse%2027.svg" alt="" className="absolute -top-6 -right-6 w-14 opacity-20" />
                <img src="/shapes/Ellipse%2022.svg" alt="" className="absolute -bottom-6 -left-6 w-14 opacity-20" />
            </section>

            {/* Gallery */}
            <GallerySection />

            {/* About */}
            <AboutSection />

            {/* Contact Form */}
            <section id="contact">
                <ContactForm />
            </section>

            {/* Newsletter */}
            <section>
                <Newsletter />
            </section>

            {/* Footer CTA */}
            <FooterCTA />

            {/* Project Modal */}
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </div>
    );
}
