import { useState } from 'react';
import api from '../lib/api';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);
        setSubmitting(true);
        try {
            const { data } = await api.post('/subscribers', { email });
            setStatus({ type: 'success', message: data.message || 'Subscribed' });
            setEmail('');
        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.error || 'Failed to subscribe' });
        } finally {
            setSubmitting(false);
        }
    };

    const inputBase = 'w-full rounded-xl border border-gray-300 pl-10 pr-3 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition';

    return (
        <form onSubmit={onSubmit} className="relative space-y-4 bg-white p-6 rounded-2xl shadow-lg">
            <img src="/shapes/Ellipse 28.svg" alt="" className="pointer-events-none absolute -top-3 -left-3 w-12 opacity-30" />
            <h3 className="text-xl font-semibold flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white text-sm">@</span>
                Subscribe to Newsletter
            </h3>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <img src="/icons/circle-dollar-sign.svg" alt="" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
                    <input className={inputBase} type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button disabled={submitting} className="bg-indigo-600 text-white px-5 py-3 rounded-xl cursor-pointer hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed shadow">
                    {submitting ? 'Subscribing…' : 'Subscribe'}
                </button>
            </div>
            {status && (
                <p className={status.type === 'success' ? 'text-green-600' : 'text-red-600'}>{status.message}</p>
            )}
        </form>
    );
}
