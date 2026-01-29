export default function IntroSection() {
    return (
        <section className="relative">
            <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-1">
                    <h2 className="text-2xl font-bold mb-2">Not Your Average Realtor</h2>
                    <p className="text-sm text-gray-600">
                        Practical strategies, clean design, and marketing that actually delivers.
                    </p>
                </div>
                <div className="md:col-span-2 flex items-center gap-6">
                    <img src="/images/pexels-brett-sayles-2881232.svg" alt="Profile" className="w-28 h-28 rounded-full object-cover shadow" />
                    <img src="/images/pexels-brett-sayles-2881232-2.svg" alt="Team" className="w-20 h-20 rounded-full object-cover shadow" />
                    <img src="/images/pexels-brett-sayles-2881232-3.svg" alt="Meeting" className="w-16 h-16 rounded-full object-cover shadow" />
                </div>
            </div>
        </section>
    );
}
