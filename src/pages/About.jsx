import { useRef, useState } from "react";
import { ArrowRight, ChevronDown, Eye, Sparkles, Target } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import Button from "../components/ui/Button";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import SectionHeader from "../components/ui/SectionHeader";
import trixieImg from "../assets/trixie.jpg";

const identity = [
  {
    id: "vision",
    label: "Vision",
    icon: Eye,
    title: "A campus where every curious student can become a confident cloud builder.",
    description: "We envision a student community that closes the distance between classroom learning and the rapidly changing cloud industry—creating graduates who are prepared to contribute from day one.",
  },
  {
    id: "mission",
    label: "Mission",
    icon: Target,
    title: "Make practical AWS learning accessible, social, and worth showing.",
    description: "WildQuacc creates hands-on workshops, certification support, collaborative projects, and industry connections so students can learn with purpose and build visible proof of their skills.",
  },
  {
    id: "values",
    label: "Values",
    icon: Sparkles,
    title: "Learn openly. Build bravely. Bring others with you.",
    description: "Learning, community, experimentation, and professional excellence shape how we run every session. We value progress over perfection and collaboration over competition.",
  },
];

const team = [
  { name: "Trixie Dolera", role: "President & Founder", initials: "TD", image: trixieImg },
  { name: "Officer position open", role: "Events Coordinator", initials: "EC" },
  { name: "Officer position open", role: "Workshop Lead", initials: "WL" },
  { name: "Officer position open", role: "Outreach Coordinator", initials: "OC" },
  { name: "Officer position open", role: "Social Media Lead", initials: "SM" },
];

const contributors = ["Event operations", "Technical mentors", "Design & creatives", "Community support", "Documentation", "Campus outreach"];

export default function About() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const current = identity[active];
  const CurrentIcon = current.icon;

  const changeTabFromKeyboard = (event, index) => {
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (["ArrowDown", "ArrowRight"].includes(event.key)) next = (index + 1) % identity.length;
    if (["ArrowUp", "ArrowLeft"].includes(event.key)) next = (index - 1 + identity.length) % identity.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = identity.length - 1;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <MainLayout>
      <PageHero compact eyebrow="Our story" title="About" accent="WildQuacc" description="Founded by students and built for builders—a welcoming community turning curiosity into practical cloud confidence." />

      <section className="section section--paper">
        <div className="site-container story-grid">
          <Reveal className="story-rail">
            <span className="section-index">01</span>
            <p className="eyebrow" style={{ display: "flex", marginTop: ".9rem" }}>How it started</p>
          </Reveal>
          <Reveal className="story-copy" delay={90}>
            <p>WildQuacc began with a simple belief: students learn cloud technology best when they can explore it together, make mistakes safely, and build things that matter.</p>
            <p>What started as a small group of AWS-curious students is growing into a campus community for workshops, certifications, project collaboration, and the connections that help turn learning into opportunity.</p>
            <Button to="/contact" variant="text">Be part of the story <ArrowRight size={16} /></Button>
          </Reveal>
        </div>
      </section>

      <section className="section section--ink">
        <div className="site-container">
          <Reveal><SectionHeader light eyebrow="What drives us" index="02" title="A clear reason to keep building." description="Our identity keeps every workshop, partnership, and community decision pointed in the same direction." /></Reveal>

          <div className="identity-layout identity-desktop">
            <div className="identity-tabs" role="tablist" aria-label="WildQuacc identity">
              {identity.map((item, index) => (
                <button
                  key={item.id}
                  ref={(node) => { tabRefs.current[index] = node; }}
                  id={`identity-tab-${item.id}`}
                  role="tab"
                  aria-selected={active === index}
                  aria-controls={`identity-panel-${item.id}`}
                  tabIndex={active === index ? 0 : -1}
                  className={`identity-tab ${active === index ? "identity-tab--active" : ""}`}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => changeTabFromKeyboard(event, index)}
                >
                  <strong>{item.label}</strong><span>0{index + 1}</span>
                </button>
              ))}
            </div>
            <Reveal
              className="identity-panel"
              role="tabpanel"
              id={`identity-panel-${current.id}`}
              aria-labelledby={`identity-tab-${current.id}`}
              key={current.id}
            >
              <CurrentIcon color="#ff9900" size={25} />
              <span style={{ marginTop: "1.5rem" }}>0{active + 1} / 03</span>
              <h3>{current.title}</h3>
              <p>{current.description}</p>
            </Reveal>
          </div>

          <div className="identity-accordion">
            {identity.map((item, index) => {
              const Icon = item.icon;
              const open = active === index;
              return (
                <div className={`identity-accordion__item ${open ? "identity-accordion__item--open" : ""}`} key={item.id}>
                  <button onClick={() => setActive(index)} aria-expanded={open} aria-controls={`mobile-identity-${item.id}`}>
                    <span><Icon size={18} /> {item.label}</span><ChevronDown size={18} />
                  </button>
                  <div id={`mobile-identity-${item.id}`} className="identity-accordion__panel"><div><h3>{item.title}</h3><p>{item.description}</p></div></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="site-container">
          <Reveal><SectionHeader eyebrow="The people" index="03" title="Meet the core team." description="The students shaping WildQuacc’s programs, partnerships, and day-to-day community experience." /></Reveal>
          <div className="team-list">
            {team.map((member, index) => (
              <Reveal as="article" className="team-member" delay={index * 60} key={`${member.role}-${index}`}>
                <span className="team-member__number">0{index + 1}</span>
                <div className="team-member__image">
                  {member.image ? <img src={member.image} alt={member.name} /> : <span>{member.initials}</span>}
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </Reveal>
            ))}
          </div>
          <p style={{ margin: "1.4rem 0 0", color: "#667078", fontSize: ".82rem" }}>Open positions are intentionally shown without invented member profiles.</p>
        </div>
      </section>

      <section className="section section--dark">
        <div className="site-container dark-statement">
          <Reveal>
            <p className="eyebrow eyebrow--light"><span className="eyebrow-dot" />Community powered</p>
            <h2 style={{ marginTop: "1.5rem" }}>Every great event has a team <em>behind it.</em></h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="contributor-list">{contributors.map((item) => <span key={item}>{item}</span>)}</div>
            <Button to="/contact" variant="outline-light" style={{ marginTop: "2rem" }}>Volunteer with us <ArrowRight size={16} /></Button>
          </Reveal>
        </div>
      </section>
    </MainLayout>
  );
}
