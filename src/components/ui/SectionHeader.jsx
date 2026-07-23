export default function SectionHeader({ eyebrow, index, title, description, light = false, align = "left" }) {
  return (
    <div className={`section-header section-header--${align} ${light ? "section-header--light" : ""}`}>
      <div className="section-header__meta">
        {index && <span className="section-index">{index}</span>}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      </div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
