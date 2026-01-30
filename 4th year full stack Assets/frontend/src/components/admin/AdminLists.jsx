import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { toAssetUrl, placeholderImage } from '../../lib/assets';

export default function AdminLists() {
    const [tab, setTab] = useState('projects');
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const [pRes, cRes] = await Promise.all([
                    api.get('/projects'),
                    api.get('/clients'),
                ]);
                setProjects(pRes.data || []);
                setClients(cRes.data || []);
            } catch (err) {
                console.error('Failed to load admin lists', err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const filterByQuery = (list, keys) => {
        if (!query.trim()) return list;
        const q = query.toLowerCase();
        return list.filter((item) => keys.some((k) => String(item[k] || '').toLowerCase().includes(q)));
    };

    const deleteProject = async (id) => {
        if (!id) return;
        const sure = window.confirm('Delete this project? This cannot be undone.');
        if (!sure) return;
        try {
            await api.delete(`/projects/${id}`);
            setProjects((prev) => prev.filter((p) => p._id !== id));
        } catch (err) {
            if (err.response?.status === 404) {
                // If not found, treat as already deleted and update UI
                setProjects((prev) => prev.filter((p) => p._id !== id));
                return;
            }
            alert(err.response?.data?.error || 'Failed to delete project');
        }
    };

    const ProjectRow = ({ item }) => (
        <li className="flex items-center gap-3 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
            <img
                src={toAssetUrl(item.image) || placeholderImage('project', item._id)}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = placeholderImage('project', item._id); }}
            />
            <div className="min-w-0">
                <div className="font-medium truncate">{item.name}</div>
                <div className="text-xs text-gray-600 truncate">{item.description}</div>
            </div>
            <button
                className="ml-auto shrink-0 text-xs bg-red-50 text-red-700 px-3 py-1 rounded border border-red-200 hover:bg-red-100"
                onClick={() => deleteProject(item._id)}
                title="Delete"
            >
                Delete
            </button>
        </li>
    );

    const deleteClient = async (id) => {
        if (!id) return;
        const sure = window.confirm('Delete this client? This cannot be undone.');
        if (!sure) return;
        try {
            await api.delete(`/clients/${id}`);
            setClients((prev) => prev.filter((c) => c._id !== id));
        } catch (err) {
            if (err.response?.status === 404) {
                setClients((prev) => prev.filter((c) => c._id !== id));
                return;
            }
            alert(err.response?.data?.error || 'Failed to delete client');
        }
    };

    const ClientRow = ({ item }) => (
        <li className="flex items-center gap-3 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
            <img
                src={toAssetUrl(item.image) || placeholderImage('client', item._id)}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-full"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = placeholderImage('client', item._id); }}
            />
            <div className="min-w-0">
                <div className="font-medium truncate">{item.name}</div>
                {item.designation && (
                    <div className="text-xs text-indigo-700 truncate">{item.designation}</div>
                )}
                {item.description && (
                    <div className="text-xs text-gray-600 truncate">{item.description}</div>
                )}
            </div>
            <button
                className="ml-auto shrink-0 text-xs bg-red-50 text-red-700 px-3 py-1 rounded border border-red-200 hover:bg-red-100"
                onClick={() => deleteClient(item._id)}
                title="Delete"
            >
                Delete
            </button>
        </li>
    );

    const filteredProjects = filterByQuery(projects, ['name', 'description']);
    const filteredClients = filterByQuery(clients, ['name', 'designation', 'description']);

    return (
        <div id="admin-lists" className="bg-white p-5 rounded-2xl shadow">
            <h3 className="text-lg font-semibold mb-3">Clients & Projects</h3>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <button
                        className={`px-3 py-1 rounded-lg border ${tab === 'projects' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200'} transition`}
                        onClick={() => setTab('projects')}
                    >
                        Projects ({projects.length})
                    </button>
                    <button
                        className={`px-3 py-1 rounded-lg border ${tab === 'clients' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200'} transition`}
                        onClick={() => setTab('clients')}
                    >
                        Clients ({clients.length})
                    </button>
                </div>
                <div className="relative">
                    <img src="/icons/Group.svg" alt="" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
                    <input
                        className="w-60 rounded-xl border border-gray-300 pl-10 pr-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder={`Search ${tab}`}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="mb-3 flex items-center justify-end gap-2">
                <button
                    className="text-xs bg-gray-800 text-white px-3 py-1.5 rounded-lg hover:bg-gray-900 transition"
                    onClick={async () => {
                        try {
                            const endpoint = tab === 'projects' ? '/projects/export' : '/clients/export';
                            const { data } = await api.get(endpoint, { responseType: 'blob' });
                            const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `${tab}_export_${Date.now()}.csv`;
                            document.body.appendChild(a);
                            a.click();
                            a.remove();
                            window.URL.revokeObjectURL(url);
                        } catch (err) {
                            alert(err.response?.data?.error || 'Failed to export CSV');
                        }
                    }}
                >
                    Export CSV ({tab})
                </button>
                <button
                    className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition"
                    onClick={async () => {
                        const sure = window.confirm(`Delete ALL ${tab}? This cannot be undone.`);
                        if (!sure) return;
                        try {
                            const endpoint = tab === 'projects' ? '/projects' : '/clients';
                            await api.delete(endpoint);
                            if (tab === 'projects') setProjects([]);
                            else setClients([]);
                        } catch (err) {
                            alert(err.response?.data?.error || 'Failed to delete all');
                        }
                    }}
                >
                    Delete All ({tab})
                </button>
            </div>
            {loading ? (
                <p className="text-sm text-gray-600">Loading…</p>
            ) : tab === 'projects' ? (
                filteredProjects.length === 0 ? (
                    <p className="text-sm text-gray-500">No projects found.</p>
                ) : (
                    <ul className="space-y-2">{filteredProjects.map((p) => <ProjectRow key={p._id} item={p} />)}</ul>
                )
            ) : (
                filteredClients.length === 0 ? (
                    <p className="text-sm text-gray-500">No clients found.</p>
                ) : (
                    <ul className="space-y-2">{filteredClients.map((c) => <ClientRow key={c._id} item={c} />)}</ul>
                )
            )}
        </div>
    );
}
