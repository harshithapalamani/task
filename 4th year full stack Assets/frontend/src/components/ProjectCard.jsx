import { toAssetUrl, placeholderImage } from '../lib/assets';

export default function ProjectCard({ project, onClick, className = '', index }) {
    return (
        <div
            className={`relative bg-white rounded-2xl shadow border border-gray-100 cursor-pointer overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition ${className}`}
            onClick={() => onClick && onClick(project)}
        >
            <div className="relative">
                <img
                    src={toAssetUrl(project.image) || placeholderImage('project', project._id || index)}
                    alt={project.name}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = placeholderImage('project', project._id || index); }}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                    decoding="async"
                />
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
