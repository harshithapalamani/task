import { toAssetUrl, placeholderImage } from '../lib/assets';

export default function ProjectCard({ project, onClick, className = '', index }) {
    return (
        <div className={`bg-white rounded-2xl shadow p-4 border border-gray-100 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition ${className}`} onClick={() => onClick && onClick(project)}>
            <img
                src={toAssetUrl(project.image) || placeholderImage('project', project._id || index)}
                alt={project.name}
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = placeholderImage('project', project._id || index); }}
                className="w-full h-44 object-cover rounded-xl"
            />
            <h3 className="mt-3 text-lg font-semibold">{project.name}</h3>
            <p className="text-sm text-gray-600">{project.description}</p>
            <button className="mt-3 inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-indigo-700 shadow" onClick={(e) => { e.stopPropagation(); onClick && onClick(project); }}>
                <span>Read More</span>
                <span className="inline-block">→</span>
            </button>
        </div>
    );
}
