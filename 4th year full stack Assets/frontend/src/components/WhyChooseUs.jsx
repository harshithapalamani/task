export default function WhyChooseUs() {
    const items = [
        { title: 'Potential ROI', desc: 'Data-backed strategies to maximize returns.', icon: '/icons/roi.svg' },
        { title: 'Design', desc: 'Clean, modern, user-centered design principles.', icon: '/icons/design.svg' },
        { title: 'Marketing', desc: 'Clear messaging and targeted campaigns.', icon: '/icons/marketing.svg' },
    ];
    return (
        <section className="text-center">
            <h2 className="text-2xl font-bold mb-6">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((it) => (
                    <div key={it.title} className="bg-white rounded-xl shadow p-6">
                        <img src={it.icon} alt="" className="mx-auto w-12 h-12" />
                        <h3 className="mt-3 font-semibold">{it.title}</h3>
                        <p className="text-sm text-gray-600">{it.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
