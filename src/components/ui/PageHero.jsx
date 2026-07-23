import { ArrowDown } from "lucide-react";
import BrandMark from "./BrandMark";

export default function PageHero({
  eyebrow,
  title,
  accent,
  description,
  children,
  compact = false,
  showMark = false,
  meta,
}) {
  return (
    <section className={`page-hero ${compact ? "page-hero--compact" : ""}`} data-theme="dark">
      <div className="ambient-field" aria-hidden="true">
        <span className="ambient-field__orange" />
        <span className="ambient-field__red" />
        <span className="ambient-field__violet" />
      </div>
      <div className="page-hero__noise" aria-hidden="true" />
      <div className="page-hero__content site-container">
        {showMark && <BrandMark inverted />}
        <p className="eyebrow eyebrow--light"><span className="eyebrow-dot" />{eyebrow}</p>
        <h1>
          <span>{title}</span>
          {accent && <em>{accent}</em>}
        </h1>
        {description && <p className="page-hero__description">{description}</p>}
        {children && <div className="page-hero__actions">{children}</div>}
        {!compact && (
          <div className="page-hero__meta">
            <span className="page-hero__meta-side">AWS Cloud Club</span>
            <span>{meta || "Build · Learn · Lead"}</span>
            <span className="page-hero__meta-side">Scroll <ArrowDown size={12} /></span>
          </div>
        )}
      </div>
    </section>
  );
}
