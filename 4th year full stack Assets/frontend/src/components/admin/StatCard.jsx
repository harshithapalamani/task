export default function StatCard({ icon, label, value }) {
    return (
        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
            <img src={icon} alt="" className="w-8 h-8" />
            <div>
                <div className="text-xs text-gray-500">{label}</div>
                <div className="text-xl font-semibold">{value}</div>
            </div>
        </div>
    );
}
