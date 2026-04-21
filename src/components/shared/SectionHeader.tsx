interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  light = false,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`text-center max-w-[640px] mx-auto mb-12 md:mb-16 ${className}`}>
      <span className="inline-block text-xs font-semibold uppercase tracking-[0.12em] text-brand mb-4">
        {label}
      </span>
      <h2
        className={`font-heading font-bold text-[clamp(28px,3vw,40px)] leading-[1.15] tracking-[-0.02em] ${
          light ? "text-txt-dark" : "text-txt-primary"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? "text-txt-dark-secondary" : "text-txt-secondary"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
