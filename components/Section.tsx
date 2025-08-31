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
    <section className="py-16">
      <Container>
        <div className="max-w-3xl">
          {overline && <div className="text-brand-green font-medium">{overline}</div>}
          <h2 className="mt-1 text-2xl md:text-3xl font-semibold">{title}</h2>
          {subtitle && <p className="mt-2 text-slate-700">{subtitle}</p>}
        </div>
        <div className="mt-8">{children}</div>
      </Container>
    </section>
  );
}
