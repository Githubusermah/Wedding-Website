import './site-background.css';

/** Fixed, site-wide textured pink paper. Render ONCE in app/layout.tsx, before {children}. */
export default function SiteBackground() {
  return (
    <div className="sb-root" aria-hidden="true">
      <div className="sb-layer sb-paper" />
      <div className="sb-layer sb-star" />
      <div className="sb-layer sb-fib" />
      <div className="sb-layer sb-grain" />
      <div className="sb-layer sb-light" />
      <div className="sb-layer sb-fleck" />
      <div className="sb-layer sb-fleck sb-fleck-b" />
      <div className="sb-layer sb-vig" />
      <div className="sb-blob sb-b1" />
      <div className="sb-blob sb-b2" />
      <div className="sb-blob sb-b3" />
      <div className="sb-blob sb-b4" />
    </div>
  );
}
