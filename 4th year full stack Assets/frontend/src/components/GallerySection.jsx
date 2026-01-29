export default function GallerySection() {
  const items = [
    '/images/pexels-fauxels-3182834.svg',
    '/images/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home%201.svg',
    '/images/pexels-andres-ayrton-6578391.svg',
  ];
  return (
    <section className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((src) => (
          <div key={src} className="relative">
            <img src={src} alt="Gallery" className="w-full h-52 object-cover rounded-xl shadow" />
            <img src="/shapes/Rectangle%2057.svg" alt="" className="absolute -top-3 -left-3 w-8 opacity-60" />
            <img src="/shapes/Rectangle%2058.svg" alt="" className="absolute -bottom-3 -right-3 w-8 opacity-60" />
          </div>
        ))}
      </div>
    </section>
  );
}
