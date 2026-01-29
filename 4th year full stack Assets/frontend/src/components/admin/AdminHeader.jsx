export default function AdminHeader({ onLogout, stats }) {
    return (
        <section className="relative rounded-xl overflow-hidden">
            <img src="/images/Rectangle.svg" alt="Interior" className="w-full h-40 object-cover" />
            <div className="absolute inset-0 bg-black/30">
                <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
                    <div>
                        <h2 className="text-white text-2xl font-bold">Admin Dashboard</h2>
                        <p className="text-white/80 text-sm">Manage projects, clients, contacts and subscribers</p>
                    </div>
                    <button onClick={onLogout} className="bg-white text-gray-900 text-sm px-4 py-2 rounded-xl shadow ring-1 ring-gray-200 hover:bg-gray-50 cursor-pointer">Logout</button>
                </div>
            </div>
        </section>
    );
}
