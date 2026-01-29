import { toAssetUrl, placeholderImage } from '../lib/assets';

export default function ClientCard({ client, index }) {
    return (
        <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition">
            <img src="/shapes/Ellipse%2022.svg" alt="" className="pointer-events-none absolute -top-3 -right-3 w-12 opacity-20" />
            <div className="flex flex-col items-center text-center">
                <img
                    src={toAssetUrl(client.image) || placeholderImage('client', client._id || index)}
                    alt={client.name}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = placeholderImage('client', client._id || index); }}
                    className="w-20 h-20 object-cover rounded-full ring-2 ring-indigo-500/40"
                />
                <h3 className="mt-3 text-lg font-semibold">{client.name}</h3>
                <span className="mt-1 inline-block px-2 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">{client.designation}</span>
                <p className="mt-2 text-sm text-gray-700 max-w-xs">{client.description}</p>
            </div>
        </div>
    );
}
