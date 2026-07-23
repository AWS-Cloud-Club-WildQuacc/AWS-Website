export default function Marquee({ items }) {
  const track = [...items, ...items];
  return (
    <section className="marquee" aria-label={`Community topics: ${items.join(", ")}`}>
      <div className="marquee__track" aria-hidden="true">
        {track.map((item, index) => (
          <span className="marquee__item" key={`${item}-${index}`}>
            {item}<i />
          </span>
        ))}
      </div>
    </section>
  );
}
