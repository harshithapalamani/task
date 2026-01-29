import { useState } from 'react';
import api from '../lib/api';

export default function ContactForm() {
    const [form, setForm] = useState({ fullName: '', email: '', mobile: '', city: '' });
    const [status, setStatus] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);
        setSubmitting(true);
        try {
            const { data } = await api.post('/contacts', form);
            setStatus({ type: 'success', message: data.message || 'Submitted successfully' });
            setForm({ fullName: '', email: '', mobile: '', city: '' });
        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.error || 'Failed to submit' });
        } finally {
            setSubmitting(false);
        }
    };

    const inputBase = 'w-full rounded-xl border border-gray-300 px-10 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition';

    return (
        <form onSubmit={onSubmit} className="relative space-y-4 bg-white p-6 rounded-2xl shadow-lg">
            <img src="/shapes/Ellipse%2022.svg" alt="" className="pointer-events-none absolute -top-3 -right-3 w-16 opacity-30" />
            <h3 className="text-xl font-semibold flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white text-sm">✉</span>
                Contact Us
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <img src="/icons/Group.svg" alt="" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
                    <input className={inputBase} name="fullName" placeholder="Full Name" value={form.fullName} onChange={onChange} required />
                </div>
                <div className="relative">
                    <img src="/icons/circle-dollar-sign.svg" alt="" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
                    <input className={inputBase} type="email" name="email" placeholder="Email" value={form.email} onChange={onChange} required />
                </div>
                <div className="relative">
                    <img src="/icons/home.svg" alt="" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
                    <input
                        className={inputBase}
                        name="mobile"
                        placeholder="Mobile Number"
                        value={form.mobile}
                        onChange={(e) => {
                            // allow digits only
                            const digitsOnly = e.target.value.replace(/\D+/g, '');
                            setForm({ ...form, mobile: digitsOnly });
                        }}
                        inputMode="numeric"
                        pattern="^\\d{10}$"
                        maxLength={10}
                        title="Enter a 10-digit mobile number"
                        required
                    />
                </div>
                <div className="relative">
                    <img src="/icons/paintbrush-2.svg" alt="" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
                    <input className={inputBase} name="city" placeholder="City" value={form.city} onChange={onChange} required />
                </div>
            </div>
            <button disabled={submitting} className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl cursor-pointer transition shadow">
                {submitting ? 'Submitting…' : 'Submit'}
            </button>
            {status && (
                <p className={status.type === 'success' ? 'text-green-600' : 'text-red-600'}>{status.message}</p>
            )}
        </form>
    );
}
