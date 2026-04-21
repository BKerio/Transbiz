const row1Items = [
  "Zero Emissions",
  "Smart Mobility",
  "Clean Energy",
  "Sustainable Future",
  "Eco-Friendly",
  "Green Technology",
  "Carbon Neutral",
  "Future of Transport",
  "Silent Power",
  "Energy Efficient",
  "Drive Green",
];

const row2Items = [
  "Electric Vehicles",
  "Fast Charging",
  "Long Range",
  "Smart Features",
  "Quiet Drive",
  "Low Maintenance",
  "Affordable",
  "Sustainable",
  "Innovative",
  "Reliable",
  "Eco-Conscious",
  "Modern Design",
];

function MarqueeRow({
  items,
  direction,
}: {
  items: string[];
  direction: "left" | "right";
}) {
  const tripled = [...items, ...items, ...items];

  return (
    <div className="marquee-track overflow-hidden py-2">
      <div
        className={`marquee-content flex gap-4 whitespace-nowrap ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
        style={{ width: "max-content" }}
      >
        {tripled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center px-6 py-2.5 border border-brand text-brand text-xs font-medium tracking-wide rounded-full bg-transparent"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="bg-bg-primary py-6 overflow-hidden">
      <MarqueeRow items={row1Items} direction="left" />
      <MarqueeRow items={row2Items} direction="right" />
    </section>
  );
}
