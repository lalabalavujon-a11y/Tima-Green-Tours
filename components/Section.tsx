import Container from './Container';

export default function Section({
  overline,
  title,
  subtitle,
  children
}: {
  overline?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section-content">
      <Container>
        <div className="max-w-3xl mb-12">
          {overline && (
            <div className="text-brand-emerald-600 font-medium text-sm uppercase tracking-wide mb-2">
              {overline}
            </div>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-accent-gray-600 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        <div>{children}</div>
      </Container>
    </section>
  );
}
