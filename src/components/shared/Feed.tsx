export default function Feed({ children }: { children: React.ReactNode }) {
  return (
    <section className="main-container">
      <div className="w-full max-w-4xl">{children}</div>
    </section>
  );
}
