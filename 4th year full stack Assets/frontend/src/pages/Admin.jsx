import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import AdminHeader from '../components/admin/AdminHeader';
import StatCard from '../components/admin/StatCard';
import AdminLists from '../components/admin/AdminLists';

function Login({ onLoggedIn }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            onLoggedIn(data.token);
            // Ensure route is correct and trigger visual update
            navigate('/admin', { replace: true });
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    const inputBase = 'w-full rounded-xl border border-gray-300 pl-10 pr-3 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition';
    return (
        <form onSubmit={onSubmit} className="max-w-md space-y-4 bg-white p-6 rounded-2xl shadow">
            <h3 className="text-lg font-semibold">Admin Login</h3>
            <div className="relative">
                <img src="/icons/circle-dollar-sign.svg" alt="" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
                <input className={inputBase} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="relative">
                <img src="/icons/home.svg" alt="" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
                <input className={inputBase} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl cursor-pointer hover:bg-indigo-700 transition">Login</button>
            {error && <p className="text-red-600">{error}</p>}
        </form>
    );
}

function AddProject() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);
        try {
            const fd = new FormData();
            fd.append('name', name);
            fd.append('description', description);
            if (image) fd.append('image', image);
            const { data } = await api.post('/projects', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
            setStatus({ type: 'success', message: 'Project added' });
            setName('');
            setDescription('');
            setImage(null);
            setPreviewUrl(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.error || 'Failed to add project' });
        }
    };

    const inputBaseP = 'w-full rounded-xl border border-gray-300 px-3 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition';
    return (
        <form onSubmit={onSubmit} className="relative space-y-4 bg-white p-5 rounded-xl shadow">
            <img src="/shapes/Ellipse%205.svg" alt="" className="absolute right-4 top-4 w-14 opacity-40 pointer-events-none" />
            <h3 className="text-lg font-semibold flex items-center gap-2">
                <img src="/icons/home.svg" alt="" className="w-5 h-5" />
                Add Project
            </h3>
            <label className="block text-sm font-medium">Name</label>
            <div className="relative">
                <img src="/icons/Group.svg" alt="" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
                <input className={`${inputBaseP} pl-10`} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <label className="block text-sm font-medium">Description</label>
            <textarea className={inputBaseP} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <label className="block text-sm font-medium">Image</label>
            <div className="flex items-center gap-3">
                <button type="button" className="bg-gray-800 text-white px-3 py-2 rounded text-sm cursor-pointer hover:bg-gray-900" onClick={() => fileInputRef.current?.click()}>Choose File</button>
                <span className="text-xs text-gray-600 truncate max-w-[220px]">{image?.name || 'No file selected'}</span>
            </div>
            <input
                ref={fileInputRef}
                className="sr-only"
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files[0] || null;
                    setImage(file);
                    if (file) setPreviewUrl(URL.createObjectURL(file));
                    else setPreviewUrl(null);
                }}
                required
            />
            <p className="text-xs text-gray-500">Images are automatically cropped to 450×350 for consistency.</p>
            {previewUrl && (
                <div className="mt-2">
                    <div className="text-xs text-gray-600 mb-1">Preview</div>
                    <img src={previewUrl} alt="preview" className="w-48 h-40 object-cover rounded border" />
                </div>
            )}
            <button className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-2 rounded-xl cursor-pointer">Add</button>
            {status && (
                <p className={status.type === 'success' ? 'text-green-600' : 'text-red-600'}>{status.message}</p>
            )}
        </form>
    );
}

function AddClient() {
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);
        try {
            const fd = new FormData();
            fd.append('name', name);
            fd.append('designation', designation);
            fd.append('description', description);
            if (image) fd.append('image', image);
            const { data } = await api.post('/clients', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
            setStatus({ type: 'success', message: 'Client added' });
            setName('');
            setDesignation('');
            setDescription('');
            setImage(null);
            setPreviewUrl(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.error || 'Failed to add client' });
        }
    };

    const inputBaseC = 'w-full rounded-xl border border-gray-300 px-3 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition';
    return (
        <form onSubmit={onSubmit} className="relative space-y-4 bg-white p-5 rounded-xl shadow">
            <img src="/shapes/Ellipse%204.svg" alt="" className="absolute right-4 top-4 w-14 opacity-40 pointer-events-none" />
            <h3 className="text-lg font-semibold flex items-center gap-2">
                <img src="/icons/paintbrush-2.svg" alt="" className="w-5 h-5" />
                Add Client
            </h3>
            <label className="block text-sm font-medium">Name</label>
            <div className="relative">
                <img src="/icons/Group.svg" alt="" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
                <input className={`${inputBaseC} pl-10`} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <label className="block text-sm font-medium">Designation</label>
            <div className="relative">
                <img src="/icons/paintbrush-2.svg" alt="" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
                <input className={`${inputBaseC} pl-10`} placeholder="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} required />
            </div>
            <label className="block text-sm font-medium">Description</label>
            <textarea className={inputBaseC} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <label className="block text-sm font-medium">Image</label>
            <div className="flex items-center gap-3">
                <button type="button" className="bg-gray-800 text-white px-3 py-2 rounded text-sm cursor-pointer hover:bg-gray-900" onClick={() => fileInputRef.current?.click()}>Choose File</button>
                <span className="text-xs text-gray-600 truncate max-w-[220px]">{image?.name || 'No file selected'}</span>
            </div>
            <input
                ref={fileInputRef}
                className="sr-only"
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files[0] || null;
                    setImage(file);
                    if (file) setPreviewUrl(URL.createObjectURL(file));
                    else setPreviewUrl(null);
                }}
                required
            />
            <p className="text-xs text-gray-500">Images are automatically cropped to 450×350 for consistency.</p>
            {previewUrl && (
                <div className="mt-2">
                    <div className="text-xs text-gray-600 mb-1">Preview</div>
                    <img src={previewUrl} alt="preview" className="w-48 h-40 object-cover rounded border" />
                </div>
            )}
            <button className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-2 rounded-xl cursor-pointer">Add</button>
            {status && (
                <p className={status.type === 'success' ? 'text-green-600' : 'text-red-600'}>{status.message}</p>
            )}
        </form>
    );
}

function DataLists() {
    const [contacts, setContacts] = useState([]);
    const [contactsTotal, setContactsTotal] = useState(0);
    const [contactsPage, setContactsPage] = useState(1);
    const [contactsPages, setContactsPages] = useState(1);
    const [contactsQuery, setContactsQuery] = useState('');
    const [contactsSortBy, setContactsSortBy] = useState('createdAt');
    const [contactsSortDir, setContactsSortDir] = useState('desc');
    const [subs, setSubs] = useState([]);

    const limit = 10;

    const fetchContacts = async ({ page = 1, q = '', sortBy = contactsSortBy, sortDir = contactsSortDir } = {}) => {
        try {
            const { data } = await api.get('/contacts', { params: { page, limit, q, sortBy, sortDir } });
            setContacts(data.data || []);
            setContactsTotal(data.total || 0);
            setContactsPage(data.page || 1);
            setContactsPages(data.pages || 1);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        (async () => {
            await fetchContacts({ page: 1, q: '' });
            try {
                const sRes = await api.get('/subscribers');
                setSubs(sRes.data || []);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    useEffect(() => {
        const t = setTimeout(() => {
            fetchContacts({ page: 1, q: contactsQuery });
        }, 300);
        return () => clearTimeout(t);
    }, [contactsQuery]);

    useEffect(() => {
        fetchContacts({ page: 1, q: contactsQuery, sortBy: contactsSortBy, sortDir: contactsSortDir });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contactsSortBy, contactsSortDir]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl shadow">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">Contact Submissions</h3>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{contactsTotal}</span>
                </div>
                <div className="mb-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="relative md:col-span-2">
                        <img src="/icons/Group.svg" alt="" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
                        <input
                            className="w-full rounded-xl border border-gray-300 pl-10 pr-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            placeholder="Search name, email, mobile, city"
                            value={contactsQuery}
                            onChange={(e) => setContactsQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <select
                            className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            value={contactsSortBy}
                            onChange={(e) => setContactsSortBy(e.target.value)}
                        >
                            <option value="createdAt">Date</option>
                            <option value="fullName">Name</option>
                            <option value="email">Email</option>
                            <option value="city">City</option>
                        </select>
                        <select
                            className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            value={contactsSortDir}
                            onChange={(e) => setContactsSortDir(e.target.value)}
                        >
                            <option value="desc">Desc</option>
                            <option value="asc">Asc</option>
                        </select>
                    </div>
                </div>
                {contacts.length === 0 ? (
                    <p className="text-sm text-gray-500">No contacts yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {contacts.map((c) => (
                            <li key={c._id} className="rounded-xl border border-gray-200 px-4 py-3 flex items-start justify-between gap-4 hover:bg-gray-50 transition">
                                <div>
                                    <div className="font-medium">{c.fullName} <span className="text-gray-500">({c.city})</span></div>
                                    <div className="text-sm text-gray-600">{c.email} • {c.mobile}</div>
                                </div>
                                <a href={`mailto:${c.email}`} className="shrink-0 inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm">
                                    <img src="/icons/circle-dollar-sign.svg" alt="" className="w-4 h-4 opacity-70" />
                                    Email
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-gray-600">Page {contactsPage} of {contactsPages}</span>
                    <div className="flex items-center gap-2">
                        <button
                            className="px-3 py-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={contactsPage <= 1}
                            onClick={() => fetchContacts({ page: contactsPage - 1, q: contactsQuery })}
                        >
                            Prev
                        </button>
                        <button
                            className="px-3 py-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={contactsPage >= contactsPages}
                            onClick={() => fetchContacts({ page: contactsPage + 1, q: contactsQuery })}
                        >
                            Next
                        </button>
                        <button
                            className="ml-2 px-3 py-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-50"
                            onClick={async () => {
                                try {
                                    const { data } = await api.get('/contacts/export', {
                                        params: { q: contactsQuery, sortBy: contactsSortBy, sortDir: contactsSortDir },
                                        responseType: 'blob',
                                    });
                                    const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
                                    const url = window.URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = `contacts_export_${Date.now()}.csv`;
                                    document.body.appendChild(a);
                                    a.click();
                                    a.remove();
                                    window.URL.revokeObjectURL(url);
                                } catch (err) {
                                    console.error(err);
                                }
                            }}
                        >
                            Export CSV
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">Subscribers</h3>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{subs.length}</span>
                </div>
                {subs.length === 0 ? (
                    <p className="text-sm text-gray-500">No subscribers yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {subs.map((s) => (
                            <li key={s._id} className="rounded-xl border border-gray-200 px-4 py-3 text-sm flex items-center justify-between hover:bg-gray-50 transition">
                                <span>{s.email}</span>
                                <a href={`mailto:${s.email}`} className="shrink-0 inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700">
                                    <img src="/icons/circle-dollar-sign.svg" alt="" className="w-4 h-4 opacity-70" />
                                    Email
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default function Admin() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [counts, setCounts] = useState({ projects: 0, clients: 0, contacts: 0, subscribers: 0 });

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    // In case localStorage changes externally, keep token in sync
    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === 'token') {
                setToken(localStorage.getItem('token'));
            }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    // Fetch counts when authenticated; keep hooks before conditional returns
    useEffect(() => {
        if (!token) return;
        (async () => {
            try {
                const [p, c, ct, s] = await Promise.all([
                    api.get('/projects'),
                    api.get('/clients'),
                    api.get('/contacts', { params: { limit: 1, page: 1 } }),
                    api.get('/subscribers'),
                ]);
                setCounts({
                    projects: (p.data || []).length,
                    clients: (c.data || []).length,
                    contacts: (ct.data?.total) ?? ((ct.data || []).length || 0),
                    subscribers: (s.data || []).length,
                });
            } catch { }
        })();
    }, [token]);

    if (!token) return <Login onLoggedIn={setToken} />;

    return (
        <div className="space-y-8">
            <AdminHeader onLogout={logout} />

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon="/icons/home.svg" label="Projects" value={counts.projects} />
                <StatCard icon="/icons/paintbrush-2.svg" label="Clients" value={counts.clients} />
                <StatCard icon="/icons/circle-dollar-sign.svg" label="Contacts" value={counts.contacts} />
                <StatCard icon="/icons/Group.svg" label="Subscribers" value={counts.subscribers} />
            </div>

            {/* Clients & Projects Lists for Admin */}
            <AdminLists />

            {/* Lists */}
            <DataLists />

            {/* Forms */}
            <div id="admin-forms" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AddProject />
                <AddClient />
            </div>
        </div>
    );
}
