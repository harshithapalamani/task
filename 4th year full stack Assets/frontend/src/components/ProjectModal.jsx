import { useEffect } from 'react';
import { toAssetUrl } from '../lib/assets';

export default function ProjectModal({ project, onClose }) {
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    if (!project) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-xl max-w-xl w-full overflow-hidden">
                    <div className="relative">
                        <img src={toAssetUrl(project.image)} alt={project.name} className="w-full h-56 object-cover" />
                        <button className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded cursor-pointer" onClick={onClose}>Close</button>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold">{project.name}</h3>
                        <p className="text-sm text-gray-700 mt-2">{project.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
