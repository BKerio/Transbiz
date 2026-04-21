interface FilterTabsProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export default function FilterTabs({ categories, active, onChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-12">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            active === cat
              ? "bg-brand text-[#050505]"
              : "bg-transparent border border-border-dark text-white hover:border-white/25"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
