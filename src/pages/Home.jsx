import { useState } from "react";
import { ArrowRight, CalendarDays, Clock, Code2, MapPin, Network, Plus, Rocket, Users } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import Button from "../components/ui/Button";
import Marquee from "../components/ui/Marquee";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import SectionHeader from "../components/ui/SectionHeader";

const benefits = [
  {
    icon: Code2,
    title: "Build with real AWS services",
    description: "Move beyond slides through guided labs, workshops, and practical projects that turn cloud concepts into portfolio-ready work.",
  },
  {
    icon: Network,
    title: "Learn with a community",
    description: "Meet peers who share what they know, solve problems together, and make the cloud journey less intimidating for everyone.",
  },
  {
    icon: Rocket,
    title: "Launch your cloud career",
    description: "Prepare for certifications, meet industry practitioners, and build the confidence to pursue your first role in cloud technology.",
  },
];

const faqs = [
  ["Do I need prior coding or AWS experience to join?", "No. WildQuacc welcomes students from every background and starts with approachable introductory workshops."],
  ["Is membership free?", "Yes. Membership and regular community sessions are free for currently enrolled students."],
  ["What events do you host?", "We host hands-on workshops, certification study groups, guest sessions, project sprints, and community meetups."],
  ["How can WildQuacc help me get certified?", "Members get structured study sessions, shared resources, practice activities, and support from peers who are preparing for the same goals."],
  ["Can first-year students join?", "Absolutely. Joining early gives you more time to explore cloud pathways, contribute to projects, and grow with the community."],
];

function FAQItem({ question, answer, open, onToggle, index }) {
  const panelId = `faq-panel-${index}`;
  return (
    <div className={`faq-item ${open ? "faq-item--open" : ""}`}>
      <button onClick={onToggle} aria-expanded={open} aria-controls={panelId}>
        <span>{question}</span><Plus aria-hidden="true" />
      </button>
      <div id={panelId} className="faq-item__answer"><div><p>{answer}</p></div></div>
    </div>
  );
}

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState(0);

  return (
    <MainLayout>
      <PageHero
        eyebrow="AWS Cloud Club — WildQuacc"
        title="Build the Cloud"
        accent="Together"
        description="A student-led community where curious builders gain practical AWS skills, prepare for certifications, and create the future—one project at a time."
        showMark
        meta="Community intake · 2026"
      >
        <Button to="/contact" variant="light">Join our community <ArrowRight size={16} /></Button>
        <Button href="#why" variant="outline-light">Discover WildQuacc</Button>
      </PageHero>

      <Marquee items={["WildQuacc", "Cloud Computing", "Build & Learn", "AWS", "Certifications", "Community", "Workshops"]} />

      <section id="why" className="section section--paper">
        <div className="site-container">
          <Reveal><SectionHeader eyebrow="Why join" index="01" title="Cloud skills grow faster when we build together." description="WildQuacc creates a practical path from first curiosity to confident cloud builder." /></Reveal>
          <div className="editorial-grid">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Reveal className="editorial-item" delay={index * 90} key={benefit.title}>
                  <div className="editorial-item__top"><span>0{index + 1}</span><Icon size={20} /></div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="stats-strip" aria-label="Community highlights">
        <div className="site-container stats-grid">
          <div className="stat"><strong>200+</strong><span>Student builders</span></div>
          <div className="stat"><strong>30+</strong><span>Learning sessions</span></div>
          <div className="stat"><strong>100%</strong><span>Community powered</span></div>
        </div>
      </section>

      <section className="section section--white">
        <div className="site-container">
          <Reveal><SectionHeader eyebrow="Next session" index="02" title="Start building serverless." description="Join the next WildQuacc workshop and leave with something working—not just another set of notes." /></Reveal>
          <div className="split-feature">
            <Reveal className="split-feature__rail">
              <strong>15</strong><span>June · 2026</span>
            </Reveal>
            <Reveal className="feature-copy" delay={100}>
              <span className="status-badge"><CalendarDays size={13} /> Workshop</span>
              <h3 style={{ marginTop: "1.5rem" }}>Introduction to AWS Lambda</h3>
              <p>Learn serverless fundamentals and deploy your first Lambda function in a guided, beginner-friendly build session.</p>
              <div className="meta-list">
                <span><Clock size={16} /> 6:00–8:00 PM</span>
                <span><MapPin size={16} /> Zoom + University Lab 204</span>
              </div>
              <Button to="/events" variant="dark" style={{ marginTop: "2rem" }}>Explore events <ArrowRight size={16} /></Button>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="site-container dark-statement">
          <Reveal>
            <p className="eyebrow eyebrow--light"><span className="eyebrow-dot" />Partner with WildQuacc</p>
            <h2 style={{ marginTop: "1.5rem" }}>Help the next generation <em>build boldly.</em></h2>
          </Reveal>
          <Reveal delay={100}>
            <p>Support workshops, mentor student builders, or help make cloud education more accessible on campus.</p>
            <Button to="/contact" variant="outline-light">Start a conversation <ArrowRight size={16} /></Button>
          </Reveal>
        </div>
      </section>

      <section className="section section--paper">
        <div className="site-container">
          <Reveal><SectionHeader eyebrow="Good to know" index="03" title="Your questions, answered." description="Everything you need before joining your first WildQuacc session." /></Reveal>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <FAQItem key={question} question={question} answer={answer} index={index} open={openFAQ === index} onToggle={() => setOpenFAQ(openFAQ === index ? null : index)} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="site-container" style={{ textAlign: "center" }}>
          <Reveal>
            <Users size={28} color="#ff9900" style={{ margin: "0 auto 1.5rem" }} />
            <h2 style={{ margin: 0, fontSize: "clamp(2.8rem,7vw,6.8rem)", letterSpacing: "-.065em", lineHeight: ".95" }}>Your cloud journey<br />starts on <em style={{ color: "#ff9900", fontFamily: "Instrument Serif, Georgia, serif", fontWeight: 400 }}>day one.</em></h2>
            <p style={{ maxWidth: "35rem", margin: "1.5rem auto 2rem", color: "#667078", lineHeight: 1.7 }}>Bring your curiosity. We’ll bring the community, the resources, and plenty of things to build.</p>
            <Button to="/contact" variant="orange">Join WildQuacc <ArrowRight size={16} /></Button>
          </Reveal>
        </div>
      </section>
    </MainLayout>
  );
}
