import { toAssetUrl } from '../lib/assets';
import { useState } from 'react';

export default function ClientCard({ client }) {
    const imgSrc = toAssetUrl(client?.image);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    return (
        <div className="relative rounded-2xl bg-gradient-to-br from-white to-indigo-50/30 border border-gray-200/80 shadow-sm p-5 md:p-6 hover:shadow-md hover:-translate-y-0.5 transition">
            <img src="/shapes/Ellipse%2022.svg" alt="" className="pointer-events-none absolute -top-3 -right-3 w-10 opacity-20" />
            <div className="flex items-center gap-4">
                <div className="relative">
                    {loading && !error && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse rounded-full w-16 h-16 md:w-18 md:h-18 z-10">
                            <span className="w-8 h-8 rounded-full bg-gray-200" />
                        </div>
                    )}
                    {!error && (
                        <img
                            src={imgSrc}
                            alt={client?.name}
                            onError={() => { setError(true); setLoading(false); }}
                            onLoad={() => setLoading(false)}
                            className="w-16 h-16 md:w-18 md:h-18 object-cover rounded-full ring-2 ring-indigo-500/30"
                            loading="lazy"
                            decoding="async"
                            style={loading ? { visibility: 'hidden' } : {}}
                        />
                    )}
                </div>
                <div className="min-w-0">
                    <h3 className="text-base md:text-lg font-semibold truncate">{client?.name}</h3>
                    {client?.designation && (
                        <span className="mt-1 inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                            {client.designation}
                        </span>
                    )}
                </div>
            </div>
            {client?.description && (
                <p className="mt-3 text-sm text-gray-700 line-clamp-3">
                    {client.description}
                </p>
            )}
            <div className="mt-4 flex items-center gap-1 text-amber-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.922-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.196-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <span className="text-xs text-gray-600">Trusted Client</span>
            </div>
        </div>
    );
}
