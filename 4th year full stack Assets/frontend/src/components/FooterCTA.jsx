export default function FooterCTA() {
    return (
        <section className="relative rounded-xl overflow-hidden">
            <img src="/images/Rectangle.svg" alt="Interior" className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                <h3 className="text-xl font-semibold text-center">Learn more about our listing process, as well as our additional staging and design work.</h3>
                <a href="#" className="mt-3 bg-white text-gray-900 px-4 py-2 rounded">Learn More</a>
            </div>
        </section>
    );
}
