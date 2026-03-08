interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-cerrado-800">{title}</h2>
      {subtitle ? <p className="mt-2 text-cerrado-700">{subtitle}</p> : null}
    </div>
  );
}
