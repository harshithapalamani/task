import { toAssetUrl } from '../lib/assets';
import { useState } from 'react';

export default function ProjectCard({ project, onClick, className = '', index }) {
    const imgSrc = toAssetUrl(project?.image);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    return (
        <div
            className={`relative bg-white rounded-2xl shadow border border-gray-100 cursor-pointer overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition ${className}`}
            onClick={() => onClick && onClick(project)}
        >
            <div className="relative">
                {loading && !error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse rounded w-full h-48 z-10">
                        <span className="w-12 h-12 rounded-full bg-gray-200" />
                    </div>
                )}
                {!error && (
                    <img
                        src={imgSrc}
                        alt={project.name}
                        onError={() => { setError(true); setLoading(false); }}
                        onLoad={() => setLoading(false)}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                        decoding="async"
                        style={loading ? { visibility: 'hidden' } : {}}
                    />
                )}
                {/* gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                {/* decorative shape */}
                <img src="/shapes/Ellipse%2024.svg" alt="" className="pointer-events-none absolute -top-2 -left-2 w-12 opacity-20" />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                <button
                    className="mt-3 inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-indigo-700 shadow"
                    onClick={(e) => { e.stopPropagation(); onClick && onClick(project); }}
                >
                    <span>Read More</span>
                    <span className="inline-block">→</span>
                </button>
            </div>
        </div>
    );
}
