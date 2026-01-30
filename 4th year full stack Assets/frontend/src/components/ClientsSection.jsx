import { useEffect, useRef, useState } from 'react';
import ClientCard from './ClientCard';

export default function ClientsSection({ clients = [], loading }) {
    const trackRef = useRef(null);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(false);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        const update = () => {
            const left = el.scrollLeft;
            const max = el.scrollWidth - el.clientWidth;
            setCanLeft(left > 0);
            setCanRight(left < max - 1);
        };
        update();
        el.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            el.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [clients]);

    return (
        <section className="relative">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Happy Clients</h2>
                <div className="hidden md:flex items-center gap-2">
                    <button
                        aria-label="Scroll left"
                        className={`h-9 w-9 rounded-full bg-white shadow ring-1 ring-gray-200 grid place-items-center transition-all ${canLeft ? 'hover:bg-gray-50 cursor-pointer opacity-100' : 'opacity-40 cursor-not-allowed'}`}
                        style={{ cursor: canLeft ? 'pointer' : 'not-allowed' }}
                        onClick={() => trackRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
                    >
                        ‹
                    </button>
                    <button
                        aria-label="Scroll right"
                        className={`h-9 w-9 rounded-full bg-white shadow ring-1 ring-gray-200 grid place-items-center transition-all ${canRight ? 'hover:bg-gray-50 cursor-pointer opacity-100' : 'opacity-40 cursor-not-allowed'}`}
                        style={{ cursor: canRight ? 'pointer' : 'not-allowed' }}
                        onClick={() => trackRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
                    >
                        ›
                    </button>
                </div>
            </div>
            {loading && <p>Loading...</p>}
            <div className="relative">
                {canLeft && (
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white/95 to-white/0 z-10"></div>
                )}
                {canRight && (
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white/95 to-white/0 z-10"></div>
                )}
                <div ref={trackRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 no-scrollbar">
                    {clients.map((c, i) => (
                        <div key={c._id || i} className="min-w-[280px] md:min-w-[340px] snap-start">
                            <ClientCard client={c} index={i} />
                        </div>
                    ))}
                </div>
            </div>
            <img src="/shapes/Ellipse%2027.svg" alt="" className="pointer-events-none absolute -top-6 -right-6 w-14 opacity-20" />
            <img src="/shapes/Ellipse%2022.svg" alt="" className="pointer-events-none absolute -bottom-6 -left-6 w-14 opacity-20" />
        </section>
    );
}
