import { toAssetUrl } from '../lib/assets';

export default function ClientCard({ client }) {
    return (
        <div className="bg-white rounded-2xl shadow p-4 border border-gray-100 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition">
            <img
                src={toAssetUrl(client.image)}
                alt={client.name}
                className="w-20 h-20 object-cover rounded-full mx-auto"
            />
            <h3 className="mt-3 text-base font-semibold text-center">{client.name}</h3>
            <p className="text-xs text-gray-600 text-center">{client.designation}</p>
            <p className="text-sm text-gray-700 mt-2 text-center">{client.description}</p>
        </div>
    );
}
