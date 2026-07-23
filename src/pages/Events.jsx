import { useState } from "react";
import { ArrowRight, CalendarDays, Check, ChevronDown, Clock, MapPin } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import Button from "../components/ui/Button";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import SectionHeader from "../components/ui/SectionHeader";

const upcomingEvents = [
  {
    id: "lambda-2026",
    title: "Introduction to AWS Lambda",
    category: "Workshop",
    start: "2026-08-15T18:00:00+08:00",
    end: "2026-08-15T20:00:00+08:00",
    location: "Zoom + University Lab 204",
    description: "Learn serverless fundamentals and deploy your first Lambda function in a guided, beginner-friendly build session.",
  },
  {
    id: "saa-study-2026",
    title: "Solutions Architect Study Group",
    category: "Study group",
    start: "2026-08-22T17:00:00+08:00",
    end: "2026-08-22T19:00:00+08:00",
    location: "University Library Room 301",
    description: "Work through core architecture concepts, scenario questions, and exam strategies with fellow certification learners.",
  },
  {
    id: "security-2026",
    title: "Cloud Security Fundamentals",
    category: "Workshop",
    start: "2026-09-03T16:00:00+08:00",
    end: "2026-09-03T18:00:00+08:00",
    location: "CS Building Room 110",
    description: "Explore IAM, network security, encryption, and the habits that help teams build safer cloud architectures.",
  },
];

const pastEvents = [
  { id: "s3", title: "Amazon S3 Deep Dive", date: "2026-05-10", attendees: 42, highlights: ["Compared S3 storage classes and lifecycle policies", "Built a static website on S3", "Joined a live architecture Q&A"] },
  { id: "careers", title: "Careers in Cloud Computing Panel", date: "2026-04-25", attendees: 65, highlights: ["Met cloud practitioners from different roles", "Reviewed resumes and interview approaches", "Connected with industry guests"] },
  { id: "ec2", title: "AWS EC2 Hands-On Lab", date: "2026-03-18", attendees: 38, highlights: ["Launched and configured EC2 instances", "Explored scaling and load-balancing concepts", "Completed a guided troubleshooting exercise"] },
];

const dateFormatter = new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", year: "numeric", timeZone: "Asia/Manila" });
const timeFormatter = new Intl.DateTimeFormat("en-PH", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Manila" });

function UpcomingCard({ event, index }) {
  const [confirmed, setConfirmed] = useState(false);
  const start = new Date(event.start);
  const end = new Date(event.end);
  return (
    <Reveal as="article" className="event-card" delay={index * 70}>
      <div className="event-card__head">
        <span className="status-badge"><CalendarDays size={13} />{event.category}</span>
        <time className="event-date" dateTime={event.start}>{dateFormatter.format(start)}</time>
      </div>
      <h3>{event.title}</h3>
      <div className="meta-list">
        <span><Clock size={16} />{timeFormatter.format(start)}–{timeFormatter.format(end)}</span>
        <span><MapPin size={16} />{event.location}</span>
      </div>
      <p>{event.description}</p>
      <div className="event-card__footer">
        <Button
          variant={confirmed ? "outline-dark" : "dark"}
          onClick={() => setConfirmed((value) => !value)}
          aria-pressed={confirmed}
        >
          {confirmed ? <><Check size={16} /> RSVP noted locally</> : <>RSVP for this session <ArrowRight size={16} /></>}
        </Button>
        <span className="sr-only" aria-live="polite">{confirmed ? `RSVP noted for ${event.title}. This demo is not persisted.` : ""}</span>
      </div>
    </Reveal>
  );
}

function ArchiveItem({ event, index }) {
  const [open, setOpen] = useState(false);
  const panelId = `archive-${event.id}`;
  return (
    <div className={`archive-item ${open ? "archive-item--open" : ""}`}>
      <button className="archive-item__button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls={panelId}>
        <span>0{index + 1}</span>
        <span><strong>{event.title}</strong><small><time dateTime={event.date}>{dateFormatter.format(new Date(`${event.date}T12:00:00+08:00`))}</time> · {event.attendees} attendees</small></span>
        <ChevronDown aria-hidden="true" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 180ms" }} />
      </button>
      <div id={panelId} className="archive-item__panel"><div><ul>{event.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div></div>
    </div>
  );
}

export default function Events() {
  const [filter, setFilter] = useState("upcoming");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const handleNewsletter = (event) => {
    event.preventDefault();
    setNewsletterMessage("Newsletter signup is a visual prototype; no address was submitted.");
  };

  return (
    <MainLayout>
      <PageHero compact eyebrow="Learn · build · connect" title="Our" accent="Events" description="Hands-on workshops, certification sessions, and conversations designed to move every student builder forward." />

      <div className="filter-bar">
        <div className="site-container filter-bar__inner" aria-label="Event filters">
          <button className={`filter-button ${filter === "upcoming" ? "filter-button--active" : ""}`} onClick={() => setFilter("upcoming")} aria-pressed={filter === "upcoming"}>Upcoming · {upcomingEvents.length}</button>
          <button className={`filter-button ${filter === "past" ? "filter-button--active" : ""}`} onClick={() => setFilter("past")} aria-pressed={filter === "past"}>Past events · {pastEvents.length}</button>
        </div>
      </div>

      <section className="section section--paper">
        <div className="site-container">
          {filter === "upcoming" ? (
            <>
              <SectionHeader eyebrow="Save your seat" index="01" title="What we’re building next." description="Choose a session, bring a laptop, and learn alongside a room full of curious builders." />
              <div className="event-grid">{upcomingEvents.map((event, index) => <UpcomingCard key={event.id} event={event} index={index} />)}</div>
              <div className="newsletter">
                <div><h3>Never miss a build session.</h3><p>Event notifications are planned. For now, follow WildQuacc on social media for confirmed announcements.</p></div>
                <form onSubmit={handleNewsletter}>
                  <label className="sr-only" htmlFor="newsletter-email">Email address</label>
                  <input id="newsletter-email" type="email" placeholder="you@example.com" required />
                  <Button type="submit" variant="light">Notify me</Button>
                </form>
                {newsletterMessage && <p role="status" style={{ gridColumn: "1 / -1", margin: 0 }}>{newsletterMessage}</p>}
              </div>
            </>
          ) : (
            <>
              <SectionHeader eyebrow="From the archive" index="02" title="Built, shared, remembered." description="A record of the sessions and conversations that keep the WildQuacc community moving." />
              <div className="archive-list">{pastEvents.map((event, index) => <ArchiveItem key={event.id} event={event} index={index} />)}</div>
            </>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
